type Project = {
  name: string;
  number: string;
  variant: "documents" | "systems";
};

function ProjectArtwork({ variant }: Pick<Project, "variant">) {
  return (
    <div className={`project-art project-art--${variant}`} aria-hidden="true">
      {variant === "documents" ? <div className="document-stack"><div className="document-sheet document-sheet-back" /><div className="document-sheet"><span className="document-mark">d.</span><div className="document-rule" /><div className="document-rule" /><div className="document-rule short" /><div className="document-highlight"><div className="document-rule" /><div className="document-rule short" /></div></div></div> : <svg viewBox="0 0 480 330" fill="none" className="system-art" focusable="false"><ellipse cx="240" cy="165" rx="157" ry="106" stroke="currentColor" opacity=".18" /><ellipse cx="240" cy="165" rx="104" ry="70" stroke="currentColor" opacity=".15" /><path d="M83 165H397M240 59V271M130 90L350 240M130 240L350 90" stroke="currentColor" opacity=".2" />{[[83,165],[397,165],[240,59],[240,271],[130,90],[350,240],[130,240],[350,90]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".5" />)}<rect x="206" y="131" width="68" height="68" rx="20" fill="#f6f4eb" stroke="currentColor" strokeOpacity=".4" /><path d="M226 177V153L254 177V153" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </div>
  );
}

function ProjectCard({ name, number, variant }: Project) {
  return (
    <article className="project-preview">
      <div className="project-meta"><span>Project / {number}</span><span className="project-status">Work in progress</span></div>
      <h3>{name}</h3>
      <p>In development. Project details and case study to follow.</p>
      <ProjectArtwork variant={variant} />
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="page-container work-section">
      <div className="section-header"><div><p className="eyebrow">Ideas into systems</p><h2 id="work-heading">Selected work.</h2></div><p>A closer look at what I’m building.<br />Considered, from concept to code.</p></div>
      <div className="project-grid"><ProjectCard name="DocuFlow AI" number="01" variant="documents" /><ProjectCard name="ReliantOps Nexus" number="02" variant="systems" /></div>
    </section>
  );
}
