"use client";
import React from "react";
import { motion } from "framer-motion";
import { PinContainer } from "@/components/ui/3d-pin";
import SkillLabel from "./ui/SkillLabel";
import Image, { StaticImageData } from "next/image";

export default function AnimatedPin({ title, description, urlTitle, href, tech, srcImg } : { 
  title: string, 
  description: string, 
  urlTitle: string, 
  href: string,
  tech: string[]
  srcImg: StaticImageData
 }) {
  return (
    
    <motion.div className="h-[30rem] w-full flex items-center justify-center " initial = 'hidden' animate = 'visible' variants={{
        hidden: {
          scale: 0,
          opacity: 0
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: .4
          }
        },
      }}>
      <PinContainer
        title={urlTitle}
        href={href}
      >
        <div className="flex basis-full flex-col p-4 tracking-normal text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-fira font-bold text-2xl text-slate-100">
            {title}
          </h3>
          <div className="text-base !m-0 !p-0 font-fira font-normal">
            <span className=" text-zinc-300">
              {description}
            </span>
          </div>
          <div className="!m-0 !py-2">
            <span className="flex flex-wrap gap-1 text-zinc-300">
              {tech.map((t, index) => (
                <SkillLabel key={index} skill={t} />
              ))}
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg bg-zinc-700">
            <Image alt={title} src={srcImg} className="h-full w-full" />
          </div>
        </div>
      </PinContainer>
    </motion.div>
  );
}
