import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const firebaseError = (err: Error) => {
  if (!err.message) return "Please Try Again"
  if (err.message === "Firebase: Error (auth/wrong-password)." || err.message === 'Firebase: Error (auth/user-not-found).') return "Mauvais mot de pass ou adresse email."
  if (err.message === "Firebase: Error (auth/invalid-email).") return "Veuillez entrez une adresse mail valide."
  if (err.message === "Firebase: Error (auth/email-already-in-use).") return "Cette adresse mail est déjà utilisé."
  return err.message
}