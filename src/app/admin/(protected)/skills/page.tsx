'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Skill {
  _id: string;
  category: string;
  skills: string[];
  order: number;
  createdAt: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/skills', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }

      const data = await response.json();
      setSkills(data.data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill category?'))
      return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSkills(skills.filter((s) => s._id !== id));
      } else {
        setError('Failed to delete skill');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const categoryEmoji: Record<string, string> = {
    frontend: '🎨',
    backend: '⚙️',
    ui: '🖼️',
    tools: '🛠️',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Skills</h1>
          <p className="text-zinc-400">Manage your technical skills</p>
        </div>
        <Link
          href="/admin/skills/new"
          className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition"
        >
          + Add Skill Category
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-white text-center py-12">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-8 text-center">
          <p className="text-zinc-400 mb-4">No skill categories yet</p>
          <Link
            href="/admin/skills/new"
            className="inline-block px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition"
          >
            Create Your First Skill Category
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-zinc-900 border border-zinc-700 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl mb-2">
                    {categoryEmoji[skill.category] || '📌'}
                  </h3>
                  <h2 className="text-xl font-bold text-white capitalize">
                    {skill.category}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Order: {skill.order}
                  </p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-zinc-800 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {skill.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white text-black text-sm rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/skills/${skill._id}`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
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
