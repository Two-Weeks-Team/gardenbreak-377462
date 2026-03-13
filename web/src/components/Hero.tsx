"use client";

import { Poppins } from "next/font/google";

const headingFont = Poppins({ subsets: ["latin"], weight: ["700"], variable: "--font-heading" });

export default function Hero() {
  return (
    <section className="py-12 text-center">
      <h1 className={`text-4xl md:text-5xl font-bold ${headingFont.variable} bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent`}>GardenBreak</h1>
      <p className="mt-4 text-lg text-muted">One‑tap micro‑break habit tracker with a living‑garden UI.</p>
    </section>
  );
}
