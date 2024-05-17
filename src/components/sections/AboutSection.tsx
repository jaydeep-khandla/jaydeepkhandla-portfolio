"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleUp, fadeIn } from "@/utils/variants";
import DownloadLogo from "@/app/images/download.svg";

const frontendTech = [
  "JavaScript(ES6+)",
  "React.js",
  "Next.js",
  "HTML5",
  "CSS3",
];
const uiTech = ["Bootstrap", "TailwindCSS", "Material-UI"];
const backendTech = ["Typscript", "Node.js", "Express.js", "Python", "MongoDB", "MySQL"];
const toolsTech = [
  "Git/Github",
  "Postman",
  "Socket.io",
  "mediasoup",
];
// initial="hidden" whileInView={"visible"} variants={scaleUp(0.5)} viewport={{once:false, amount:0.7}}

export default function AboutSection() {
  return (
    <section id="about" className="h-fit w-full flex px-8 py-10 my-10 flex-col gap-5 lg:px-16 xl:px-40">
      <motion.h1 initial="hidden" whileInView={"visible"} variants={scaleUp()} viewport={{once:false, amount:0.1}} className="text-left text-6xl pb-5 font-anton lg:text-8xl lg:w-[50rem] xl:w-[70rem]">
        Passionate About Backend, Dedicated To Full Stack
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 h-fit gap-20 ">
        <motion.p initial="hidden" whileInView={"visible"} variants={fadeIn('left', 0.1)} viewport={{once:false, amount:0.1}} className="text-left break-words text-xl leading-tight font-fira">
          A passionate and dedicated Full Stack Web Developer based in India.{" "}
          <br />
          <br /> 
          With a deep love for Web Development and a keen eye for Backend
          Development, I{"'"}ve spent the past 3 years crafting Full stack Web-Apps
          that make a meaningful impact.
          <br />
          <br /> 
          Currently, I{"'"}m working on some exciting new projects that aim
          to enhance user experience and introduce innovative features.
          <br />
          <br />
          I also have some sketching skills. Want to check out my sketches? <a href="https://www.instagram.com/the_a.r.t_company?igsh=MWRmem80ZHhvcTdxNg==" target="_blank" className="border-b-2 font-mono border-white">Click Here</a>
          <br />
          <br />
          Let{"'"}s explore what we can create together!
          <br />
          <br />
          <motion.button
            initial="hidden"
            animate="visible"
            variants={scaleUp()}
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center gap-2 px-2 py-1 text-base font-fira bg-transparent border-2 border-white"
          >
            <a
              href="https://drive.google.com/file/d/1jNUbba1CjhLORC675tfKhyAHwXkTYwBx/view?usp=drivesdk"
              target="_blank"
            >
              Resume
            </a>
            <Image src={DownloadLogo} alt="Download" width={20} height={20} />
          </motion.button>
        </motion.p>
        <motion.div initial="hidden" whileInView={"visible"} variants={fadeIn('right', 0.1)} viewport={{once:false, amount:0.1}} className="w-full flex flex-col justify-start border-2 border-white rounded-xl p-5">
          <h3 className="font-fira font-bold text-2xl text-slate-100">
            Frontend Tools
          </h3>
          <span className="flex flex-wrap my-3 gap-3 text-zinc-300">
            {frontendTech.map((t, index) => (
              <span key={index} className="bg-white text-black px-2 py-1 rounded-lg">
                {t}
              </span>
            ))}
          </span>
          <h3 className="font-fira font-bold text-2xl text-slate-100">
            UI Libraries
          </h3>
          <span className="flex flex-wrap my-3 gap-3 text-zinc-300">
            {uiTech.map((t, index) => (
              <span key={index} className="bg-white text-black px-2 py-1 rounded-lg">
                {t}
              </span>
            ))}
          </span>
          <h3 className="font-fira font-bold text-2xl text-slate-100">
            Backend Tools & Databases
          </h3>
          <span className="flex flex-wrap my-3 gap-3 text-zinc-300">
            {backendTech.map((t, index) => (
              <span key={index} className="bg-white text-black px-2 py-1 rounded-lg">
                {t}
              </span>
            ))}
          </span>
          <h3 className="font-fira font-bold text-2xl text-slate-100">
            Tools & Technologies
          </h3>
          <span className="flex flex-wrap my-3 gap-3 text-zinc-300">
            {toolsTech.map((t, index) => (
              <span key={index} className="bg-white text-black px-2 py-1 rounded-lg">
                {t}
              </span>
            ))}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
