"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "me", label: "Me" },
  { id: "vision", label: "Vision" },
  { id: "education", label: "Education Institution" },
  { id: "skills", label: "Skills & Credentials" },
] as const;

export function AboutNav() {
  const [active, setActive] = useState<string>("me");
  const [floating, setFloating] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const main = nav.closest("main");
    let frame = 0;
    function update() {
      frame = 0;
      if (!nav) return;
      const top = Math.max(12, (header?.getBoundingClientRect().bottom ?? 88) + 12);
      nav.style.setProperty("--about-nav-top", `${top}px`);
      const offset = top + nav.offsetHeight + 24;
      main?.style.setProperty("--about-anchor-offset", `${offset}px`);
      setFloating(nav.getBoundingClientRect().top <= top + 1);
      let current: string = "me";
      for (const { id } of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= Math.max(offset, window.innerHeight * 0.35)) current = id;
      }
      setActive(current);
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    if (header) observer.observe(header);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      main?.style.removeProperty("--about-anchor-offset");
    };
  }, []);

  return <nav ref={navRef} className={`about-subnav${floating ? " is-floating" : ""}`} aria-label="About sections">
    {sections.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}
  </nav>;
}
