"use client";

import { useEffect, useState } from "react";
import { loadHabits } from "@/lib/api";

interface Habit {
  id: string;
  habit: string;
  icon: string;
  streak: number;
}

export default function CollectionPanel() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits()
      .then((data) => setHabits(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 py-6 bg-muted rounded radius mt-6">
      <h2 className="text-xl font-semibold mb-3">Your Growth Garden</h2>
      {loading ? (
        <p className="text-muted">Loading history…</p>
      ) : habits.length === 0 ? (
        <p className="text-muted">No habits yet. Start building your garden!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((h) => (
            <li key={h.id} className="bg-card rounded radius p-3 shadow">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{h.icon}</span>
                <span className="font-medium">{h.habit}</span>
              </div>
              <p className="mt-1 text-sm text-muted">Current streak: {h.streak} days</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
