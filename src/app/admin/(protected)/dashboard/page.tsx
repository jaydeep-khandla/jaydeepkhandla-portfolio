'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  projects: number;
  skills: number;
  messages: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [projectsRes, skillsRes, messagesRes] = await Promise.all([
        fetch('/api/projects', { headers }),
        fetch('/api/skills', { headers }),
        fetch('/api/admin/messages', { headers }),
      ]);

      if (projectsRes.ok && skillsRes.ok && messagesRes.ok) {
        const projectsData = await projectsRes.json();
        const skillsData = await skillsRes.json();
        const messagesData = await messagesRes.json();

        setStats({
          projects: projectsData.data?.length || 0,
          skills: skillsData.data?.length || 0,
          messages: messagesData.data?.length || 0,
          unreadMessages:
            messagesData.data?.filter((m: any) => !m.isRead).length || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-400">Welcome to your portfolio admin panel</p>
      </div>

      {isLoading ? (
        <div className="text-white text-center py-12">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6">
            <div className="text-6xl mb-2">💼</div>
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Projects</h3>
            <div className="text-3xl font-bold text-white">
              {stats.projects}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6">
            <div className="text-6xl mb-2">🎯</div>
            <h3 className="text-zinc-400 text-sm font-medium mb-2">
              Skill Categories
            </h3>
            <div className="text-3xl font-bold text-white">{stats.skills}</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6">
            <div className="text-6xl mb-2">✉️</div>
            <h3 className="text-zinc-400 text-sm font-medium mb-2">
              Total Messages
            </h3>
            <div className="text-3xl font-bold text-white">
              {stats.messages}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6">
            <div className="text-6xl mb-2">🔔</div>
            <h3 className="text-zinc-400 text-sm font-medium mb-2">
              Unread Messages
            </h3>
            <div className="text-3xl font-bold text-white">
              {stats.unreadMessages}
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 bg-zinc-900 border border-zinc-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
        <div className="space-y-3 text-zinc-300">
          <p>
            ✅ <strong>MongoDB Connection:</strong> You&apos;ll need to set up
            your MongoDB Atlas connection string in the{' '}
            <code className="bg-zinc-800 px-2 py-1 rounded">.env.local</code>{' '}
            file
          </p>
          <p>
            ✅ <strong>Add Initial Data:</strong> Start by adding your About
            information and skills categories
          </p>
          <p>
            ✅ <strong>Create Projects:</strong> Add your projects with
            descriptions and links
          </p>
          <p>
            ✅ <strong>Monitor Messages:</strong> The contact form messages will
            appear here automatically
          </p>
        </div>
      </div>
    </div>
  );
}
