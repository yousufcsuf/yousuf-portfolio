import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Notes — Yousuf" };

export default function Notes() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading title="Notes." description="A place for thoughts on software, intelligent systems, and work in progress." />
      <section className="notes-list page-container" aria-labelledby="notes-heading"><article className="note-card"><div><h2 id="notes-heading">Notes are taking shape.</h2><p>New writing will appear here. Nothing published yet.</p></div><div className="note-art" aria-hidden="true"><span /></div></article></section>
    </main>
  );
}
