"use client";

import { useState } from "react";
import { postPlan } from "@/lib/api";

export default function InsightPanel() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generatePlan() {
    setLoading(true);
    setError(null);
    try {
      const data = await postPlan({ query: "daily stretch" });
      setSummary(data.summary);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-4 py-6 bg-card rounded radius shadow">
      <h3 className="text-lg font-medium mb-2">AI Sprint Suggestion</h3>
      {loading ? (
        <p className="text-muted">Thinking…</p>
      ) : summary ? (
        <p>{summary}</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <button
          className="bg-primary text-card rounded radius px-3 py-1"
          onClick={generatePlan}
        >
          Get a 7‑day micro‑break plan
        </button>
      )}
    </section>
  );
}
