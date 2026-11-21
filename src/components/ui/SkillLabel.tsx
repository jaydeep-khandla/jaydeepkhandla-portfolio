"use client";
import { useReveal } from "../useReveal";
import { motion } from "framer-motion";
export default function SkillLabel({ skill }: { skill: string }) {
  const reveal = useReveal();
  return (
    <motion.span {...reveal("pop")} className="chip">
      {skill}
    </motion.span>
  );
}
