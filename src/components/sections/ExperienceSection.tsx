'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scaleUp, fadeIn } from '@/utils/variants';
import LinkIcon from '@/app/images/link.svg';
import Image from 'next/image';
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
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await getExperience();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section
        id="experience"
        className="h-fit w-full flex px-8 py-10 my-10 flex-col gap-5 lg:px-16 xl:px-40"
      >
        <div className="text-zinc-400">Loading experience...</div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      className="h-fit w-full flex px-8 py-10 my-10 flex-col gap-5 lg:px-16 xl:px-40"
    >
      <motion.h2
        initial="hidden"
        whileInView={'visible'}
        variants={scaleUp()}
        viewport={{ once: false, amount: 0.1 }}
        className="text-left text-5xl font-anton lg:text-6xl"
      >
        Experience
      </motion.h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp._id}
            initial="hidden"
            whileInView={'visible'}
            variants={fadeIn('left', 0.1)}
            viewport={{ once: false, amount: 0.1 }}
            className="border-l-4 border-white pl-6 py-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {exp.organizationWebsite ? (
                    <a
                      href={exp.organizationWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                    >
                      {exp.organizationName}
                      <Image
                        src={LinkIcon}
                        alt="External link"
                        width={16}
                        height={16}
                      />
                    </a>
                  ) : (
                    <p className="text-lg text-gray-300">
                      {exp.organizationName}
                    </p>
                  )}
                </div>
              </div>
              {exp.isCurrentRole && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Current
                </span>
              )}
            </div>

            <p className="text-sm text-gray-400 mb-4">{exp.timeline}</p>

            <p className="text-white whitespace-pre-wrap break-words mb-4">
              {exp.description}
            </p>

            {exp.verificationDocUrl && (
              <motion.a
                href={exp.verificationDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm border border-white rounded hover:bg-white hover:text-black transition"
              >
                📄 {exp.verificationDocName}
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
