import { useState, useEffect } from "react";
import PasswordProtection from "@/components/PasswordProtection";
import MedicoDashboard from "@/components/MedicoDashboard";

const CORRECT_PASSWORD = "prontuariosecreto";

export default function Medico() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está autenticado (sessionStorage)
    const authenticated = sessionStorage.getItem("medico_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem("medico_authenticated", "true");
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <PasswordProtection
        onUnlock={handleUnlock}
        correctPassword={CORRECT_PASSWORD}
      />
    );
  }

  return <MedicoDashboard />;
}
