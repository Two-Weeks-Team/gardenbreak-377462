"use client";

import { LucideBadgeCheck } from "lucide-react";

export default function StatsStrip() {
  const totalHabits = 3;
  const totalStreak = 27;
  return (
    <section className="flex justify-around py-4 bg-card rounded radius mx-4 shadow">
      <div className="flex items-center gap-2">
        <LucideBadgeCheck size={20} className="text-primary" />
        <span>{totalHabits} Habits</span>
      </div>
      <div className="flex items-center gap-2">
        <LucideBadgeCheck size={20} className="text-accent" />
        <span>{totalStreak} Days Streak</span>
      </div>
    </section>
  );
}
