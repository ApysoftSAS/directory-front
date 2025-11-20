const API_URL = import.meta.env.VITE_API_URL;

export async function allCountries() {
  try {
    const response = await fetch(`${API_URL}/countries`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Error al obtener los países.");
    }
const filtered = result
  .filter((country: any) => country.active === 1) // 🔹 aquí filtras los países activos
  .map((country: any) => ({
    ...country,
    cities: (country.cities || []).filter((city: any) => city.active === 1), // filtras ciudades activas
  }))
  .filter((country: any) => country.cities.length > 0);
    return filtered;
  } catch (error: any) {
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}