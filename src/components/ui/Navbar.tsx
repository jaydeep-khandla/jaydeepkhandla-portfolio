"use client";
import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const navbarVariants = {
  hidden: {
    translateY: 100,
    opacity: 0,
  },
  visible: {
    translateY: 1,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
      delay: 0.8,
    },
  },
};

const hoverVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    backgroundColor: "rgba(255, 255, 255)",
    color: "rgba(0, 0, 0)",
    transition: {
      ease: "easeInOut",
      duration: 1,
      delay: 0.8,
    },
  },
};

export default function Navbar() {
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="fixed z-[100] h-fit bottom-16 flex w-fit gap-3 backdrop-blur-xl font-fira border-[1px] border-white rounded-md"
    >
      <motion.span className = "rounded-md flex h-fit w-fit"
        whileHover={{
          backgroundColor: "rgba(255, 255, 255)",
          transition: {
            type: "spring", 
            // ease: "easeInOut",
            duration: 0.5,
          },
        }}
      >
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={0}
          duration={1500}
          className="text-white h-full w-full px-2 py-2 hover:text-black"
        >
          Home
        </Link>
      </motion.span>
      <motion.span className = "rounded-md flex h-fit w-fit"
        whileHover={{
          backgroundColor: "rgba(255, 255, 255)",
          transition: {
            // ease: "easeInOut",
            duration: 0.5,
          },
        }}
      >
        <Link
          to="projects"
          spy={true}
          smooth={true}
          offset={10}
          duration={1500}
          className="text-white h-full w-full px-2 py-2 hover:text-black"
        >
          Projects
        </Link>
      </motion.span>
      <motion.span className = "rounded-md flex h-fit w-fit"
        whileHover={{
          backgroundColor: "rgb(255, 255, 255)",
          transition: {
            type: "spring",
            // ease: "linear",
            duration: 0.5,
          },
        }}
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={0}
          duration={1500}
          className="text-white h-full w-full px-2 py-2 hover:text-black"
        >
          About
        </Link>
      </motion.span>
      <motion.span className = "rounded-md flex h-fit w-fit"
        whileHover={{
          backgroundColor: "rgba(255, 255, 255)",
          transition: {
            type: "spring",
            // ease: "linear",
            duration: 0.5,
          },
        }}
      >
        <Link
          to="contact"
          spy={true}
          smooth={true}
          offset={0}
          duration={1500}
          className="text-white h-full w-full px-2 py-2 hover:text-black"
        >
          Contact
        </Link>
      </motion.span>
    </motion.nav>
  );
}
