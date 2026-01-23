import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase com credenciais reais
const firebaseConfig = {
  apiKey: "AIzaSyBkgwtk9PdxNkGQ3fmIWZ8TAukxsKsxhg4",
  authDomain: "gilson-menezes-oftalmo.firebaseapp.com",
  projectId: "gilson-menezes-oftalmo",
  storageBucket: "gilson-menezes-oftalmo.firebasestorage.app",
  messagingSenderId: "392328339097",
  appId: "1:392328339097:web:f90c08cd3e9c8d38cc2208",
  measurementId: "G-JVHJH6LMT4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Auth
export const auth = getAuth(app);

export default app;
