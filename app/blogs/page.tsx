import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Blogs — Yousuf" };

export default function Blogs() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading
        title="Blogs."
        description="Thoughts on software, intelligent systems, and work in progress."
      />
      <section className="notes-list page-container" aria-labelledby="blogs-heading">
        <article className="note-card">
          <div>
            <h2 id="blogs-heading">New writing is taking shape.</h2>
            <p>Articles will appear here. Nothing published yet.</p>
          </div>
          <div className="note-art" aria-hidden="true"><span /></div>
        </article>
      </section>
    </main>
  );
}
