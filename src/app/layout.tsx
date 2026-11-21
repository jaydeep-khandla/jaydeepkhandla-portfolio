import type { Metadata } from 'next';
import '@fontsource-variable/bricolage-grotesque/index.css';
import '@fontsource-variable/dm-sans/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import './globals.css';

export const metadata: Metadata = { title: 'Jaydeep Khandla | Full Stack Developer', description: 'Jaydeep Khandla | Full Stack Developer' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
