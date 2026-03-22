'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple token validation
    if (token.trim() === '') {
      setError('Token is required');
      setIsLoading(false);
      return;
    }

    // Save token to localStorage
    localStorage.setItem('adminToken', token);
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-zinc-400 mb-6">
            Enter your admin token to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Admin Token
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your admin token"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-900 border border-blue-700 rounded-lg">
            <p className="text-blue-200 text-sm">
              💡 <strong>Note:</strong> The admin token is stored in your{' '}
              <code className="bg-blue-800 px-2 py-1 rounded">.env.local</code>{' '}
              file under{' '}
              <code className="bg-blue-800 px-2 py-1 rounded">ADMIN_TOKEN</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
