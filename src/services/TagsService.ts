const API_URL = import.meta.env.VITE_API_URL;



export async function allTags() {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Error al obtener los tags.");
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}

export const tagBussines = async (tags: string) => {
  const response = await fetch(`${API_URL}/businesses/tags/${tags}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "Error al obtener los negocios por tags");
  }
  return result;
};