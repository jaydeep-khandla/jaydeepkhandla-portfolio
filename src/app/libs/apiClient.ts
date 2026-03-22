// API endpoints
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export async function getProjects() {
  try {
    const response = await fetch(`${API_BASE}/api/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getSkills() {
  try {
    const response = await fetch(`${API_BASE}/api/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function getAbout() {
  try {
    const response = await fetch(`${API_BASE}/api/about`);
    if (!response.ok) throw new Error('Failed to fetch about section');
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
}
