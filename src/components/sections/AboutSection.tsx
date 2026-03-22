'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { scaleUp, fadeIn } from '@/utils/variants';
import DownloadLogo from '@/app/images/download.svg';
import { getAbout, getSkills } from '@/app/libs/apiClient';

interface About {
  name: string;
  resumeUrl: string;
  instagramUrl: string;
  bio: string;
}

interface Skill {
  category: string;
  skills: string[];
}

export default function AboutSection() {
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const aboutData = await getAbout();
      const skillsData = await getSkills();

      if (aboutData) {
        setAbout(aboutData);
      }
      setSkills(skillsData);
    } catch (error) {
      console.error('Error loading about section:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const skillCategories: Record<string, string> = {
    frontend: 'Frontend Tools',
    backend: 'Backend Tools & Databases',
    ui: 'UI Libraries',
    tools: 'Tools & Technologies',
  };

  if (isLoading || !about) {
    return (
      <section
        id="about"
        className="h-fit w-full flex px-8 py-10 my-10 flex-col gap-5 lg:px-16 xl:px-40"
      >
        <div className="text-zinc-400">Loading about section...</div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="h-fit w-full flex px-8 py-10 my-10 flex-col gap-5 lg:px-16 xl:px-40"
    >
      <motion.h1
        initial="hidden"
        whileInView={'visible'}
        variants={scaleUp()}
        viewport={{ once: false, amount: 0.1 }}
        className="text-left text-6xl pb-5 font-anton lg:text-8xl lg:w-[50rem] xl:w-[70rem]"
      >
        Passionate About Backend, Dedicated To Full Stack
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 h-fit gap-20 ">
        <motion.div
          initial="hidden"
          whileInView={'visible'}
          variants={fadeIn('left', 0.1)}
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col gap-6"
        >
          <p className="text-left text-xl leading-relaxed font-fira whitespace-pre-wrap break-words">
            {about.bio}
          </p>
          <div>
            <motion.button
              initial="hidden"
              animate="visible"
              variants={scaleUp()}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center gap-2 px-2 py-1 text-base font-fira bg-transparent border-2 border-white"
            >
              <a href={about.resumeUrl} target="_blank">
                Resume
              </a>
              <Image src={DownloadLogo} alt="Download" width={20} height={20} />
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView={'visible'}
          variants={fadeIn('right', 0.1)}
          viewport={{ once: false, amount: 0.1 }}
          className="w-full flex flex-col justify-start border-2 border-white rounded-xl p-5"
        >
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className="font-fira font-bold text-2xl text-slate-100">
                {skillCategories[skillGroup.category] || skillGroup.category}
              </h3>
              <span className="flex flex-wrap my-3 gap-3 text-zinc-300">
                {skillGroup.skills.map((t) => (
                  <span
                    key={t}
                    className="bg-white text-black px-2 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
