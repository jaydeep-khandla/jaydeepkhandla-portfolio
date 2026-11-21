'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="admin-grid">
      <aside className="admin-sidebar">
        <div className="admin-brand"><Link href="/" aria-label="Public portfolio">&gt; jd.dev_</Link> <span>Admin</span></div>
        <nav aria-label="Administration">
          {['Dashboard','Experience','Projects','Skills','About','Messages'].map(label => {
            const href = '/admin/' + label.toLowerCase();
            return <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined}>{label}</Link>;
          })}
        </nav>
        <button className="admin-logout" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
