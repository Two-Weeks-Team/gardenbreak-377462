"use client";

import { Github, ShieldCheck, CreditCard } from "lucide-react";

export default function ReferenceShelf() {
  const badges = [
    { Icon: Github, label: "Open‑source" },
    { Icon: ShieldCheck, label: "Zero‑knowledge" },
    { Icon: CreditCard, label: "PCI‑compliant" }
  ];
  return (
    <section className="flex justify-center gap-6 py-4">
      {badges.map(({ Icon, label }, i) => (
        <div key={i} className="flex flex-col items-center text-sm text-muted">
          <Icon size={24} className="text-primary" />
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
