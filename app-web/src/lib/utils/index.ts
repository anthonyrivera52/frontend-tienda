// src/lib/utils/index.ts
export async function getReadJSON(resource: string) {
  // Use a server-side environment variable or fallback for development
  const baseUrl = process.env.JSON_SERVER_URL || 'http://localhost:3000'; // Use 3000 for Next.js public folder
  const fileUrl = `${baseUrl}/data/${resource}`; // e.g., /data/users.json

  try {
    const response = await fetch(fileUrl, {
      cache: 'no-store', // Ensure fresh data for SSR
    });

    if (!response.ok) {
      throw new Error(`Error al leer el recurso JSON: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching JSON from ${fileUrl}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}