import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import portrait from "@/public/yousuf-portrait.png";
import { PageHeading } from "@/components/page-heading";
import { Education } from "@/components/education";
import { AboutNav } from "@/components/about-nav";
import { SkillsCredentials } from "@/components/skills-credentials";

export const metadata: Metadata = { title: "About | Yousuf" };

export default function About() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading title="I’m Yousuf." />
      <AboutNav />
      <section id="me" tabIndex={-1} className="page-container about-intro" aria-labelledby="about-intro-heading">
        <div className="about-portrait"><Image src={portrait} alt="Illustrated portrait of Yousuf wearing glasses and a tuxedo against a soft purple halo." sizes="(min-width: 768px) 464px, 90vw" placeholder="blur" /></div>
        <div><h2 id="about-intro-heading">Let’s build a future that’s AI-FIRST &amp; AI-SAFE.</h2><p>I’m Yousuf. I engineer LLM applications, retrieval-augmented generation (RAG) pipelines, and agentic workflows using Python, LangGraph, vector search, and backend APIs. My focus is the system around the model: context retrieval, orchestration, validation, and execution visibility.</p><p>At CSUF, my graduate research involved document chunking, embeddings, semantic retrieval, and prompt/context evaluation to ground LLM responses in source material. I also developed vector-similarity recommendations. My clinical documentation assistant uses a multi-stage LangGraph workflow, Pydantic-validated outputs, FAISS retrieval, and human approval.</p><p>I’m developing AgentGuard with Spring Boot and Python/LangGraph services, focusing on agent authorization, policy enforcement, audit logging, and observability. My enterprise application experience at Eagle Creek / Eviden brings a practical foundation in API integration, asynchronous processing, testing, and production troubleshooting.</p><Link className="text-link" href="/experience">Explore my experience ↗</Link></div>
      </section>
      <section id="vision" tabIndex={-1} className="page-container quiet-section about-perspective" aria-labelledby="approach-heading"><p className="eyebrow">What’s next</p><h2 id="approach-heading">Beyond the model.<br />Engineer the system.</h2><div className="about-perspective-copy"><p>I’m looking for <strong>Applied AI Engineer, LLM Engineer, and Generative AI Engineer</strong> opportunities focused on RAG, tool-using agents, evaluation, and the backend infrastructure that supports them.</p><p>My deeper technical interests include distributed AI systems, LLM inference and performance optimization, and autonomous agent architectures. I want to build systems where retrieval quality, model behavior, tool execution, and failures can be evaluated and traced.</p></div><Link className="text-link" href="mailto:yousufborna2626@gmail.com">Let’s connect ↗</Link></section>
      <Education />
      <SkillsCredentials />
    </main>
  );
}
