// In a real application, you would use a proper encryption library
// This is a simplified example for demonstration purposes

// Use environment variables for the encryption key
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-secret-encryption-key"

export function encrypt(text: string): string {
  // In a real application, use a proper encryption algorithm
  // This is NOT secure and is only for demonstration
  const buffer = Buffer.from(text)
  return buffer.toString("base64")
}

export function decrypt(encryptedText: string): string {
  // In a real application, use a proper decryption algorithm
  // This is NOT secure and is only for demonstration
  const buffer = Buffer.from(encryptedText, "base64")
  return buffer.toString()
}

