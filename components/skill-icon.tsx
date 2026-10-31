export type SkillIconKind = "ai" | "code" | "server" | "interface" | "database" | "cloud" | "enterprise" | "engineering" | "credential";

export function SkillIcon({ kind }: { kind: SkillIconKind }) {
  return <span className={`skill-tile skill-tile-${kind}`} aria-hidden="true"><span className="skill-tile-face"><svg viewBox="0 0 48 48" fill="none" focusable="false">
    {kind === "ai" ? <><path d="m24 7 14 8v17l-14 8-14-8V15Z" /><path d="m10 15 14 9 14-9M24 24v16M17 11l14 9v16" /><circle cx="24" cy="24" r="4" className="skill-icon-core" /></> :
      kind === "code" ? <><path d="m17 13-11 11 11 11M31 13l11 11-11 11M28 8l-8 32" /></> :
      kind === "server" ? <><rect x="8" y="8" width="32" height="13" rx="4" /><rect x="8" y="27" width="32" height="13" rx="4" /><path d="M21 14h12M21 33h12" /><circle cx="14" cy="14" r="2" className="skill-icon-core" /><circle cx="14" cy="33" r="2" className="skill-icon-core" /></> :
      kind === "interface" ? <><rect x="6" y="9" width="36" height="30" rx="5" /><path d="M6 18h36M12 13h1M17 13h1M13 25h9v8h-9ZM28 25h7M28 31h7" /></> :
      kind === "database" ? <><ellipse cx="24" cy="12" rx="15" ry="6" /><path d="M9 12v24c0 8 30 8 30 0V12M9 23c0 8 30 8 30 0" /></> :
      kind === "cloud" ? <><path d="M14 34a9 9 0 0 1-1-18 12 12 0 0 1 23-1 10 10 0 0 1-1 19M24 22v19m-7-12 7-7 7 7" /></> :
      kind === "enterprise" ? <><path d="M10 41V12l14-5 14 5v29M6 41h36M20 41V30h8v11M17 16h1m12 0h1m-14 7h1m12 0h1" /></> :
      kind === "engineering" ? <><path d="M10 10h28v31H10ZM17 6h14v8H17Z" /><path d="m16 26 5 5 11-11" /></> :
      <><path d="m24 6 6 4 7 1 1 7 4 6-4 6-1 7-7 1-6 4-6-4-7-1-1-7-4-6 4-6 1-7 7-1Z" /><path d="m16 24 6 6 11-12" /></>}
  </svg></span></span>;
}
