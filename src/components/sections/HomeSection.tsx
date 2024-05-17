"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../ui/Header";
import ProfileImg from "@/app/images/profile-square.png";

const nameVariants = {
  hidden: {
    scale: 100,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: "linear",
      duration: 1,
    },
  },
};

const imageVariants = {
  hidden: {
    translateY: 100,
    opacity: 0,
  },
  visible: {
    translateY: 1,
    opacity: 1,
    transition: {
      ease: "linear",
      duration: 1,
      delay: 1.5,
    },
  },
};

export default function HomeSection() {
  return (
    <section
      id="home"
      className="h-screen min-w-full flex flex-col items-center justify-center"
    >
      <Header />
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={nameVariants}
        className=" text-center font-anton text-8xl text-white"
      >
        JAYDEEP KHANDLA
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        whileHover={{
          transition: { ease: "backInOut" },
          scale: 1.1,
        }}
        className="relative z-10 h-[10rem] w-[10rem] rounded-lg -top-5 border-4 border-white"
      >
        <Image src={ProfileImg} alt="Profile" />
      </motion.div>
    </section>
  );
}
