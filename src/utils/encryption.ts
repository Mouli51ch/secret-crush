import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.ENCRYPTION_KEY || "default_secret_key"

export const encryptMessage = (message: string): string => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString()
}

export const decryptMessage = (encryptedMessage: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

