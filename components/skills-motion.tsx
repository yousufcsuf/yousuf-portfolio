"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function SkillsMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      target.setAttribute("data-visible", String(isIntersecting));
      if (isIntersecting) target.setAttribute("data-entered", "true");
    }), { threshold: 0.08 });
    root.querySelectorAll(".skill-group, .credential-list > li").forEach((item) => observer.observe(item));
    function visibility() { root?.setAttribute("data-hidden", String(document.hidden)); }
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return <div ref={ref} className="skills-motion" data-paused={paused}>
    <button className="skills-animation-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume animations" : "Pause animations"}</button>
    {children}
  </div>;
}
