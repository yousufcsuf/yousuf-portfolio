"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function EducationMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    function configure() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      root?.querySelectorAll(".education-entry").forEach((entry) => entry.removeAttribute("data-entered"));
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer?.unobserve(target);
          target.setAttribute("data-entered", "true");
          const elements = target.querySelectorAll(".education-mark, .education-meta, h3, .education-field, .education-coursework, .education-year");
          elements.forEach((element, index) => {
            const animation = element.animate([
              { opacity: 0, transform: `translateY(${index === 0 ? 16 : 24}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ], { duration: 1000, delay: index * 100, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        });
      }, { threshold: 0.15 });
      root?.querySelectorAll(".education-entry").forEach((entry) => observer?.observe(entry));
    }
    configure();
    preference.addEventListener("change", configure);
    return () => { observer?.disconnect(); animations.forEach((animation) => animation.cancel()); preference.removeEventListener("change", configure); };
  }, []);
  return <div ref={ref}>{children}</div>;
}
