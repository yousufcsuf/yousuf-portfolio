"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import type { ProjectScreenshot } from "@/data/projects";

type ConceptSlide = {
  id: string;
  caption: string;
  content: ReactNode;
};

type ProjectGalleryProps = {
  name: string;
  screenshots: readonly ProjectScreenshot[];
  concepts: readonly ConceptSlide[];
};

export function ProjectGallery({ name, screenshots, concepts }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const viewportId = useId();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const hasScreenshots = screenshots.length > 0;
  const count = hasScreenshots ? screenshots.length : concepts.length;

  if (count === 0) return null;

  const activeIndex = index % count;
  const screenshot = hasScreenshots ? screenshots[activeIndex] : undefined;
  const concept = hasScreenshots ? undefined : concepts[activeIndex];
  const caption = screenshot?.caption ?? (screenshot ? screenshot.alt : concept?.caption);

  function moveBy(direction: number) {
    setIndex((current) => (current + direction + count) % count);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case "ArrowRight": event.preventDefault(); moveBy(1); break;
      case "ArrowLeft": event.preventDefault(); moveBy(-1); break;
      case "Home": event.preventDefault(); setIndex(0); break;
      case "End": event.preventDefault(); setIndex(count - 1); break;
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" || !event.isPrimary) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const horizontal = event.clientX - start.x;
    const vertical = event.clientY - start.y;
    if (Math.abs(horizontal) > 40 && Math.abs(horizontal) > Math.abs(vertical)) {
      moveBy(horizontal < 0 ? 1 : -1);
    }
  }

  return (
    <div className="project-gallery" role="region" aria-roledescription="carousel" aria-label={`${name} previews`} tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="project-browser">
        <div className="project-browser-toolbar" aria-hidden="true">
          <span className="project-browser-controls"><i /><i /><i /></span>
          <span className="project-browser-title">{name}</span>
          <span className="project-browser-menu">•••</span>
        </div>
        <div id={viewportId} className="project-web-screen gallery-viewport" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }}>
          <div key={activeIndex} className="gallery-slide" role="group" aria-roledescription="slide" aria-label={`${activeIndex + 1} of ${count}`}>
            {screenshot ? <Image src={screenshot.src} alt={screenshot.alt} fill sizes="(min-width: 1600px) 600px, (min-width: 768px) 44vw, 90vw" className="gallery-image" /> : concept?.content}
          </div>
        </div>
      </div>
      {count > 1 && (
        <div className="gallery-controls">
          <button type="button" className="gallery-arrow" onClick={() => moveBy(-1)} aria-label={`Previous ${name} preview`} aria-controls={viewportId}><span aria-hidden="true">←</span></button>
          <div className="gallery-dots" role="group" aria-label="Choose a preview">
            {Array.from({ length: count }, (_, slideIndex) => (
              <button key={slideIndex} type="button" className={`gallery-dot${slideIndex === activeIndex ? " is-active" : ""}`} onClick={() => setIndex(slideIndex)} aria-label={`Show ${name} preview ${slideIndex + 1} of ${count}`} aria-current={slideIndex === activeIndex ? "true" : undefined} aria-controls={viewportId}><span /></button>
            ))}
          </div>
          <button type="button" className="gallery-arrow" onClick={() => moveBy(1)} aria-label={`Next ${name} preview`} aria-controls={viewportId}><span aria-hidden="true">→</span></button>
        </div>
      )}
      <p className="gallery-caption" aria-live="polite" aria-atomic="true">{activeIndex + 1} / {count} · {caption}</p>
    </div>
  );
}
