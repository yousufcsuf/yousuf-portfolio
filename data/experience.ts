export type ExperienceRole = {
  title: string;
  team?: string;
  employer?: string;
  start: { label: string; dateTime: string };
  end: { label: string; dateTime: string };
  location: string;
  highlights: readonly string[];
};

export type ExperienceGroup = {
  id: string;
  organization: string;
  initials: string;
  roles: readonly ExperienceRole[];
};

// Dates and responsibilities supplied in Yousuf's résumé screenshots.
export const experience: readonly ExperienceGroup[] = [
  {
    id: "csuf",
    organization: "California State University, Fullerton",
    initials: "CSUF",
    roles: [
      {
        title: "Graduate Research Assistant",
        team: "AI/ML & Software Engineering Research",
        start: { label: "Aug 2024", dateTime: "2024-08" },
        end: { label: "May 2026", dateTime: "2026-05" },
        location: "Fullerton, CA",
        highlights: [
          "Built a Python RAG pipeline to reduce weakly grounded mentor responses by chunking mentor content, generating embeddings, retrieving relevant passages, and grounding LLM prompts in source material.",
          "Developed a vector-similarity recommendation workflow to improve mentor discovery by combining student profile attributes with semantic similarity, enabling more personalized ranking of mentors and resources based on interests and goals.",
          "Evaluated text preprocessing, embeddings, retrieval logic, and multiple prompt/context combinations to improve the reliability of downstream AI features and identify stronger grounding strategies.",
          "Integrated AI-enabled functionality with React/TypeScript applications and backend APIs, including structured event logging and AWS Lambda workflows, enabling the research team to capture user interactions and analyze engagement with recommendations and conversational features.",
        ],
      },
    ],
  },
  {
    id: "eagle-creek",
    organization: "Eagle Creek",
    initials: "EC",
    roles: [
      {
        title: "Software Engineer",
        employer: "Eagle Creek / Eviden",
        start: { label: "Jan 2023", dateTime: "2023-01" },
        end: { label: "Jun 2024", dateTime: "2024-06" },
        location: "Vermillion, SD",
        highlights: [
          "Developed enterprise applications and REST integrations using Apex, Lightning Web Components, SOQL, Salesforce Flows, and asynchronous processing.",
          "Automated business workflows and data-processing operations, reducing repetitive manual data-entry activities by approximately 20%.",
          "Supported performance optimization, testing, debugging, deployment, and production issue resolution with developers, architects, QA teams, and business stakeholders.",
        ],
      },
      {
        title: "Junior Software Engineer",
        employer: "Eagle Creek",
        start: { label: "Dec 2021", dateTime: "2021-12" },
        end: { label: "Dec 2022", dateTime: "2022-12" },
        location: "Vermillion, SD",
        highlights: [
          "Developed Salesforce functionality using Apex, SOQL, Lightning components, REST APIs, validation rules, and workflow automation while supporting testing, releases, maintenance, and issue resolution in Agile environments.",
        ],
      },
    ],
  },
];
