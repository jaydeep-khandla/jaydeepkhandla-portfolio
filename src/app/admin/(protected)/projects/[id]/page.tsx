'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface ProjectForm {
  title: string;
  description: string;
  urlTitle: string;
  href: string;
  tech: string;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  order: number;
}

export default function AdminProjectFormPage() {
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    urlTitle: '',
    href: '',
    tech: '',
    imageUrl: '',
    imageAlt: 'Project image',
    featured: false,
    order: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== 'new';

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [isEdit, params?.id]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/projects/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setForm({
          ...data.data,
          tech: data.data.tech.join(', '),
        });
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        ...form,
        tech: form.tech.split(',').map((t) => t.trim()),
        order: parseInt(String(form.order)),
      };

      const url = isEdit
        ? `/api/admin/projects/${params?.id}`
        : '/api/admin/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(
          isEdit
            ? 'Project updated successfully!'
            : 'Project created successfully!',
        );
        setTimeout(() => router.push('/admin/projects'), 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save project');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">
        {isEdit ? 'Edit Project' : 'Create New Project'}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-900 border border-green-700 rounded-lg text-green-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="Enter project description"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            URL Title *
          </label>
          <input
            type="text"
            name="urlTitle"
            value={form.urlTitle}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="e.g., 🔗Demo/AlgoVis"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Project Link (URL) *
          </label>
          <input
            type="url"
            name="href"
            value={form.href}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Technologies (comma-separated) *
          </label>
          <input
            type="text"
            name="tech"
            value={form.tech}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="React.js, Node.js, MongoDB"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Image Alt Text
          </label>
          <input
            type="text"
            name="imageAlt"
            value={form.imageAlt}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="Project image"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Display Order
          </label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={form.featured}
            onChange={handleChange}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="featured" className="text-white cursor-pointer">
            Mark as Featured
          </label>
        </div>

        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {isLoading
              ? 'Saving...'
              : isEdit
                ? 'Update Project'
                : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="px-6 py-3 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
