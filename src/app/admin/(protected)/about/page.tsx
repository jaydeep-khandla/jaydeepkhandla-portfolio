'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AboutForm {
  name: string;
  title: string;
  bio: string;
  profileImageUrl: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  email: string;
}

export default function AdminAboutPage() {
  const [form, setForm] = useState<AboutForm>({
    name: '',
    title: 'Full Stack Web Developer',
    bio: '',
    profileImageUrl: '',
    resumeUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/about', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        setIsNew(true);
      } else if (response.ok) {
        const data = await response.json();
        setForm(data.data);
        setIsNew(false);
      } else {
        setError('Failed to fetch about section');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');

      const url = '/api/admin/about';
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSuccess(
          isNew
            ? 'About section created successfully!'
            : 'About section updated successfully!',
        );
        setIsNew(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save about section');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-white text-center py-12">
        Loading about section...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">About Me</h1>

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
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Professional Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="e.g., Full Stack Web Developer"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Bio/About Text *
          </label>
          <p className="text-sm text-zinc-400 mb-2">
            💡 Tip: Newlines and formatting will be preserved. Use Enter to
            create line breaks.
          </p>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            required
            rows={8}
            spellCheck="true"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition font-mono text-sm"
            placeholder="Write about yourself here. You can use multiple lines&#10;and all formatting will be preserved&#10;on the display page."
          />
          <div className="mt-2 p-3 bg-zinc-900 rounded-lg border border-zinc-700">
            <p className="text-xs text-zinc-400 mb-2">Preview:</p>
            <p className="text-sm text-white whitespace-pre-wrap break-words">
              {form.bio || 'Your text will appear here...'}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Profile Image URL
          </label>
          <input
            type="url"
            name="profileImageUrl"
            value={form.profileImageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://example.com/profile.jpg"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Resume URL *
          </label>
          <input
            type="url"
            name="resumeUrl"
            value={form.resumeUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedinUrl"
            value={form.linkedinUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Instagram URL
          </label>
          <input
            type="url"
            name="instagramUrl"
            value={form.instagramUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://instagram.com/username"
          />
        </div>

        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {isSaving
              ? 'Saving...'
              : isNew
                ? 'Create About Section'
                : 'Update About Section'}
          </button>
        </div>
      </form>
    </div>
  );
}
