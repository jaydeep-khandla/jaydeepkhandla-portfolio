"use client"
import React from "react";
import { Transition, motion, useReducedMotion } from "framer-motion";

const ballStyle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "white",
  borderRadius: "0.5rem"
};

const bounceTransition: Transition = {
    duration: 0.8,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: "easeInOut"
};

export default function BouncingBall() {
  const reduced = useReducedMotion();
  return (
    <motion.span
    style={ballStyle}
    initial={false}
    animate={reduced ? {} : { x: [-24,24] }}
    transition={bounceTransition}
  />
  );
}
