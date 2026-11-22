"use client";
import { useEffect, useRef } from "react";

// Parallel traces follow the same bend, changing lanes at staggered pads.
const traces = Array.from({ length: 18 }, (_, lane) => {
  const offset = lane * 8;
  const start = 65 + (lane % 5) * 38;
  const end = 1120 + (lane % 7) * 46;
  const y = 390 + offset;
  return {
    path: `M-40 ${y + 48} H${start} l48 -48 H300 C530 ${y}, 610 ${y - 195}, 860 ${y - 195} H${end - 28} l28 -28`,
    x: end, y: y - 223,
  };
});

export default function HeroNetwork() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const surface = layer.current;
    const hero = surface?.parentElement;
    if (!surface || !hero) return;
    function track(event: PointerEvent) {
      if (!hero || !surface) return;
      const box = hero.getBoundingClientRect();
      surface.style.setProperty("--network-x", event.clientX - box.left + "px");
      surface.style.setProperty("--network-y", event.clientY - box.top + "px");
      surface.dataset.active = "true";
    }
    function clear() {
      surface?.removeAttribute("data-active");
    }
    hero.addEventListener("pointermove", track);
    hero.addEventListener("pointerdown", track);
    hero.addEventListener("pointerleave", clear);
    hero.addEventListener("pointercancel", clear);
    return () => {
      hero.removeEventListener("pointermove", track);
      hero.removeEventListener("pointerdown", track);
      hero.removeEventListener("pointerleave", clear);
      hero.removeEventListener("pointercancel", clear);
    };
  }, []);
  return (
    <div ref={layer} className="hero-network" aria-hidden="true">
      <svg viewBox="0 0 1440 640" preserveAspectRatio="none">
        <defs><g id="hero-wire-surface">{traces.map(trace => <g key={trace.y}><path d={trace.path} /><circle cx={trace.x + 3} cy={trace.y} r="3" /></g>)}</g></defs>
        <use href="#hero-wire-surface" />
      </svg>
      <div className="network-light">
        <svg viewBox="0 0 1440 640" preserveAspectRatio="none">
          <use href="#hero-wire-surface" />
        </svg>
      </div>
    </div>
  );
}
