'use client';
import RichContent from '@/components/RichContent';
import { useReveal } from "../useReveal";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import SkillLabel from "../ui/SkillLabel";
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
  const reveal = useReveal();
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [failures, setFailures] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [bio, groups] = await Promise.allSettled([getAbout(), getSkills()]);
    const failed: string[] = [];
    if (bio.status === 'fulfilled') setAbout(bio.value);
    else failed.push('about');
    if (groups.status === 'fulfilled') setSkills(groups.value);
    else failed.push('skills');
    setFailures(failed);
    setIsLoading(false);
  };

  const skillCategories: Record<string, string> = {
    frontend: 'Frontend Tools',
    backend: 'Backend Tools & Databases',
    ui: 'UI Libraries',
    tools: 'Tools & Technologies',
  };

  return (
    <section id="about" className="section band">
      <motion.p {...reveal('label')} className="eyebrow">
        About
      </motion.p>
      {failures.length > 0 && !isLoading && <p role="alert">Unable to load {failures.join(' and ')}. <button type="button" className="text-link" onClick={fetchData}>Retry</button></p>}
      {isLoading ? (
        <p>Loading about section...</p>
      ) : (
        <div className="split">
          <div>
            <motion.h2 {...reveal('heading')}>
              Passionate About Backend, Dedicated To Full Stack
            </motion.h2>
            {about && (
              <div className="bio">
                <motion.div {...reveal('rise')}><RichContent value={about.bio} /></motion.div>
                <a className="action" href={about.resumeUrl} target="_blank" rel="noreferrer">
                  Resume ↗
                </a>
              </div>
            )}
          </div>
          <div className="skills">
            {skills.map((skillGroup, index) => (
              <motion.div
                {...reveal('card', (index % 4) * 0.06)}
                className="skill-card"
                key={index}
              >
                <h3>{skillCategories[skillGroup.category] || skillGroup.category}</h3>
                <div className="chips">
                  {skillGroup.skills.map((skill, i) => (
                    <SkillLabel key={i} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
