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
          ) : variant === "inference" ? (
            <svg viewBox="0 0 300 360" fill="none" className="system-art" focusable="false">
              <path d="M42 180h57m102 0h57M150 72v57m0 102v57" stroke="currentColor" strokeOpacity=".3" />
              <path d="M66 108h36v36m132-36h-36v36M66 252h36v-36m132 36h-36v-36" stroke="currentColor" strokeOpacity=".2" />
              <rect x="99" y="129" width="102" height="102" rx="18" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".45" />
              <rect x="118" y="148" width="64" height="64" rx="8" stroke="currentColor" strokeOpacity=".6" />
              {[0, 1, 2, 3].map((pin) => <path key={pin} d={`M${120 + pin * 20} 119v10m0 102v10M89 ${150 + pin * 20}h10m102 0h10`} stroke="currentColor" strokeOpacity=".4" />)}
              {[0, 1, 2].map((row) => [0, 1, 2].map((column) => <rect key={`${row}-${column}`} x={129 + column * 15} y={159 + row * 15} width="11" height="11" rx="2" fill="currentColor" opacity={0.12 + (row + column) * 0.08} />))}
              {[72, 288].map((y) => <g key={y}>{[0, 1, 2, 3, 4].map((token) => <rect key={token} x={103 + token * 20} y={y - 5} width="14" height="10" rx="3" fill="currentColor" opacity={0.15 + token * 0.07} />)}</g>)}
              <circle cx="42" cy="180" r="5" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".4" />
              <circle cx="258" cy="180" r="5" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".4" />
            </svg>
          ) : (
            <svg viewBox="0 0 300 360" fill="none" className="system-art" focusable="false">
              <ellipse cx="150" cy="180" rx="117" ry="123" stroke="currentColor" opacity=".2" />
              <ellipse cx="150" cy="180" rx="78" ry="82" stroke="currentColor" opacity=".2" />
              <path d="M33 180H267M150 57V303M67 93L233 267M67 267L233 93" stroke="currentColor" opacity=".22" />
              {[[33,180],[267,180],[150,57],[150,303],[67,93],[233,267],[67,267],[233,93]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".5" />)}
              <rect x="117" y="147" width="66" height="66" rx="20" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".4" />
              <path d="m150 160 17 7v15c0 12-17 21-17 21s-17-9-17-21v-15l17-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="m142 181 6 6 11-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span className="project-web-footnote">An idea taking shape.</span>
    </div>
  );
}

function ProjectArtwork({ name, variant, screenshots }: Pick<Project, "name" | "variant" | "screenshots">) {
  return (
    <div className={`project-visual project-visual--${variant === "inference" ? "systems" : variant}`}>
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

function ProjectShowcase({ name, number, variant, description, status = "Work in progress", tagline, subtitle, architectureQuestion, engineeringFocus, technologies, links, screenshots, demoUrl, githubUrl }: Project) {
  const titleId = `project-${number}-heading`;

  return (
    <article className="project-showcase" aria-labelledby={titleId}>
      <ProjectArtwork name={name} variant={variant} screenshots={screenshots} />
      <div className="project-details" tabIndex={0} role="group" aria-labelledby={titleId}>
        <span className="project-peel" aria-hidden="true" />
        <div className="project-copy">
        <p className="project-index">{number} — Selected project</p>
        <h3 id={titleId}>{name}</h3>
        {tagline && <p className="project-tagline">{tagline}</p>}
        {subtitle && <p className="project-subtitle">{subtitle}</p>}
        <p className="project-description">{description}</p>
        {architectureQuestion && <p className="project-question">{architectureQuestion}</p>}
        {engineeringFocus && <div className="project-focus"><p className="eyebrow">Engineering focus</p><ul>{engineeringFocus.map((focus) => <li key={focus}>{focus}</li>)}</ul></div>}
        {technologies?.length ? <p className="project-stack-label eyebrow">Technology stack</p> : null}
        <div className="project-tags">
          <span className="project-status">{status}</span>
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
      <div className="section-header justify-center text-center">
        <div><p className="eyebrow">Ideas into systems</p><h2 id="work-heading">AI Systems</h2></div>
      </div>
      <div className="project-list">{projects.map((project) => <ProjectShowcase key={project.number} {...project} />)}</div>
    </section>
  );
}
