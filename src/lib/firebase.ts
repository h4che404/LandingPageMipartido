
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAnuQkJBmknz84jvqMgWNjGQo1BEASy4V4",
    authDomain: "mipartidolandingpage.firebaseapp.com",
    projectId: "mipartidolandingpage",
    storageBucket: "mipartidolandingpage.firebasestorage.app",
    messagingSenderId: "380503441492",
    appId: "1:380503441492:web:09ef79435d898f7aa56dc1",
    measurementId: "G-VZ10TMH14C"
};

// Initialize Firebase
// Check if apps already exist to avoid re-initialization in dev HMR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics is only supported in browser environments
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, analytics };
