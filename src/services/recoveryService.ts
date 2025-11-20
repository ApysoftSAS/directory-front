import { encryptPayload } from "../utils/encryptPayload";

const API_URL = import.meta.env.VITE_API_URL;

export const forgotPassword = async (email: string) => {
  const payload = { email };
  const { data, iv } = encryptPayload(payload);
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ data, iv }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "Error al enviar el correo");
  }

  return result;
};

export const resetPassword = async (
  email: string,
  token: string,
  password: string,
  passwordConfirm: string
): Promise<any> => {
  try {
    const payload = { email, token, password, password_confirmation: passwordConfirm };
    const { data, iv } = encryptPayload(payload);

    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data, iv }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.details || "Error al restablecer la contraseña.");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Error de conexión con el servidor.");
  }
};

export async function validateResetToken(email: string, token: string) {
  const payload = { email, token };
  const { data, iv } = encryptPayload(payload);
  try {
    const response = await fetch(`${API_URL}/validate-reset-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, iv }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al validar el token.");
    }

    // Tu API devuelve { valid: true } o { valid: false }
    if (!result.valid) {
      throw new Error("El enlace de recuperación no es válido o ha expirado.");
    }

    return result; // Devuelve { valid: true }
  } catch (error: any) {
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}