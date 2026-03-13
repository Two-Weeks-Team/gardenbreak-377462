"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";
import clsx from "clsx";
import { loadHabits, saveHabits } from "@/lib/api";

interface Habit {
  id: string;
  habit: string;
  icon: string;
  color: string;
  streak: number;
  completedToday: boolean;
}

export default function WorkspacePanel() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHabits()
      .then((data) => setHabits(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function addHabit() {
    if (!input.trim()) return;
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      habit: input.trim(),
      icon: "🌱",
      color: "bg-emerald-200",
      streak: 0,
      completedToday: false
    };
    const updated = [newHabit, ...habits];
    setHabits(updated);
    setInput("");
    await saveHabits(updated);
  }

  async function toggleComplete(id: string) {
    const updated = habits.map((h) =>
      h.id === id ? { ...h, completedToday: !h.completedToday, streak: h.completedToday ? h.streak - 1 : h.streak + 1 } : h
    );
    setHabits(updated);
    await saveHabits(updated);
  }

  if (loading) return <p className="text-muted">Loading your garden…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="px-4 py-6">
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 rounded radius border border-border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="What micro‑break habit would you like to nurture?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
        />
        <button
          className="bg-primary text-card rounded radius px-4 py-2 hover:bg-primary/80"
          onClick={addHabit}
        >
          Add
        </button>
      </div>
      {habits.length === 0 ? (
        <p className="text-muted">Your garden is empty. Add a habit above.</p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence>
            {habits.map((h) => (
              <motion.li
                key={h.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center bg-card rounded radius p-3 shadow"
              >
                <span className="text-2xl mr-3">{h.icon}</span>
                <span className="flex-1">{h.habit}</span>
                <button
                  aria-label="Mark complete"
                  onClick={() => toggleComplete(h.id)}
                  className={clsx(
                    "p-2 rounded-full transition-colors",
                    h.completedToday ? "text-success" : "text-muted"
                  )}
                >
                  <Leaf
                    className={h.completedToday ? "animate-bounce" : ""}
                    size={20}
                  />
                </button>
                <span className="ml-2 text-sm text-muted">Streak: {h.streak}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
