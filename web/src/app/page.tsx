"use client";

import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import WorkspacePanel from "@/components/WorkspacePanel";
import InsightPanel from "@/components/InsightPanel";
import CollectionPanel from "@/components/CollectionPanel";
import FeaturePanel from "@/components/FeaturePanel";
import ReferenceShelf from "@/components/ReferenceShelf";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <StatsStrip />
      <WorkspacePanel />
      <InsightPanel />
      <CollectionPanel />
      <FeaturePanel />
      <ReferenceShelf />
    </main>
  );
}
