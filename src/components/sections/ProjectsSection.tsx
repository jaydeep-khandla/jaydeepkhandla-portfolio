'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fadeIn, scaleUp } from '@/utils/variants';
import { motion } from 'framer-motion';
const Card = dynamic(() => import('@/components/Card'), { ssr: false });
import { getProjects } from '@/app/libs/apiClient';

let scale: number[] = [0.2, 0.4, 0.6, 0.2, 0.4];

interface Project {
  _id: string;
  title: string;
  description: string;
  urlTitle: string;
  href: string;
  tech: string[];
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="projects" className="h-fit py-10 px-8 lg:px-16">
        <div className="text-center text-zinc-400">Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="h-fit py-10 px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-0 m-auto w-fit h-full">
        {projects.map((project, index) => (
          <motion.div
            key={project._id || `project-${index}`}
            initial="hidden"
            whileInView={'visible'}
            variants={scaleUp(scale[index % scale.length])}
            viewport={{ once: false, amount: 0.1 }}
          >
            <Card
              title={project.title}
              description={project.description}
              urlTitle={project.urlTitle}
              href={project.href}
              tech={project.tech}
              srcImg={project.imageUrl}
              imageAlt={project.imageAlt}
              featured={project.featured}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
