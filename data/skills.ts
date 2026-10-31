export const skillGroups = [
  { title: "AI & LLM engineering", skills: ["RAG", "LangChain", "LangGraph", "LLM APIs", "Agentic AI", "FAISS", "Embeddings", "Semantic search", "Structured outputs", "Pydantic", "Human-in-the-loop workflows", "Prompt & retrieval evaluation"] },
  { title: "Languages", skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"] },
  { title: "Backend & integration", skills: ["Spring Boot", "FastAPI", "Node.js", "Express.js", "REST APIs", "Web services", "JPA / Hibernate", "Asynchronous processing"] },
  { title: "Application interfaces", skills: ["React", "Streamlit", "Lightning Web Components"] },
  { title: "Databases & caching", skills: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "SQLite"] },
  { title: "Cloud & developer tools", skills: ["AWS", "AWS Lambda", "Docker", "Kubernetes", "Git", "GitHub", "GitHub Actions", "Maven", "Gradle", "Linux"] },
  { title: "Enterprise & Salesforce", skills: ["Apex", "Asynchronous Apex", "SOQL", "SOSL", "Salesforce Flow", "CRM administration", "Salesforce security", "Data management", "Workflow automation", "Approval processes", "Reports & dashboards"] },
  { title: "Engineering practices", skills: ["Testing", "Debugging", "Release support", "Production troubleshooting", "Performance optimization", "Requirements analysis", "Technical documentation", "Agile collaboration"] },
] as const;

export const credentials = [
  { name: "Generative AI Fundamentals", issuer: "Databricks" },
  { name: "AI Agent Fundamentals", issuer: "Databricks" },
  { name: "Salesforce Certified Administrator", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform App Builder", issuer: "Salesforce" },
  { name: "Google Cloud Computing Foundations", issuer: "Google Cloud" },
] as const;

export const aiTools = [
  { name: "Python", mark: "Py", purpose: "AI application development", detail: "Retrieval pipelines, model integrations, and data processing.", tone: "blue" },
  { name: "LangGraph", mark: "LG", purpose: "Agent orchestration", detail: "Multi-stage workflows with explicit state and human review.", tone: "green" },
  { name: "LangChain", mark: "LC", purpose: "LLM application workflows", detail: "Connect language models, retrieval, and application logic.", tone: "teal" },
  { name: "FAISS", mark: "F", purpose: "Vector retrieval", detail: "Embedding similarity search for grounded RAG applications.", tone: "purple" },
  { name: "Pydantic", mark: "P", purpose: "Structured model outputs", detail: "Schema validation across extraction and generation stages.", tone: "pink" },
  { name: "FastAPI", mark: "↯", purpose: "Python backend APIs", detail: "API endpoints connecting AI workflows with applications.", tone: "teal" },
  { name: "Spring Boot", mark: "SB", purpose: "AI backend services", detail: "Java services for agent governance and application infrastructure.", tone: "green" },
  { name: "PostgreSQL", mark: "Pg", purpose: "Persistent application data", detail: "Relational storage for backend services and agent infrastructure.", tone: "blue" },
  { name: "Redis", mark: "R", purpose: "Caching & rate limiting", detail: "Infrastructure being developed for AgentGuard services.", tone: "coral" },
  { name: "Docker", mark: "D", purpose: "Containerized services", detail: "Package AI and backend services in reproducible environments.", tone: "blue" },
  { name: "AWS Lambda", mark: "λ", purpose: "Cloud workflows", detail: "Event-driven backend functions and research application logging.", tone: "amber" },
] as const;
