import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <SelectedWork />
      <section id="about" aria-labelledby="about-heading" className="page-container home-about">
        <p className="eyebrow">A little context</p>
        <div><h2 id="about-heading">Thoughtful software.<br />Intelligent by design.</h2><p>I build reliable software, intelligent applications, and thoughtful digital experiences. This portfolio is a growing collection of that work.</p><Link href="/about" className="text-link">A little more about me ↗</Link></div>
      </section>
      <section id="experience" aria-labelledby="experience-heading" className="page-container experience-section"><h2 id="experience-heading">Experience</h2><p>Professional background and experience details will be added here.</p></section>
      <section id="contact" aria-labelledby="contact-heading" className="page-container contact-section"><p className="eyebrow">Contact</p><h2 id="contact-heading">Good work starts<br />with a conversation.</h2><p>Contact details will be added soon.</p></section>
    </main>
  );
}
