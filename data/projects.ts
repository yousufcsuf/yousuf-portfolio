export type ProjectScreenshot = {
  /** A local path beneath public/, such as /screenshots/docuflow-ai/overview.png. */
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  name: string;
  number: string;
  variant: "documents" | "systems";
  description: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: readonly string[];
  links?: readonly { label: string; href: string }[];
  screenshots: readonly ProjectScreenshot[];
};

export const projects: readonly Project[] = [
  {
    name: "DocuFlow AI",
    number: "01",
    variant: "documents",
    description: "In development. Project details and case study to follow.",
    // Fill these with this project's actual links and technologies when ready.
    demoUrl: "",
    githubUrl: "",
    technologies: [],
    screenshots: [],
  },
  {
    name: "ReliantOps Nexus",
    number: "02",
    variant: "systems",
    description: "In development. Project details and case study to follow.",
    demoUrl: "",
    githubUrl: "",
    technologies: [],
    screenshots: [],
  },
];
