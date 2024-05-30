"use client";
import React from "react";
import dynamic from "next/dynamic";
import { fadeIn, scaleUp } from "@/utils/variants";
import { motion } from "framer-motion";
const Card = dynamic(() => import("@/components/Card"), { ssr: false });
import { projects } from "@/app/libs/data";

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
