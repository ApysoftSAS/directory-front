const API_URL = import.meta.env.VITE_API_URL;

export async function allCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener las categorías.");
    }

    // 🔹 VALIDAMOS QUE `data` exista y sea una lista
    const categories = Array.isArray(result.data) ? result.data : [];

    // 🔹 Filtrar solo categorías activas
    const filtered = categories.filter((category: any) => category.status === 1);

    return filtered;

  } catch (error: any) {
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}

export async function allCategoriesAndBusinesses() {
  try {
    const response = await fetch(`${API_URL}/categories-businesses`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener las categorías.");
    }

    return result;

  } catch (error: any) {
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}

export async function allCategoriesInteraction() {
  try {
    const response = await fetch(`${API_URL}/categories-interaction`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener las iteraciones de categorías.");
    }

    return result;

  } catch (error: any) {
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}
