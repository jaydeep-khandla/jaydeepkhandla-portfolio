'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ExperienceForm {
  role: string;
  organizationName: string;
  organizationWebsite: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  timeline: string;
  verificationDocUrl: string;
  verificationDocName: string;
  order: number;
}

interface ExperienceListItem extends ExperienceForm {
  _id: string;
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceListItem[]>([]);
  const [form, setForm] = useState<ExperienceForm>({
    role: '',
    organizationName: '',
    organizationWebsite: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrentRole: false,
    timeline: '',
    verificationDocUrl: '',
    verificationDocName: 'Verification Document',
    order: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/experience', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExperiences(data.data);
      } else {
        setError('Failed to fetch experiences');
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
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const calculateTimeline = (
    startDate: string,
    endDate: string,
    isCurrent: boolean,
  ) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const startStr = start.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    if (isCurrent) {
      return `${startStr} - Present`;
    }

    if (endDate) {
      const end = new Date(endDate);
      const endStr = end.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      return `${startStr} - ${endStr}`;
    }

    return startStr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');

      const timeline = calculateTimeline(
        form.startDate,
        form.endDate,
        form.isCurrentRole,
      );

      const payload = {
        ...form,
        timeline,
        startDate: new Date(form.startDate),
        endDate: form.endDate ? new Date(form.endDate) : null,
      };

      const url = editingId
        ? `/api/admin/experience/${editingId}`
        : '/api/admin/experience';
      const method = editingId ? 'PUT' : 'POST';

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
          editingId
            ? 'Experience updated successfully!'
            : 'Experience created successfully!',
        );
        setForm({
          role: '',
          organizationName: '',
          organizationWebsite: '',
          description: '',
          startDate: '',
          endDate: '',
          isCurrentRole: false,
          timeline: '',
          verificationDocUrl: '',
          verificationDocName: 'Verification Document',
          order: experiences.length,
        });
        setEditingId(null);
        setTimeout(() => setSuccess(''), 3000);
        fetchExperiences();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save experience');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (experience: ExperienceListItem) => {
    setForm({
      role: experience.role,
      organizationName: experience.organizationName,
      organizationWebsite: experience.organizationWebsite,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrentRole: experience.isCurrentRole,
      timeline: experience.timeline,
      verificationDocUrl: experience.verificationDocUrl,
      verificationDocName: experience.verificationDocName,
      order: experience.order,
    });
    setEditingId(experience._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/experience/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccess('Experience deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
        fetchExperiences();
      } else {
        setError('Failed to delete experience');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      role: '',
      organizationName: '',
      organizationWebsite: '',
      description: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      timeline: '',
      verificationDocUrl: '',
      verificationDocName: 'Verification Document',
      order: 0,
    });
    setError('');
  };

  if (isLoading) {
    return (
      <div className="text-white text-center py-12">Loading experiences...</div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Manage Experiences</h1>

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

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6 mb-12 bg-zinc-900 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white">
          {editingId ? 'Edit Experience' : 'Add New Experience'}
        </h2>

        <div>
          <label className="block text-white font-medium mb-2">
            Role/Position *
          </label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="e.g., Senior Developer"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Organization Name *
          </label>
          <input
            type="text"
            name="organizationName"
            value={form.organizationName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="e.g., Tech Company Inc."
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Organization Website
          </label>
          <input
            type="url"
            name="organizationWebsite"
            value={form.organizationWebsite}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://example.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Start Date *
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              disabled={form.isCurrentRole}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCurrentRole"
            name="isCurrentRole"
            checked={form.isCurrentRole}
            onChange={handleChange}
            className="w-4 h-4 bg-zinc-800 border border-zinc-700 rounded cursor-pointer"
          />
          <label
            htmlFor="isCurrentRole"
            className="ml-2 text-white font-medium cursor-pointer"
          >
            This is my current role
          </label>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Description *
          </label>
          <p className="text-sm text-zinc-400 mb-2">
            💡 Tip: Newlines and formatting will be preserved.
          </p>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition font-mono text-sm"
            placeholder="Describe your responsibilities and achievements..."
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Verification Document URL
          </label>
          <input
            type="url"
            name="verificationDocUrl"
            value={form.verificationDocUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="https://drive.google.com/... or https://example.com/certificate.pdf"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Verification Document Name
          </label>
          <input
            type="text"
            name="verificationDocName"
            value={form.verificationDocName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
            placeholder="e.g., Certificate of Completion"
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            {isSaving
              ? 'Saving...'
              : editingId
                ? 'Update Experience'
                : 'Add Experience'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-zinc-700 text-white font-medium rounded-lg hover:bg-zinc-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">All Experiences</h2>
        {experiences.length === 0 ? (
          <p className="text-zinc-400">No experiences added yet.</p>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-zinc-900 p-6 rounded-lg border border-zinc-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-blue-400">{exp.organizationName}</p>
                  </div>
                  {exp.isCurrentRole && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-2">{exp.timeline}</p>
                <p className="text-white mb-4 line-clamp-2">
                  {exp.description}
                </p>
                {exp.verificationDocUrl && (
                  <p className="text-sm text-gray-400 mb-4">
                    📄 {exp.verificationDocName}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
