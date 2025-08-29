import { UserSession } from "@/types/auth.types";


const JWT_SECRET = "p0fKqk9ksPXMAAQIzTzHpsmq5uvQs5gF40o5rMrZews=";
const ENCODED_SECRET = new TextEncoder().encode(JWT_SECRET);

/**
 * Sets an encrypted session cookie
 */
// export async function getEncryptedSession(session: UserSession): Promise<string> {
//   return await encryptSession(session);
// }

/**
 * Encrypts the session manually using AES-GCM
 */
export async function encryptSession(session: UserSession): Promise<string> {
  const sessionJson = JSON.stringify(session);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
  const key = await deriveEncryptionKey(ENCODED_SECRET);

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    new TextEncoder().encode(sessionJson)
  );

  // Concatenate IV + Encrypted Data
  const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedBuffer), iv.length);

  // Base64 encode
  return bufferToBase64(combined);
}

export async function decryptSession(encrypted: string): Promise<UserSession> {
  const combinedBuffer = base64ToBuffer(encrypted);

  // Separate IV and Encrypted Data
  const iv = combinedBuffer.slice(0, 12); // First 12 bytes
  const encryptedData = combinedBuffer.slice(12); // Rest

  const key = await deriveEncryptionKey(ENCODED_SECRET);

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encryptedData
  );

  const sessionJson = new TextDecoder().decode(decryptedBuffer);
  return JSON.parse(sessionJson);
}

/**
 * Derives an AES-GCM Key
 */
async function deriveEncryptionKey(secret: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    await crypto.subtle.digest("SHA-256", secret),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
  return keyMaterial;
}

/**
 * Utility to convert buffer to Base64 string
 */
function bufferToBase64(buffer: Uint8Array): string {
  // In server-side Next.js, Buffer is available
  return Buffer.from(buffer).toString("base64");
}

function base64ToBuffer(base64: string): Uint8Array {
  return new Uint8Array(Buffer.from(base64, "base64"));
}
