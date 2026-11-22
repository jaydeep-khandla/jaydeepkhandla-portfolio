"use client";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import "./portfolio.css";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [desktop, setDesktop] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 2000);
    return () => window.clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const media = matchMedia("(min-width: 861px) and (hover: hover) and (pointer: fine)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: reduced ? 0 : 0.45, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="portfolio">
        {desktop && !reduced && (
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            outerScale={1.35}
            color="65,126,56"
            clickables={["button", "a", "input", "textarea"]}
          />
        )}
        {!loading && children}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="splash"
              exit={{ opacity: 0, y: reduced ? 0 : -10 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              className="splash fixed inset-0 z-50 flex min-h-screen flex-wrap content-center items-center justify-center gap-3"
              aria-label="Dawn, Dreams, Dusk"
            >
              {["Dawn,", "Dreams,", "Dusk"].map((word, index) => (
                <motion.span
                  aria-hidden="true"
                  key={word}
                  initial={reduced ? false : { y: 12, opacity: 0.65 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.13, duration: 0.45 }}
                >
                  {Array.from(word).map((letter, i) => (
                    <i key={i} style={{ animationDelay: `${index * 150 + i * 37}ms` }}>{letter}</i>
                  ))}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
