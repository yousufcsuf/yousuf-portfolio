"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent, type ReactNode, type TransitionEvent } from "react";
import type { ProjectScreenshot } from "@/data/projects";

type ConceptSlide = { id: string; caption: string; content: ReactNode };
type ProjectGalleryProps = { name: string; screenshots: readonly ProjectScreenshot[]; concepts: readonly ConceptSlide[] };
const AUTOPLAY_INTERVAL = 4500;

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getReducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
function subscribeToVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
function isDocumentVisible() { return document.visibilityState === "visible"; }
function serverSnapshot() { return false; }

export function ProjectGallery({ name, screenshots, concepts }: ProjectGalleryProps) {
  const [position, setPosition] = useState(1);
  const [snap, setSnap] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, serverSnapshot);
  const documentVisible = useSyncExternalStore(subscribeToVisibility, isDocumentVisible, serverSnapshot);
  const viewportId = useId();
  const hasScreenshots = screenshots.length > 0;
  const slides = hasScreenshots
    ? screenshots.map((screenshot) => ({ id: screenshot.src, caption: screenshot.caption ?? screenshot.alt, screenshot, content: null }))
    : concepts.map((concept) => ({ ...concept, screenshot: undefined }));
  const count = slides.length;
  const activeIndex = count ? ((position - 1) % count + count) % count : 0;
  const displayPosition = count > 1 ? (reducedMotion ? activeIndex + 1 : position) : 0;
  const autoplay = count > 1 && !paused && !hovered && !reducedMotion && inView && documentVisible;

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15), { threshold: 0.15 });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => setPosition((current) => ((current - 1 + count) % count) + 2), AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [autoplay, count]);

  // At either end, swap the duplicate for its identical real slide without motion.
  useEffect(() => {
    if (!snap) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setSnap(false));
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [snap]);

  if (!count) return null;

  const trackSlides = count > 1
    ? [{ ...slides[count - 1], key: "duplicate-last", slideIndex: count - 1, duplicate: true }, ...slides.map((slide, slideIndex) => ({ ...slide, key: `slide-${slide.id}`, slideIndex, duplicate: false })), { ...slides[0], key: "duplicate-first", slideIndex: 0, duplicate: true }]
    : [{ ...slides[0], key: `slide-${slides[0].id}`, slideIndex: 0, duplicate: false }];

  function moveBy(direction: number) {
    setPaused(true);
    setPosition(reducedMotion ? ((activeIndex + direction + count) % count) + 1 : activeIndex + 1 + direction);
  }
  function goTo(slideIndex: number) { setPaused(true); setPosition(slideIndex + 1); }
  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (position === 0 || position === count + 1) {
      setSnap(true);
      setPosition(position === 0 ? count : 1);
    }
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case "ArrowRight": event.preventDefault(); moveBy(1); break;
      case "ArrowLeft": event.preventDefault(); moveBy(-1); break;
      case "Home": event.preventDefault(); goTo(0); break;
      case "End": event.preventDefault(); goTo(count - 1); break;
    }
  }
  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" || !event.isPrimary) return;
    setPaused(true);
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const horizontal = event.clientX - start.x;
    const vertical = event.clientY - start.y;
    if (Math.abs(horizontal) > 40 && Math.abs(horizontal) > Math.abs(vertical)) moveBy(horizontal < 0 ? 1 : -1);
  }

  return (
    <div ref={galleryRef} className="project-gallery" role="region" aria-roledescription="carousel" aria-label={`${name} previews`} tabIndex={0} onKeyDown={handleKeyDown}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget) && event.target.matches(":focus-visible")) setPaused(true); }}>
      <div className="project-browser">
        <div className="project-browser-toolbar" aria-hidden="true"><span className="project-browser-controls"><i /><i /><i /></span><span className="project-browser-title">{name}</span><span className="project-browser-menu">•••</span></div>
        <div id={viewportId} className="project-web-screen gallery-viewport" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }}>
          <div className={`gallery-track${snap ? " is-snapping" : ""}`} style={{ transform: `translate3d(-${displayPosition * 100}%, 0, 0)` }} onTransitionEnd={handleTransitionEnd}>
            {trackSlides.map((slide) => (
              <div key={slide.key} className="gallery-slide" role="group" aria-roledescription="slide" aria-label={`${slide.slideIndex + 1} of ${count}`} aria-hidden={slide.duplicate || slide.slideIndex !== activeIndex} inert={slide.duplicate || slide.slideIndex !== activeIndex}>
                {slide.screenshot ? <Image src={slide.screenshot.src} alt={slide.screenshot.alt} fill sizes="(min-width: 1600px) 600px, (min-width: 768px) 44vw, 90vw" className="gallery-image" /> : slide.content}
              </div>
            ))}
          </div>
        </div>
      </div>
      {count > 1 && <div className="gallery-controls">
        <button type="button" className="gallery-arrow" onClick={() => moveBy(-1)} aria-label={`Previous ${name} preview`} aria-controls={viewportId}><span aria-hidden="true">←</span></button>
        <div className="gallery-dots" role="group" aria-label="Choose a preview">{slides.map((slide, slideIndex) => <button key={slide.id} type="button" className={`gallery-dot${slideIndex === activeIndex ? " is-active" : ""}`} onClick={() => goTo(slideIndex)} aria-label={`Show ${name} preview ${slideIndex + 1} of ${count}`} aria-current={slideIndex === activeIndex ? "true" : undefined} aria-controls={viewportId}><span /></button>)}</div>
        <button type="button" className="gallery-arrow" onClick={() => moveBy(1)} aria-label={`Next ${name} preview`} aria-controls={viewportId}><span aria-hidden="true">→</span></button>
      </div>}
      <div className="gallery-status">
        <p className="gallery-caption" aria-live={autoplay ? "off" : "polite"} aria-atomic="true">{activeIndex + 1} / {count} · {slides[activeIndex].caption}</p>
        {count > 1 && <button type="button" className="gallery-autoplay" disabled={reducedMotion} onClick={() => setPaused((current) => !current)} aria-label={reducedMotion ? "Autoplay disabled by reduced-motion preference" : paused ? `Start automatic ${name} previews` : `Pause automatic ${name} previews`} aria-controls={viewportId}><span aria-hidden="true">{paused || reducedMotion ? "▶" : "Ⅱ"}</span>{reducedMotion ? "Auto off" : paused ? "Play" : "Pause"}</button>}
      </div>
    </div>
  );
}
