import { jwtDecode } from 'jwt-decode';
import { encryptPayload } from '../utils/encryptPayload';
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Importante:
 * Tu JWT contiene muchos más campos que debes tipar, incluyendo:
 * - roles: string[]
 * - scopes: string[]
 * - iss, sub, exp, iat, etc.
 */
export interface JWTPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;

  prv: string;

  user_id: string;
  name: string;
  email: string;
  roles: string[];

  // << ESTE ES EL CAMPO QUE NECESITAS >>
  scopes: string[];
}

const API_URL = import.meta.env.VITE_API_URL;

export async function loginRequest(email: string, password: string) {
      const payload = { email,  password};
    const { data, iv } = encryptPayload(payload);

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({ data, iv }),
  });

    const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || 'Error en el inicio de sesión');
  }

  return result as LoginResponse;
}

export function decodeToken(token: string): JWTPayload {
  return jwtDecode<JWTPayload>(token);
}
