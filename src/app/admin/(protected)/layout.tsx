'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (!savedToken) {
      router.push('/admin/login');
    } else {
      setToken(savedToken);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-700 p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-white rounded-lg"></div>
          <h1 className="text-white text-xl font-bold">Portfolio Admin</h1>
        </div>

        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/experience"
            className="block px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            💼 Experience
          </Link>
          <Link
            href="/admin/projects"
            className="block px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            🚀 Projects
          </Link>
          <Link
            href="/admin/skills"
            className="block px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            🎯 Skills
          </Link>
          <Link
            href="/admin/about"
            className="block px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            ℹ️ About Me
          </Link>
          <Link
            href="/admin/messages"
            className="block px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            ✉️ Messages
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6">
          <button
            onClick={handleLogout}
            className="w-52 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
