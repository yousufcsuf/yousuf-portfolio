import { experience, type ExperienceRole } from "@/data/experience";
import { TimelineMotion } from "./timeline-motion";

function Role({ role, headingId }: { role: ExperienceRole; headingId: string }) {
  return (
    <li className="career-role">
      <article aria-labelledby={headingId}>
        <h3 id={headingId}>{role.title}</h3>
        {(role.team || role.employer) && <p className="career-team">{role.team ?? role.employer}</p>}
        <p className="career-meta">
          <span><time dateTime={role.start.dateTime}>{role.start.label}</time><span aria-hidden="true"> — </span><span className="sr-only"> to </span><time dateTime={role.end.dateTime}>{role.end.label}</time></span>
          <span className="career-meta-dot" aria-hidden="true">·</span>
          <span>{role.location}</span>
        </p>
        <ul className="career-highlights">{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      </article>
    </li>
  );
}

export function ExperienceTimeline() {
  return (
    <section className="career-timeline page-container" aria-label="Professional experience">
      <TimelineMotion><ol className="career-companies">
        {experience.map((group) => (
          <li key={group.id} className="career-company">
            <header className="career-company-header">
              <span className="career-mark" aria-hidden="true">{group.initials}</span>
              <h2>{group.organization}</h2>
            </header>
            <ol className="career-roles">{group.roles.map((role) => <Role key={role.start.dateTime} role={role} headingId={`${group.id}-${role.start.dateTime}`} />)}</ol>
          </li>
        ))}
      </ol></TimelineMotion>
    </section>
  );
}
