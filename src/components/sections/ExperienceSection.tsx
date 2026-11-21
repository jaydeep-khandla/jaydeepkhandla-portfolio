'use client';
import RichContent from '@/components/RichContent';
import { useReveal } from "../useReveal";
import { motion } from "framer-motion";

import React, { useState, useEffect } from 'react';
import { getExperience } from '@/app/libs/apiClient';

interface Experience {
  _id: string;
  role: string;
  organizationName: string;
  organizationWebsite: string;
  description: string;
  timeline: string;
  isCurrentRole: boolean;
  verificationDocUrl: string;
  verificationDocName: string;
}

export default function ExperienceSection() {
  const reveal = useReveal();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setIsLoading(true);
    setFailed(false);
    try {
      const data = await getExperience();
      setExperiences(data);
    } catch (error) {
      setFailed(true);
      console.error('Error loading experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="experience" className="section band">
      <motion.h2 {...reveal('heading')}>Experience</motion.h2>
      {isLoading ? (
        <p>Loading experience...</p>
      ) : failed ? (
        <p role="alert">Unable to load experience. <button type="button" className="text-link" onClick={fetchExperiences}>Retry</button></p>
      ) : experiences.length === 0 ? (
        <p>No experience entries yet.</p>
      ) : (
        <ol className="timeline">
          {experiences.map((exp, index) => (
            <motion.li {...reveal('rise', (index % 4) * 0.06)} key={exp._id}>
              <span className="dates">{exp.timeline}</span>
              <div className={exp.isCurrentRole ? 'job current' : 'job'}>
                <motion.i aria-hidden="true" className="timeline-dot" {...reveal('pop')} />
                <h3>
                  {exp.role}{' '}
                  <span>
                    ·{' '}
                    {exp.organizationWebsite ? (
                      <a href={exp.organizationWebsite} target="_blank" rel="noreferrer">
                        {exp.organizationName} ↗
                      </a>
                    ) : (
                      exp.organizationName
                    )}
                  </span>
                </h3>
                {exp.isCurrentRole && <span className="chip">Current</span>}
                <RichContent value={exp.description} />
                {exp.verificationDocUrl && (
                  <a
                    className="text-link"
                    href={exp.verificationDocUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📄 {exp.verificationDocName}
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}
