export type ProjectScreenshot = {
  /** A local path beneath public/, such as /screenshots/docuflow-ai/overview.png. */
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  name: string;
  number: string;
  variant: "documents" | "systems" | "inference";
  description: string;
  status?: "Work in progress" | "Completed Academic Project";
  tagline?: string;
  subtitle?: string;
  architectureQuestion?: string;
  engineeringFocus?: readonly string[];
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
    tagline: "From Documents to Decisions. Intelligently.",
    subtitle: "Enterprise Document Intelligence & Human-Centered Workflow Automation",
    description: "DocuFlow AI is an AI-powered document processing platform designed to transform complex, document-heavy business workflows into structured, auditable, and approval-ready processes. The platform combines LLM-powered information extraction, deterministic business-rule validation, document matching, and human-in-the-loop approvals to automate invoice and purchase-order processing while maintaining control over critical business decisions.",
    engineeringFocus: ["Document Intelligence", "LLM Integration", "Workflow Automation", "Human-in-the-Loop"],
    demoUrl: "",
    githubUrl: "",
    technologies: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "LLM APIs", "AWS"],
    screenshots: [],
  },
  {
    name: "AgentFort",
    number: "02",
    variant: "systems",
    tagline: "Govern the Agents. Secure the Actions. Automate with Confidence.",
    subtitle: "Secure Agent Execution, Enterprise AI Governance & Intelligent Infrastructure Automation",
    description: "AgentFort is an enterprise-oriented AI agent security and orchestration platform designed to make autonomous AI systems more secure, observable, and reliable. It combines agent discovery, centralized governance, fine-grained authorization, behavioral anomaly detection, secure MCP execution, and durable workflows with AI-assisted infrastructure operations.",
    architectureQuestion: "How can organizations give AI agents useful autonomy without surrendering control over permissions, execution, or infrastructure?",
    engineeringFocus: ["Agent Security", "MCP", "Distributed Systems", "AI Governance", "Intelligent Automation"],
    demoUrl: "",
    githubUrl: "",
    technologies: ["Python", "FastAPI", "LangGraph", "MCP", "PostgreSQL", "Redis", "AWS", "Docker", "OpenTelemetry"],
    screenshots: [],
  },
  {
    name: "InferOS",
    number: "03",
    variant: "inference",
    tagline: "Every Token Counts. Every Millisecond Matters.",
    subtitle: "High-Performance LLM Inference & Distributed Model Serving",
    description: "InferOS is an ML infrastructure and inference engineering platform designed to investigate how large language models can be served faster, more efficiently, and at scale. The project focuses on production-oriented model serving, request scheduling, intelligent routing, KV-cache efficiency, GPU utilization, and distributed inference. Through reproducible benchmarking, profiling, and optimization experiments, InferOS explores the engineering trade-offs between inference latency, throughput, memory consumption, model quality, and serving cost.",
    engineeringFocus: ["ML Infrastructure", "LLM Inference", "GPU Optimization", "Distributed Serving", "Performance Engineering"],
    technologies: ["Python", "PyTorch", "vLLM", "SGLang", "CUDA", "Triton", "Docker"],
    demoUrl: "",
    githubUrl: "",
    screenshots: [],
  },
  {
    name: "Autonomous Clinical Documentation",
    number: "04",
    variant: "documents",
    status: "Completed Academic Project",
    tagline: "From Conversations to Clinical Intelligence.",
    subtitle: "AI-Powered Clinical Documentation & Intelligent Healthcare Workflows",
    description: "An AI-powered clinical documentation system that transforms doctor–patient conversations into structured medical records using speech recognition and large language models. Combining Whisper-based transcription, Gemini-powered clinical note generation, and LangChain-based question answering, the application supports SOAP-formatted documentation, patient summaries, and retrieval of clinical information through an interactive interface.",
    engineeringFocus: ["Speech-to-Text", "Clinical NLP", "LLM Workflows", "Healthcare AI"],
    technologies: ["Python", "Streamlit", "Whisper", "Google Gemini", "LangChain", "SQLite"],
    demoUrl: "",
    githubUrl: "https://github.com/yousufcsuf/autonomous-clinical-documentation-using-Agentic-AI",
    screenshots: [],
  },
];
