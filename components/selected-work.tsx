import { projects, type Project } from "@/data/projects";
import { ProjectGallery } from "./project-gallery";

function ProjectConcept({ variant, detail = false }: Pick<Project, "variant"> & { detail?: boolean }) {
  return (
    <div className={`project-concept${detail ? " is-detail" : ""}`} aria-hidden="true">
          {variant === "documents" ? (
            <div className="document-stack">
              <div className="document-sheet document-sheet-back" />
              <div className="document-sheet">
                <span className="document-mark">d.</span>
                <div className="document-rule" />
                <div className="document-rule" />
                <div className="document-rule short" />
                <div className="document-highlight"><div className="document-rule" /><div className="document-rule short" /></div>
              </div>
            </div>
          ) : (
            <svg viewBox="0 0 300 360" fill="none" className="system-art" focusable="false">
              <ellipse cx="150" cy="180" rx="117" ry="123" stroke="currentColor" opacity=".2" />
              <ellipse cx="150" cy="180" rx="78" ry="82" stroke="currentColor" opacity=".2" />
              <path d="M33 180H267M150 57V303M67 93L233 267M67 267L233 93" stroke="currentColor" opacity=".22" />
              {[[33,180],[267,180],[150,57],[150,303],[67,93],[233,267],[67,267],[233,93]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".5" />)}
              <rect x="117" y="147" width="66" height="66" rx="20" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".4" />
              <path d="M136 192V168L164 192V168" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span className="project-web-footnote">An idea taking shape.</span>
    </div>
  );
}

function ProjectArtwork({ name, variant, screenshots }: Pick<Project, "name" | "variant" | "screenshots">) {
  return (
    <div className={`project-visual project-visual--${variant}`}>
      <ProjectGallery
        name={name}
        screenshots={screenshots}
        concepts={[
          { id: "composition", caption: "Concept study · Screenshots to follow", content: <ProjectConcept variant={variant} /> },
          { id: "detail", caption: "Concept detail · Screenshots to follow", content: <ProjectConcept variant={variant} detail /> },
        ]}
      />
    </div>
  );
}

function ProjectShowcase({ name, number, variant, description, technologies, links, screenshots, demoUrl, githubUrl }: Project) {
  const titleId = `project-${number}-heading`;

  return (
    <article className="project-showcase" aria-labelledby={titleId}>
      <ProjectArtwork name={name} variant={variant} screenshots={screenshots} />
      <div className="project-details" tabIndex={0} role="group" aria-labelledby={titleId}>
        <span className="project-peel" aria-hidden="true" />
        <div className="project-copy">
        <p className="project-index">{number} — Selected project</p>
        <h3 id={titleId}>{name}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          <span className="project-status">Work in progress</span>
          {technologies?.length ? (
            technologies.map((technology) => <span className="project-technology" key={technology}>{technology}</span>)
          ) : (
            <span className="project-technology">Tech stack to follow</span>
          )}
        </div>
        </div>
        <div className="project-actions">
          {demoUrl ? (
            <a href={demoUrl} className="button">Demo <span aria-hidden="true">↗</span></a>
          ) : (
            <button type="button" className="button" disabled title="Demo coming soon" aria-label={`${name} demo coming soon`}>Demo <span aria-hidden="true">↗</span></button>
          )}
          {githubUrl ? (
            <a href={githubUrl} className="button button-outline" aria-label={`${name} on GitHub`}>GitHub</a>
          ) : (
            <button type="button" className="button button-outline" disabled title="Repository link coming soon" aria-label={`${name} GitHub repository link coming soon`}>GitHub</button>
          )}
          {links?.map(({ label, href }) => <a key={href} href={href} className="button button-outline">{label} <span aria-hidden="true">↗</span></a>)}
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="page-container work-section">
      <div className="section-header">
        <div><p className="eyebrow">Ideas into systems</p><h2 id="work-heading">AI Systems</h2></div>
        <p>A closer look at what I’m building.<br />Considered, from concept to code.</p>
      </div>
      <div className="project-list">{projects.map((project) => <ProjectShowcase key={project.number} {...project} />)}</div>
    </section>
  );
}
