"use client";
import { useReducedMotion } from "framer-motion";

const poses = {
  label: { x: -14 },
  heading: { y: 12, clipPath: "inset(0 0 85% 0)" },
  card: { y: 36, scale: 0.97 },
  pop: { scale: 0.85 },
  rise: { y: 22 },
};
const settled = { x: 0, y: 0, scale: 1 };
export function useReveal() {
  const reduced = useReducedMotion();
  return (kind: keyof typeof poses, delay = 0) => ({
    initial: reduced ? false as const : poses[kind],
    whileInView: reduced ? undefined : kind === "heading" ? {...settled, clipPath:"inset(0 0 0% 0)"} : settled,
    viewport: { once: true, amount: "some" as const },
    transition: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: [0.2,0.7,0.2,1] as [number,number,number,number] },
  });
}
