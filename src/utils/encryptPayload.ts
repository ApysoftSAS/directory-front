import CryptoJS from "crypto-js";

const VITE_KEY = import.meta.env.VITE_KEY as string;

/**
 * 🔐 Encripta un payload usando AES-CBC con padding PKCS7.
 * Retorna un objeto con `data` (texto cifrado Base64) y `iv` (IV Base64).
 */
export const encryptPayload = (payload: any) => {
  // Crear IV aleatorio de 16 bytes
  const iv = CryptoJS.lib.WordArray.random(16);

  // Encriptar
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    CryptoJS.enc.Utf8.parse(VITE_KEY),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return {
    data: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: iv.toString(CryptoJS.enc.Base64),
  };
};
