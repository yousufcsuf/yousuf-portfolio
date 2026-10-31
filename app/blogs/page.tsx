import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { UnderConstruction } from "@/components/under-construction";

export const metadata: Metadata = { title: "Blogs — Yousuf" };

export default function Blogs() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading
        title="Blogs."
        description="Thoughts on software, intelligent systems, and work in progress."
      />
      <UnderConstruction />
    </main>
  );
}
