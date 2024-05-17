"use client"
import React from "react";
import { Transition, motion } from "framer-motion";

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
  return (
    <motion.span
    style={ballStyle}
    initial={{ x: -50 }}
    animate={{ x: 50 }}
    transition={bounceTransition}
  />
  );
}