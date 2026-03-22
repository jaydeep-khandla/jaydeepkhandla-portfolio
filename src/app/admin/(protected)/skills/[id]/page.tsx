'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface SkillForm {
  category: 'frontend' | 'backend' | 'ui' | 'tools';
  skills: string;
  order: number;
}

export default function AdminSkillFormPage() {
  const [form, setForm] = useState<SkillForm>({
    category: 'frontend',
    skills: '',
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
      fetchSkill();
    }
  }, [isEdit, params?.id]);

  const fetchSkill = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/skills/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setForm({
          ...data.data,
          skills: data.data.skills.join(', '),
        });
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'order' ? parseInt(value) : value,
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
        skills: form.skills.split(',').map((s) => s.trim()),
      };

      const url = isEdit
        ? `/api/admin/skills/${params?.id}`
        : '/api/admin/skills';
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
            ? 'Skill updated successfully!'
            : 'Skill created successfully!',
        );
        setTimeout(() => router.push('/admin/skills'), 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save skill');
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
        {isEdit ? 'Edit Skill Category' : 'Create New Skill Category'}
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
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition"
          >
            <option value="frontend">Frontend Tools</option>
            <option value="backend">Backend Tools & Databases</option>
            <option value="ui">UI Libraries</option>
            <option value="tools">Tools & Technologies</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Skills (comma-separated) *
          </label>
          <textarea
            name="skills"
            value={form.skills}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="React.js, Next.js, Vue.js"
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
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition"
          />
        </div>

        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : isEdit ? 'Update Skill' : 'Create Skill'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/skills')}
            className="px-6 py-3 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
