"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const revealSelector = [
  ".section-header", ".project-showcase", ".home-about", ".experience-section",
  ".contact-section", ".about-intro", ".quiet-section", ".note-card", ".experiment-card",
].join(",");

function focusSection(target: HTMLElement) {
  const needsTabIndex = !target.hasAttribute("tabindex");
  if (needsTabIndex) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  if (needsTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
}

export function ScrollExperience() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    function configure() {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (reducedMotion.matches || !finePointer.matches) return;
      lenisRef.current = new Lenis({
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        virtualScroll: ({ event }) => !event.ctrlKey && !event.shiftKey,
      });
    }

    function handleAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) window.history.pushState(null, "", url.href);
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const destination = id === "top" ? 0 : Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
      if (anchor.classList.contains("skip-link") || reducedMotion.matches) {
        lenisRef.current?.scrollTo(destination, { immediate: true });
        window.scrollTo({ top: destination, behavior: "instant" });
        focusSection(target);
      } else if (lenisRef.current) {
        lenisRef.current.scrollTo(destination, {
          lerp: 0,
          duration: 1.15,
          easing: (time) => 1 - Math.pow(1 - time, 4),
          onComplete: () => focusSection(target),
        });
      } else {
        window.scrollTo({ top: destination, behavior: "smooth" });
        focusSection(target);
      }
    }

    configure();
    reducedMotion.addEventListener("change", configure);
    finePointer.addEventListener("change", configure);
    document.addEventListener("click", handleAnchor, true);
    return () => {
      document.removeEventListener("click", handleAnchor, true);
      reducedMotion.removeEventListener("change", configure);
      finePointer.removeEventListener("change", configure);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    function configureReveals() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer?.unobserve(entry.target);
          if (entry.target.contains(document.activeElement)) return;
          const animation = entry.target.animate([
            { opacity: 0, transform: "translateY(22px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], { duration: 800, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
          animations.add(animation);
          animation.onfinish = () => { animations.delete(animation); };
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      document.querySelectorAll(revealSelector).forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight * 0.9) observer?.observe(element);
      });
    }

    lenisRef.current?.resize();
    configureReveals();
    reducedMotion.addEventListener("change", configureReveals);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener("change", configureReveals);
    };
  }, [pathname]);

  return null;
}
