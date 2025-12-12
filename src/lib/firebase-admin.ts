import "server-only"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// NOTE: In production (Vercel), we should use environment variables.
// For the service account, we can either use the standard GOOGLE_APPLICATION_CREDENTIALS path
// or parse a JSON string from an env var if path isn't feasible (common in Vercel).

// Mock/Lazy intialization if env vars are missing to prevent build crashes
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : null

if (!getApps().length && serviceAccount) {
    initializeApp({
        credential: cert(serviceAccount),
    })
}

// Export a getter to ensure we throw specific errors at runtime if config is missing
export const getDb = () => {
    if (!getApps().length) {
        // Fallback for local dev without keys: likely throw or return null to handle gracefully
        if (process.env.NODE_ENV === "development") {
            console.warn("Firebase Admin not initialized. Missing FIREBASE_SERVICE_ACCOUNT_KEY.")
            // We might return a mock DB or throw.
        }
        throw new Error("Firebase Admin not initialized")
    }
    return getFirestore()
}
