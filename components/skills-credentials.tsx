import { aiTools, credentials } from "@/data/skills";
import { SkillsMotion } from "./skills-motion";

export function SkillsCredentials() {
  return <section id="skills" tabIndex={-1} className="page-container skills-section" aria-labelledby="skills-heading">
    <header className="skills-heading"><p className="eyebrow">Skills &amp; credentials</p><h2 id="skills-heading">The tools behind<br />the intelligence.</h2><p>A focused toolkit for LLM applications, agent workflows, retrieval, and AI backend systems.</p></header>
    <SkillsMotion>
    <div className="skills-grid ai-tools-grid">{aiTools.map(({ name, purpose, detail }, index) => <article className="skill-group ai-tool" key={name}><div className="tool-editorial-meta"><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{name}</span></div><h3>{purpose}</h3><p className="ai-tool-description">{detail}</p></article>)}</div>
    <div className="credentials-heading"><p className="eyebrow">Continued learning</p><h3>Credentials.</h3></div>
    <ul className="credential-list">{credentials.filter(({ issuer }) => issuer !== "Salesforce").map(({ name, issuer }) => <li key={name}><div><p>{issuer}</p><h4>{name}</h4></div></li>)}</ul>
    </SkillsMotion>
  </section>;
}
