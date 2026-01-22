import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface PasswordProtectionProps {
  onUnlock: () => void;
  correctPassword: string;
}

export default function PasswordProtection({
  onUnlock,
  correctPassword,
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simular pequeno delay para melhor UX
    setTimeout(() => {
      if (password === correctPassword) {
        onUnlock();
      } else {
        setError("Senha incorreta. Tente novamente.");
        setPassword("");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Dashboard Médico
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Acesso restrito. Digite a senha para continuar.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isLoading ? "Verificando..." : "Acessar"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Ferramenta de uso exclusivo para profissionais autorizados.
        </p>
      </div>
    </div>
  );
}
