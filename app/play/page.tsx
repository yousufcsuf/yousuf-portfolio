import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { HeroVisual } from "@/components/hero-visual";

export const metadata: Metadata = { title: "Play — Yousuf" };

export default function Play() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading title="Play." description="A space for experiments, small ideas, and explorations in software and AI." />
      <section className="page-container play-grid" aria-labelledby="experiments-heading"><article className="experiment-card"><div><h2 id="experiments-heading">Room to experiment.</h2><p>New experiments will appear here as they take shape.</p><span className="project-status">Coming soon</span></div><div className="experiment-art"><HeroVisual /></div></article></section>
    </main>
  );
}
