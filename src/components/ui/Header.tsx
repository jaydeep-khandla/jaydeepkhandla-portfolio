'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GithubLogo from '@/app/images/brand-github.svg';
import LinkedinLogo from '@/app/images/brand-linkedin.svg';
import DownloadLogo from '@/app/images/download.svg';
import { getAbout } from '@/app/libs/apiClient';

interface AboutData {
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

const headerVariants = (delay?: number) => {
  return {
    hidden: {
      translateY: -100,
      opacity: 0,
    },
    visible: {
      translateY: 1,
      opacity: 1,
      transition: {
        ease: 'linear',
        duration: 1.5,
        delay,
      },
    },
  };
};

export default function Header() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAbout();
        if (data) {
          setAbout(data);
        }
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Use loading state to show placeholder or just render when ready
  const resumeUrl = about?.resumeUrl || '#';
  const githubUrl = about?.githubUrl || '#';
  const linkedinUrl = about?.linkedinUrl || '#';

  return (
    <header className="absolute top-0 w-full h-fit px-8 py-3 flex justify-between items-center">
      <motion.button
        initial="hidden"
        animate="visible"
        variants={headerVariants(0.5)}
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center gap-2 px-2 py-1 font-fira bg-transparent border-2 border-white"
        disabled={isLoading}
      >
        <a href={resumeUrl} target="_blank">
          Resume
        </a>
        <Image src={DownloadLogo} alt="Download" width={20} height={20} />
      </motion.button>
      <div className="flex gap-4 w-fit">
        <motion.a
          href={githubUrl}
          target="_blank"
          initial="hidden"
          animate="visible"
          variants={headerVariants()}
        >
          <Image src={GithubLogo} alt="GitHub" width={30} height={30} />
        </motion.a>
        <motion.a
          href={linkedinUrl}
          target="_blank"
          initial="hidden"
          animate="visible"
          variants={headerVariants(0.3)}
        >
          <Image src={LinkedinLogo} alt="LinkedIn" width={30} height={30} />
        </motion.a>
      </div>
    </header>
  );
}
