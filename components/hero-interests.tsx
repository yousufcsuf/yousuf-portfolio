"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { InterestArchitecture } from "./interest-architecture";

const interests = [
  "Distributed AI Systems + Inference",
  "LLM Inference & Performance Optimization",
  "Agentic & Autonomous Systems",
] as const;

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
function isVisible() { return document.visibilityState === "visible"; }
function serverSnapshot() { return false; }

export function HeroInterests() {
  const [state, setState] = useState({ index: 0, length: interests[0].length, deleting: false });
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, serverSnapshot);
  const visible = useSyncExternalStore(subscribeToVisibility, isVisible, serverSnapshot);
  const topic = interests[state.index];

  useEffect(() => {
    if (paused || reducedMotion || !visible) return;
    const complete = !state.deleting && state.length === topic.length;
    const empty = state.deleting && state.length === 0;
    const delay = complete ? 4800 : empty ? 250 : state.deleting ? 22 : 45;
    const timer = window.setTimeout(() => {
      setState((current) => {
        if (!current.deleting && current.length === interests[current.index].length) return { ...current, deleting: true };
        if (current.deleting && current.length === 0) return { index: (current.index + 1) % interests.length, length: 0, deleting: false };
        return { ...current, length: current.length + (current.deleting ? -1 : 1) };
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [state, topic, paused, reducedMotion, visible]);

  return (
    <div className="hero-interests" data-paused={paused || reducedMotion || !visible}>
      <p className="interest-label" aria-hidden="true">Area of interest</p>
      <p className="sr-only">Area of interest: {interests.join("; ")}.</p>
      <div className="interest-cycle" aria-hidden="true">
        <span className="interest-word">
          {interests.map((interest) => <span className="interest-sizer" key={interest}>{interest}</span>)}
          <span className="interest-current">{topic.slice(0, state.length)}<span className="interest-cursor" /></span>
        </span>
      </div>
      <p className="interests-static" aria-hidden="true">{interests.join(" · ")}</p>
      <InterestArchitecture index={state.index} paused={paused || reducedMotion || !visible} />
      <button type="button" className="interest-pause" onClick={() => setPaused((current) => !current)} aria-label={paused ? "Resume interest animation" : "Pause interest animation"} title={paused ? "Resume animation" : "Pause animation"}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
    </div>
  );
}
