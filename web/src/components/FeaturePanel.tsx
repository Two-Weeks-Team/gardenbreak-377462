"use client";

export default function FeaturePanel() {
  return (
    <section className="px-4 py-6 bg-muted rounded radius">
      <h3 className="text-xl font-semibold mb-2">Why GardenBreak?</h3>
      <ul className="list-disc list-inside space-y-1 text-muted">
        <li>Zero‑knowledge encryption – your data never leaves the browser.</li>
        <li>Offline‑first – works without internet after first sync.</li>
        <li>Playful garden UI keeps you motivated.</li>
      </ul>
    </section>
  );
}
