export const sendContactForm = async (data: Record<string, string>) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to send message');
  return await response.json();
};
