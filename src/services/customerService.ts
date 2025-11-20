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

export async function registerCustomer(payload: SignupPayload) {
  // Transformamos las ciudades a solo IDs
  const payloadToSend = {
    ...payload,
    cities: payload.cities?.map(c => c.id) || []
  };
  const { data, iv } = encryptPayload(payloadToSend);
  const response = await fetch(`${import.meta.env.VITE_API_URL}/customer-registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ data, iv }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw {
      status: response.status,
      data: result,
    };
  }
  return result;
}


