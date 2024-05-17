export const sendContactForm = async (data: Record<string, string>) => {
  fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if(!response.ok) throw new Error("Failed to send message");
    return response.json();
  })
}