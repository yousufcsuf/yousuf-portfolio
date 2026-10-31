"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function TimelineMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    function animate(element: Element | null, frames: Keyframe[], delay = 0, duration = 750) {
      if (!element || element.contains(document.activeElement)) return;
      const animation = element.animate(frames, {
        duration, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards",
      });
      animations.add(animation);
      animation.onfinish = () => { animations.delete(animation); };
    }

    function configure() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      root?.querySelectorAll("[data-timeline-entered]").forEach((element) => element.removeAttribute("data-timeline-entered"));
      if (reducedMotion.matches) return;

      observer = new IntersectionObserver((entries) => {
        if (reducedMotion.matches) return;
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer?.unobserve(target);
          target.setAttribute("data-timeline-entered", "true");
          if (target.classList.contains("career-company-header")) {
            animate(target.querySelector(".career-mark"), [
              { opacity: 0, transform: "scale(0.8) rotate(-12deg)" },
              { opacity: 1, transform: "scale(1.06) rotate(2deg)", offset: 0.7 },
              { opacity: 1, transform: "scale(1) rotate(0deg)" },
            ]);
            animate(target.querySelector("h2"), [{ opacity: 0, transform: "translateX(14px)" }, { opacity: 1, transform: "none" }], 100);
          } else {
            animate(target.querySelector("article"), [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], 100, 850);
            target.querySelectorAll(".career-highlights > li").forEach((item, index) => {
              animate(item, [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], 180 + index * 80, 650);
            });
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      root?.querySelectorAll(".career-company-header, .career-role").forEach((element) => observer?.observe(element));
    }

    configure();
    reducedMotion.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener("change", configure);
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
