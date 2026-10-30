import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Experience — Yousuf" };

export default function Experience() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading
        title="Experience."
        description="Engineering intelligent systems. Thoughtful software, from idea to implementation."
      />
      <section className="notes-list page-container" aria-labelledby="experience-heading">
        <article className="note-card">
          <div>
            <h2 id="experience-heading">Professional background</h2>
            <p>Professional experience and career details will be added here.</p>
            <Link href="/#work" className="text-link">Explore my projects ↗</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
