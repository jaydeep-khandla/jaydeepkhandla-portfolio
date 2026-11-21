const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

async function readSection(section: string, optional = false) {
  const response = await fetch(`${API_BASE}/api/${section}`, { cache: 'no-store' });
  if (optional && response.status === 404) return null;
  if (!response.ok) throw new Error(`Unable to load ${section}.`);
  const result = await response.json();
  if (!result.success) throw new Error(`Unable to load ${section}.`);
  return result.data;
}

export const getProjects = () => readSection('projects');
export const getSkills = () => readSection('skills');
export const getExperience = () => readSection('experience');
export const getAbout = () => readSection('about', true);
