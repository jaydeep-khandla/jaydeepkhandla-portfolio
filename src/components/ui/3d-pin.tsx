"use client";
import { useReveal } from "../useReveal";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PinContainer({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const reveal = useReveal();
  return (
    <motion.article {...reveal("card")} className="pin">
      <div className="pin-card">
        {children}
      </div>
      <span className="pin-label" aria-hidden="true">
        {title}
      </span>
    </motion.article>
  );
}
