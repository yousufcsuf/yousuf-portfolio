import { EducationMotion } from "./education-motion";

const institutions = [
  { monogram: "CF", institution: "California State University, Fullerton", degree: "Master of Science", field: "Computer Science", date: "May 2026", year: "2026", focus: ["Software Design & Architecture", "Web Backend Engineering", "Advanced Algorithms"] },
  { monogram: "SC", institution: "Siena College", degree: "Bachelor of Science", field: "Computer Science", date: "2021", year: "2021", focus: [] },
] as const;

export function Education() {
  return <section id="education" tabIndex={-1} className="page-container education-section" aria-labelledby="education-heading">
    <div className="education-heading"><p className="eyebrow">Education</p><h2 id="education-heading">A foundation for<br /><em>what comes next.</em></h2><p>Computer science foundations. An enduring curiosity for intelligent systems.</p></div>
    <EducationMotion>
      <ol className="education-list">
        {institutions.map((school, index) => <li className="education-entry" key={school.institution}>
          <div className="education-mark" aria-hidden="true"><svg viewBox="0 0 100 100" focusable="false"><circle className="education-orbit" cx="50" cy="50" r="44" /><circle className="education-inner-orbit" cx="50" cy="50" r="35" /><path className="education-compass" d="M50 2v9M50 89v9M2 50h9M89 50h9" /></svg><span>{school.monogram}</span></div>
          <article><div className="education-meta"><span>0{index + 1} / {school.degree}</span><time dateTime={index === 0 ? "2026-05" : "2021"}>{school.date}</time></div><h3>{school.institution}</h3><p className="education-field">{school.field}</p>{school.focus.length > 0 && <div className="education-coursework"><p>Selected coursework</p><ul>{school.focus.map((course) => <li key={course}>{course}</li>)}</ul></div>}</article>
          <span className="education-year" aria-hidden="true">{school.year}</span>
        </li>)}
      </ol>
    </EducationMotion>
  </section>;
}
