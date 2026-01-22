import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
// IMPORTANTE: Estas são credenciais públicas (apenas para leitura/escrita controlada)
// As regras de segurança do Firestore controlam o acesso real
const firebaseConfig = {
  apiKey: "AIzaSyDxK9q8vZ2mN3pL4oR5sT6uV7wX8yZ9aB0",
  authDomain: "gilson-menezes-oftalmo.firebaseapp.com",
  projectId: "gilson-menezes-oftalmo",
  storageBucket: "gilson-menezes-oftalmo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Auth
export const auth = getAuth(app);

export default app;
