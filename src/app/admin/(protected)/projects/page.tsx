'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  order: number;
  featured: boolean;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        setError('Failed to delete project');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
          <p className="text-zinc-400">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition"
        >
          + Add Project
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-white text-center py-12">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-8 text-center">
          <p className="text-zinc-400 mb-4">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="inline-block px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition"
          >
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-500">
                  {project.featured && '⭐ Featured • '}
                  Order: {project.order}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Link
                  href={`/admin/projects/${project._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
