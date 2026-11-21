'use client';
import React, { useState, useEffect } from 'react';
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

  return (
    <div className="identity-links" aria-busy={isLoading}>
      {about?.resumeUrl && (
        <a href={about.resumeUrl} target="_blank" rel="noreferrer">
          Resume <Image src={DownloadLogo} alt="" width={14} height={14} />
        </a>
      )}
      {about?.githubUrl && (
        <a href={about.githubUrl} target="_blank" rel="noreferrer">
          <Image src={GithubLogo} alt="GitHub" width={22} height={22} />
        </a>
      )}
      {about?.linkedinUrl && (
        <a href={about.linkedinUrl} target="_blank" rel="noreferrer">
          <Image src={LinkedinLogo} alt="LinkedIn" width={22} height={22} />
        </a>
      )}
    </div>
  );
}
