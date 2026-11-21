'use client';
import { useReveal } from "../useReveal";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { getProjects } from '@/app/libs/apiClient';


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
  const reveal = useReveal();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setFailed(false);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      setFailed(true);
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const leadIndex = Math.max(
    0,
    projects.findIndex((project) => project.featured),
  );
  const displayProjects = projects.length
    ? [projects[leadIndex], ...projects.filter((_, index) => index !== leadIndex)]
    : [];

  return (
    <section id="projects" className="section">
      <motion.h2 {...reveal('heading')}>Projects</motion.h2>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : failed ? (
        <p role="alert">Unable to load projects. <button type="button" className="text-link" onClick={fetchProjects}>Retry</button></p>
      ) : (
        <div className="project-grid">
          {displayProjects.map((project, index) => (
            <Card
              key={project._id || `project-${index}`}
              title={project.title}
              description={project.description}
              urlTitle={project.urlTitle}
              href={project.href}
              tech={project.tech}
              srcImg={project.imageUrl}
              imageAlt={project.imageAlt}
              featured={project.featured}
            />
          ))}
        </div>
      )}
    </section>
  );
}
