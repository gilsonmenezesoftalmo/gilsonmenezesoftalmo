import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, ChevronLeft, AlertCircle } from "lucide-react";
import PasswordProtection from "@/components/PasswordProtection";
import PacientesList from "@/components/PacientesList";
import MedicoDashboard from "@/components/MedicoDashboard";
import { PreConsultaData } from "@/lib/preConsultaService";
import {
  authenticateMedico,
  isMedicoAuthenticated,
  logoutMedico,
  getMedicoCRM,
} from "@/lib/authService";

const CORRECT_PASSWORD = "prontuariosecreto";

type ViewType = "login" | "lista" | "dashboard";

export default function MedicoComDados() {
  const [view, setView] = useState<ViewType>("login");
  const [isLoading, setIsLoading] = useState(true);
  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<PreConsultaData | null>(null);

  useEffect(() => {
    // Verificar se já está autenticado
    if (isMedicoAuthenticated()) {
      setView("lista");
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (crm: string, password: string) => {
    const result = authenticateMedico({ crm, password });
    if (result.success) {
      setView("lista");
    } else {
      alert(result.message);
    }
  };

  const handleSelectPaciente = (paciente: PreConsultaData) => {
    setPacienteSelecionado(paciente);
    setView("dashboard");
  };

  const handleVoltar = () => {
    setPacienteSelecionado(null);
    setView("lista");
  };

  const handleLogout = () => {
    logoutMedico();
    setView("login");
    setPacienteSelecionado(null);
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

  if (view === "login") {
    return <LoginView onLogin={handleLogin} />;
  }

  if (view === "lista") {
    return (
      <ListaView
        onSelectPaciente={handleSelectPaciente}
        onLogout={handleLogout}
      />
    );
  }

  if (view === "dashboard") {
    return (
      <DashboardView
        paciente={pacienteSelecionado}
        onVoltar={handleVoltar}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

// ============ LOGIN VIEW ============
function LoginView({
  onLogin,
}: {
  onLogin: (crm: string, password: string) => void;
}) {
  const [crm, setCrm] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular pequeno delay
    setTimeout(() => {
      onLogin(crm, password);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👨‍⚕️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Área Médica Restrita
          </h1>
          <p className="text-gray-600 mt-2">
            Acesso para profissionais autorizados
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">CRM:</label>
            <input
              type="text"
              placeholder="Digite seu CRM"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Senha:</label>
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !crm || !password}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? "Verificando..." : "Acessar"}
          </Button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            <strong>Teste:</strong> CRM: 84896 | Senha: prontuariosecreto
          </p>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Ferramenta de uso exclusivo para profissionais autorizados.
        </p>
      </div>
    </div>
  );
}

// ============ LISTA VIEW ============
function ListaView({
  onSelectPaciente,
  onLogout,
}: {
  onSelectPaciente: (paciente: PreConsultaData) => void;
  onLogout: () => void;
}) {
  const crm = getMedicoCRM();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Pacientes
            </h1>
            <p className="text-gray-600 mt-1">
              CRM: {crm} | Gerenciar pré-consultas
            </p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Lista de Pacientes */}
        <Card className="p-6">
          <PacientesList onSelectPaciente={onSelectPaciente} />
        </Card>
      </div>
    </div>
  );
}

// ============ DASHBOARD VIEW ============
function DashboardView({
  paciente,
  onVoltar,
  onLogout,
}: {
  paciente: PreConsultaData | null;
  onVoltar: () => void;
  onLogout: () => void;
}) {
  if (!paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">Nenhum paciente selecionado</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={onVoltar}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {paciente.nomeCompleto}
              </h1>
              <p className="text-gray-600 text-sm">
                {paciente.email} | {paciente.whatsapp}
              </p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Info do Paciente */}
        <Card className="p-6 mb-6 bg-white">
          <h2 className="text-lg font-bold mb-4 text-blue-600">
            Dados da Pré-Consulta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-600">Data de Nascimento:</span>
              <p>{paciente.dataNascimento}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Motivo da Consulta:</span>
              <p>{paciente.motivoVisita}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Já é Paciente:</span>
              <p>{paciente.jaEhPaciente ? "Sim" : "Não"}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Diabetes:</span>
              <p>{paciente.temDiabetes ? "Sim" : "Não"}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Hipertensão:</span>
              <p>{paciente.temHipertensao ? "Sim" : "Não"}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Alergias:</span>
              <p>{paciente.alergias || "Nenhuma"}</p>
            </div>
          </div>

          {paciente.queixasOuSintomas && (
            <div className="mt-4 pt-4 border-t">
              <span className="font-semibold text-gray-600">Queixas/Sintomas:</span>
              <p className="mt-1">{paciente.queixasOuSintomas}</p>
            </div>
          )}

          {paciente.medicamentosEmUso && (
            <div className="mt-4 pt-4 border-t">
              <span className="font-semibold text-gray-600">Medicamentos em Uso:</span>
              <p className="mt-1">{paciente.medicamentosEmUso}</p>
            </div>
          )}
        </Card>

        {/* Dashboard Médico */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-blue-600">
            Completar Anamnese
          </h2>
          <MedicoDashboard />
        </div>
      </div>
    </div>
  );
}
