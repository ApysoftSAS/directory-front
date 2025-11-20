const API_URL = import.meta.env.VITE_API_URL;

export async function siteConfigs() {
  try {
    const response = await fetch(`${API_URL}/site-configs-active`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Error al obtener los países.");
    }
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}