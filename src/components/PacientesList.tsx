import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Loader2,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  obterTodasPreConsultas,
  PreConsultaData,
  atualizarStatusPreConsulta,
} from "@/lib/preConsultaService";
import { toast } from "sonner";

interface PacientesListProps {
  onSelectPaciente: (paciente: PreConsultaData) => void;
}

export default function PacientesList({ onSelectPaciente }: PacientesListProps) {
  const [pacientes, setPacientes] = useState<PreConsultaData[]>([]);
  const [filtrados, setFiltrados] = useState<PreConsultaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "todos" | "pendente" | "em_andamento" | "concluido"
  >("todos");

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      setIsLoading(true);
      const dados = await obterTodasPreConsultas();
      setPacientes(dados);
      setFiltrados(dados);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
      toast.error("Erro ao carregar lista de pacientes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let resultado = pacientes;

    // Filtrar por status
    if (filterStatus !== "todos") {
      resultado = resultado.filter((p) => p.status === filterStatus);
    }

    // Filtrar por busca
    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      resultado = resultado.filter(
        (p) =>
          p.nomeCompleto.toLowerCase().includes(termo) ||
          p.email.toLowerCase().includes(termo) ||
          p.whatsapp.includes(termo)
      );
    }

    setFiltrados(resultado);
  }, [searchTerm, filterStatus, pacientes]);

  const handleSelectPaciente = async (paciente: PreConsultaData) => {
    try {
      // Atualizar status para "em_andamento"
      if (paciente.id) {
        await atualizarStatusPreConsulta(paciente.id, "em_andamento");
        // Atualizar estado local
        setPacientes((prev) =>
          prev.map((p) =>
            p.id === paciente.id ? { ...p, status: "em_andamento" } : p
          )
        );
      }
      onSelectPaciente(paciente);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status do paciente");
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "pendente":
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Pendente
          </div>
        );
      case "em_andamento":
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
            <Loader2 className="w-3 h-3 animate-spin" />
            Em Andamento
          </div>
        );
      case "concluido":
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            Concluído
          </div>
        );
      default:
        return null;
    }
  };

  const formatarData = (dataString?: string) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-gray-600">Carregando pacientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-2">
            Buscar Paciente:
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Nome, email ou WhatsApp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value as
                  | "todos"
                  | "pendente"
                  | "em_andamento"
                  | "concluido"
              )
            }
            className="px-3 py-2 border rounded-lg bg-white"
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>

        <Button onClick={carregarPacientes} variant="outline">
          Atualizar
        </Button>
      </div>

      {/* Lista de Pacientes */}
      <div className="space-y-2">
        {filtrados.length === 0 ? (
          <Card className="p-8 text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">
              {searchTerm || filterStatus !== "todos"
                ? "Nenhum paciente encontrado com esses critérios"
                : "Nenhum paciente cadastrado ainda"}
            </p>
          </Card>
        ) : (
          filtrados.map((paciente) => (
            <Card
              key={paciente.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelectPaciente(paciente)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">
                      {paciente.nomeCompleto}
                    </h3>
                    {getStatusBadge(paciente.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Email:</span>
                      <p className="break-all">{paciente.email}</p>
                    </div>
                    <div>
                      <span className="font-semibold">WhatsApp:</span>
                      <p>{paciente.whatsapp}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Motivo:</span>
                      <p>{paciente.motivoVisita}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Data:</span>
                      <p>{formatarData(paciente.dataCriacao)}</p>
                    </div>
                  </div>

                  {paciente.queixasOuSintomas && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Queixas:</span>
                      <p className="line-clamp-2">
                        {paciente.queixasOuSintomas}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPaciente(paciente);
                  }}
                  className="gap-2 whitespace-nowrap"
                >
                  Abrir
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Estatísticas */}
      {pacientes.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t">
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {pacientes.length}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {pacientes.filter((p) => p.status === "pendente").length}
            </div>
            <div className="text-xs text-gray-600">Pendente</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {pacientes.filter((p) => p.status === "em_andamento").length}
            </div>
            <div className="text-xs text-gray-600">Em Andamento</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-green-600">
              {pacientes.filter((p) => p.status === "concluido").length}
            </div>
            <div className="text-xs text-gray-600">Concluído</div>
          </Card>
        </div>
      )}
    </div>
  );
}
