import { encryptPayload } from '../utils/encryptPayload';

// src/services/customerService.ts
export type City = { id: string; name: string };
export type SignupPayload = {
  name: string;
  email: string;
  phone: string;
  acceptedTerms: boolean;
  country: string;
  cities: City[];
};



export async function registerBusiness(payload: SignupPayload) {
    const { data, iv } = encryptPayload(payload);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/preregister-businesses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
      body: JSON.stringify({ data, iv }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Error al registrarse');

  return result;
}


