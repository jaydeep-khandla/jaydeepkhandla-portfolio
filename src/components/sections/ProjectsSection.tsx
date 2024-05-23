"use client";
import React from "react";
import dynamic from "next/dynamic";
import { fadeIn, scaleUp } from "@/utils/variants";
import { motion } from "framer-motion";
const Card = dynamic(() => import("@/components/Card"), { ssr: false });
import JdxImg from '@/app/images/jdx-ss.png';
import ZeptImg from '@/app/images/zept-ss.png';
import KrushiaadharImg from '@/app/images/krushiaadhar-ss.png';
import BrainhuntImg from '@/app/images/brainhunt-ss.png';
import PropathshalaImg from '@/app/images/pathshala-ss.png';

const projects = [
  {
    title: "JDX-Online-Collaborative-Compiler",
    description:
      "JDX Online Compiler is a collaborative coding platform aimed at providing an immersive coding experience.",
    urlTitle: "🔗Github/JDX-Online-Compiler",
    href: "https://github.com/jaydeep-khandla/JDX-Online-Compiler",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "Socket.io",
      "Monaco Code Editor",
    ],
    srcImg: JdxImg
  },
  {
    title: "ZEPT-Video-Conferencing-WebApp",
    description:
      "ZEPT is facilitates seamless video and audio communication, in-meeting chat, and file sharing among users.",
    urlTitle: "🔗Github/Video-Conferencing-WebApp",
    href: "https://github.com/jaydeep-khandla/Video-Conferencing-WebApp",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "Socket.io",
      "mediasoup",
      "MongoDB",
    ],
    srcImg: ZeptImg
  },
  {
    title: "KrushiAadhar-SSIP-Heckathon-2022",
    description:
      "KrushiAadhar is a Digital Identity System for farmers, aimed at providing a unique identity to each farmer.",
    urlTitle: "🔗Github/KrushiAadhar",
    href: "https://github.com/jaydeep-khandla/KrushiAadhar-UISF",
    tech: ["html5", "css3", "javascript", "php", "java", "Android"],
    srcImg: KrushiaadharImg
  },
  {
    title: "Brainhunt-Coding-Plateform-Xenesis-2023",
    description:
      "BrainHunt is a coding competition platform that I had developed for our event at college's Tech-Fest.",
    urlTitle: "🔗Github/x-brain-hunt",
    href: "https://github.com/jaydeep-khandla/x-brain-hunt",
    tech: ["html5", "css3", "javascript", "Github Pages"],
    srcImg: BrainhuntImg
  },
  {
    title: "Porjects-Pathshala-Miniprojects-of-Python",
    description:
      "Developing a Hub for small tech projects to support learning and skills with an organized Repository.",
    urlTitle: "🔗Github/Projects-Pathshala",
    href: "https://github.com/jaydeep-khandla/Projects-PathShala",
    tech: ["Python", "numpy", "pandas", "tkinter", "etc..."],
    srcImg: PropathshalaImg
  },
];

let scale: number[] = [0.2, 0.4, 0.6, 0.2, 0.4];

export default function ProjectsSection() {
  return (
    <section id="projects" className="h-fit py-10 px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-0 m-auto w-fit h-full">
        {
        projects.map((project, index) => (
          <motion.div key={index} initial="hidden" whileInView={"visible"} variants={scaleUp(scale[index])} viewport={{once:false, amount:0.1}}>
            <Card
              title={project.title}
              description={project.description}
              urlTitle={project.urlTitle}
              href={project.href}
              tech={project.tech}
              srcImg={project.srcImg}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
