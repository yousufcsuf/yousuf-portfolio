import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { ExperienceTimeline } from "@/components/experience-timeline";

export const metadata: Metadata = { title: "Experience — Yousuf" };

export default function Experience() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading
        title="Experience."
        description="AI research, software engineering, and Salesforce development. A little of the journey so far."
      />
      <ExperienceTimeline />
    </main>
  );
}
