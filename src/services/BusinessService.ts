const API_URL = import.meta.env.VITE_API_URL;

// 1. Aceptar el objeto 'options' o directamente el 'signal' como último argumento
export async function allBusiness({
  page = 1,
  perPage = '',
  search = '',
  category = '',
  country = '',
  city = '',
}, signal = null /* 💡 Recibe el signal de AbortController */) {
  const params = new URLSearchParams();
  params.append('page', page);
  if (perPage) params.append('per_page', perPage);
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (country) params.append('country', country);
  if (city) params.append('city', city);

  // 2. Construir el objeto de configuración del fetch
  const fetchConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    // 💡 Asignar la señal de cancelación a la opción 'signal' del fetch
    signal: signal,
  };

  const response = await fetch(`${API_URL}/business/paginated?${params.toString()}`, fetchConfig);

  // Si la promesa de fetch se resuelve (no se aborta), procedemos:
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Error al obtener los negocios');
  return result;
}



