import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "About — Yousuf" };

export default function About() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading title="I’m Yousuf." />
      <section className="page-container about-intro" aria-labelledby="about-intro-heading">
        <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder. Yousuf’s photo has not been added."><span>Y.</span><p>Portrait to follow</p></div>
        <div><h2 id="about-intro-heading">I build reliable software and intelligent applications.</h2><p>Thoughtful software. Intelligent by design. This portfolio is a growing collection of my work.</p><p>A personal biography and professional background will be added here.</p><Link className="text-link" href="/#experience">Experience ↗</Link></div>
      </section>
      <section className="page-container quiet-section" aria-labelledby="approach-heading"><h2 id="approach-heading">Engineering intelligent systems.</h2><p>I build reliable software, intelligent applications, and thoughtful digital experiences.</p></section>
    </main>
  );
}
