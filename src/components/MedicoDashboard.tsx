import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

type TabType = "glaucoma" | "receita" | "laudos" | "urgencia";

interface GlaucomaState {
  motivo: string;
  cornea: string;
  lens: string;
  pioOd: number;
  pioOe: number;
  edOd: string;
  edOe: string;
  hora: string;
}

interface ReceitaState {
  rxOdEsf: number;
  rxOdCyl: number;
  rxOdEixo: number;
  rxOeEsf: number;
  rxOeCyl: number;
  rxOeEixo: number;
  rxAdd: number;
  lensType: string;
}

interface LaudosState {
  octConfiabilidade: string;
  octDefects: string[];
  cvConfiabilidade: string;
  cvDefects: string[];
}

interface UrgenciaState {
  queixa: string;
  achados: string[];
  conduta: string;
}

export default function MedicoDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("glaucoma");
  const [outputText, setOutputText] = useState("");

  // Glaucoma State
  const [glaucoma, setGlaucoma] = useState<GlaucomaState>({
    motivo: "Rotina",
    cornea: "Transparente",
    lens: "Transparente",
    pioOd: 14,
    pioOe: 14,
    edOd: "0.3",
    edOe: "0.3",
    hora: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  // Receita State
  const [receita, setReceita] = useState<ReceitaState>({
    rxOdEsf: 0,
    rxOdCyl: 0,
    rxOdEixo: 180,
    rxOeEsf: 0,
    rxOeCyl: 0,
    rxOeEixo: 180,
    rxAdd: 2.0,
    lensType: "Multifocal",
  });

  // Laudos State
  const [laudos, setLaudos] = useState<LaudosState>({
    octConfiabilidade: "Excelente",
    octDefects: [],
    cvConfiabilidade: "Excelente",
    cvDefects: [],
  });

  // Urgencia State
  const [urgencia, setUrgencia] = useState<UrgenciaState>({
    queixa: "",
    achados: [],
    conduta: "",
  });

  // Funções auxiliares
  const toggleTag = (container: string, value: string) => {
    if (container === "glaucoma-motivo") {
      setGlaucoma({ ...glaucoma, motivo: value });
      updateGlaucomaText({ ...glaucoma, motivo: value });
    } else if (container === "glaucoma-cornea") {
      setGlaucoma({ ...glaucoma, cornea: value });
      updateGlaucomaText({ ...glaucoma, cornea: value });
    } else if (container === "glaucoma-lens") {
      setGlaucoma({ ...glaucoma, lens: value });
      updateGlaucomaText({ ...glaucoma, lens: value });
    }
  };

  const updateGlaucomaText = (state: GlaucomaState) => {
    const text = `# DEPARTAMENTO DE GLAUCOMA

**QP:** ${state.motivo === "Rotina" ? "Consulta de rotina" : state.motivo === "Suspeita Glaucoma" ? "Encaminhado por suspeita de glaucoma" : "Avaliação pré-operatória de catarata"}.

**BIO AO:**
- Córnea: ${state.cornea}
- Cristalino: ${state.lens}

**PIO:** ${state.pioOd}/${state.pioOe} mmHg às ${state.hora}

**FO:**
- OD: E/D ${state.edOd}
- OE: E/D ${state.edOe}

**CD:** Solicitar CVC e OCT. Manter seguimento.`;
    setOutputText(text);
  };

  const updateReceitaText = (state: ReceitaState) => {
    const text = `# PRESCRIÇÃO DE ÓCULOS

**OD:** ${state.rxOdEsf >= 0 ? "+" : ""}${state.rxOdEsf.toFixed(2)} ${state.rxOdCyl <= 0 ? "" : "+"}${state.rxOdCyl.toFixed(2)} x ${state.rxOdEixo}°
**OE:** ${state.rxOeEsf >= 0 ? "+" : ""}${state.rxOeEsf.toFixed(2)} ${state.rxOeCyl <= 0 ? "" : "+"}${state.rxOeCyl.toFixed(2)} x ${state.rxOeEixo}°
**ADIÇÃO:** ${state.rxAdd.toFixed(2)}

**Tipo de Lente:** ${state.lensType}

---
*Prescrição válida por 12 meses*`;
    setOutputText(text);
  };

  const updateLaudosText = (state: LaudosState) => {
    const text = `# LAUDOS DE EXAMES

## OCT (Tomografia de Coerência Óptica)
**Confiabilidade:** ${state.octConfiabilidade}
**Achados:** ${state.octDefects.length > 0 ? state.octDefects.join(", ") : "Sem alterações significativas"}

## CAMPO VISUAL
**Confiabilidade:** ${state.cvConfiabilidade}
**Achados:** ${state.cvDefects.length > 0 ? state.cvDefects.join(", ") : "Sem alterações significativas"}

---
*Laudos complementares para diagnóstico de glaucoma*`;
    setOutputText(text);
  };

  const updateUrgenciaText = (state: UrgenciaState) => {
    const text = `# ATENDIMENTO DE URGÊNCIA

**Queixa Principal:** ${state.queixa || "Não informada"}

**Achados Clínicos:**
${state.achados.length > 0 ? state.achados.map((a) => `- ${a}`).join("\n") : "- Sem achados relevantes"}

**Conduta:** ${state.conduta || "Aguardando avaliação completa"}

---
*Atendimento urgente realizado*`;
    setOutputText(text);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Texto copiado para a área de transferência!");
  };

  const handleReset = () => {
    if (activeTab === "glaucoma") {
      const newState = {
        motivo: "Rotina",
        cornea: "Transparente",
        lens: "Transparente",
        pioOd: 14,
        pioOe: 14,
        edOd: "0.3",
        edOe: "0.3",
        hora: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setGlaucoma(newState);
      updateGlaucomaText(newState);
    } else if (activeTab === "receita") {
      const newState = {
        rxOdEsf: 0,
        rxOdCyl: 0,
        rxOdEixo: 180,
        rxOeEsf: 0,
        rxOeCyl: 0,
        rxOeEixo: 180,
        rxAdd: 2.0,
        lensType: "Multifocal",
      };
      setReceita(newState);
      updateReceitaText(newState);
    }
  };

  // Inicializar texto ao montar
  useState(() => {
    updateGlaucomaText(glaucoma);
  });

  const tabs = [
    { id: "glaucoma", label: "👁️ Glaucoma & Rotina" },
    { id: "receita", label: "👓 Receita Óculos" },
    { id: "laudos", label: "📄 Laudos (OCT/CV)" },
    { id: "urgencia", label: "🚨 Urgência" },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Dashboard Médico
          </h1>
          <p className="text-gray-600">
            Ferramenta de geração de anamneses e prescrições
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                if (tab.id === "glaucoma") updateGlaucomaText(glaucoma);
                else if (tab.id === "receita") updateReceitaText(receita);
                else if (tab.id === "laudos") updateLaudosText(laudos);
                else if (tab.id === "urgencia") updateUrgenciaText(urgencia);
              }}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {activeTab === "glaucoma" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">
                    DADOS GERAIS
                  </h3>
                  <div className="space-y-2">
                    {["Rotina", "Suspeita Glaucoma", "Pré-Op Catarata"].map(
                      (option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="motivo"
                            value={option}
                            checked={glaucoma.motivo === option}
                            onChange={(e) => toggleTag("glaucoma-motivo", e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">
                    BIOMICROSCOPIA
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Córnea:
                      </label>
                      <select
                        value={glaucoma.cornea}
                        onChange={(e) => toggleTag("glaucoma-cornea", e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option>Transparente</option>
                        <option>Ceratite Punctata</option>
                        <option>Edema 1+</option>
                        <option>Guttata</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Cristalino:
                      </label>
                      <select
                        value={glaucoma.lens}
                        onChange={(e) => toggleTag("glaucoma-lens", e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option>Transparente</option>
                        <option>Catarata N1</option>
                        <option>Catarata N2</option>
                        <option>LIO Tópica</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">
                    PRESSÃO (PIO) & ESCAVAÇÃO
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        PIO OD (mmHg):
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newState = {
                              ...glaucoma,
                              pioOd: Math.max(0, glaucoma.pioOd - 1),
                            };
                            setGlaucoma(newState);
                            updateGlaucomaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                          −
                        </button>
                        <Input
                          type="number"
                          value={glaucoma.pioOd}
                          onChange={(e) => {
                            const newState = {
                              ...glaucoma,
                              pioOd: parseInt(e.target.value) || 0,
                            };
                            setGlaucoma(newState);
                            updateGlaucomaText(newState);
                          }}
                          className="w-16 text-center"
                        />
                        <button
                          onClick={() => {
                            const newState = {
                              ...glaucoma,
                              pioOd: glaucoma.pioOd + 1,
                            };
                            setGlaucoma(newState);
                            updateGlaucomaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        PIO OE (mmHg):
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newState = {
                              ...glaucoma,
                              pioOe: Math.max(0, glaucoma.pioOe - 1),
                            };
                            setGlaucoma(newState);
                            updateGlaucomaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                          −
                        </button>
                        <Input
                          type="number"
                          value={glaucoma.pioOe}
                          onChange={(e) => {
                            const newState = {
                              ...glaucoma,
                              pioOe: parseInt(e.target.value) || 0,
                            };
                            setGlaucoma(newState);
                            updateGlaucomaText(newState);
                          }}
                          className="w-16 text-center"
                        />
                        <button
                          onClick={() => {
                            const newState = {
                              ...glaucoma,
                              pioOe: glaucoma.pioOe + 1,
                            };
                            setGlaucoma(newState);
                            updateGlaucomaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Escavação OD:
                      </label>
                      <select
                        value={glaucoma.edOd}
                        onChange={(e) => {
                          const newState = { ...glaucoma, edOd: e.target.value };
                          setGlaucoma(newState);
                          updateGlaucomaText(newState);
                        }}
                        className="w-full p-2 border rounded"
                      >
                        {["0.3", "0.4", "0.5", "0.6", "0.7", "0.8"].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Escavação OE:
                      </label>
                      <select
                        value={glaucoma.edOe}
                        onChange={(e) => {
                          const newState = { ...glaucoma, edOe: e.target.value };
                          setGlaucoma(newState);
                          updateGlaucomaText(newState);
                        }}
                        className="w-full p-2 border rounded"
                      >
                        {["0.3", "0.4", "0.5", "0.6", "0.7", "0.8"].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "receita" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">
                    REFRAÇÃO DINÂMICA
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        OD - Esférico:
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newState = {
                              ...receita,
                              rxOdEsf: receita.rxOdEsf - 0.25,
                            };
                            setReceita(newState);
                            updateReceitaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded"
                        >
                          −
                        </button>
                        <Input
                          type="number"
                          step="0.25"
                          value={receita.rxOdEsf.toFixed(2)}
                          onChange={(e) => {
                            const newState = {
                              ...receita,
                              rxOdEsf: parseFloat(e.target.value) || 0,
                            };
                            setReceita(newState);
                            updateReceitaText(newState);
                          }}
                          className="w-20 text-center"
                        />
                        <button
                          onClick={() => {
                            const newState = {
                              ...receita,
                              rxOdEsf: receita.rxOdEsf + 0.25,
                            };
                            setReceita(newState);
                            updateReceitaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        OD - Cilíndrico:
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newState = {
                              ...receita,
                              rxOdCyl: Math.min(0, receita.rxOdCyl + 0.25),
                            };
                            setReceita(newState);
                            updateReceitaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded"
                        >
                          −
                        </button>
                        <Input
                          type="number"
                          step="0.25"
                          value={receita.rxOdCyl.toFixed(2)}
                          onChange={(e) => {
                            const newState = {
                              ...receita,
                              rxOdCyl: parseFloat(e.target.value) || 0,
                            };
                            setReceita(newState);
                            updateReceitaText(newState);
                          }}
                          className="w-20 text-center"
                        />
                        <button
                          onClick={() => {
                            const newState = {
                              ...receita,
                              rxOdCyl: Math.min(0, receita.rxOdCyl - 0.25),
                            };
                            setReceita(newState);
                            updateReceitaText(newState);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        OD - Eixo:
                      </label>
                      <Input
                        type="number"
                        step="5"
                        value={receita.rxOdEixo}
                        onChange={(e) => {
                          const newState = {
                            ...receita,
                            rxOdEixo: parseInt(e.target.value) || 0,
                          };
                          setReceita(newState);
                          updateReceitaText(newState);
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    ADIÇÃO (Perto):
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newState = {
                          ...receita,
                          rxAdd: Math.max(0, receita.rxAdd - 0.25),
                        };
                        setReceita(newState);
                        updateReceitaText(newState);
                      }}
                      className="px-3 py-1 bg-blue-100 rounded"
                    >
                      −
                    </button>
                    <Input
                      type="number"
                      step="0.25"
                      value={receita.rxAdd.toFixed(2)}
                      onChange={(e) => {
                        const newState = {
                          ...receita,
                          rxAdd: parseFloat(e.target.value) || 0,
                        };
                        setReceita(newState);
                        updateReceitaText(newState);
                      }}
                      className="w-20 text-center"
                    />
                    <button
                      onClick={() => {
                        const newState = {
                          ...receita,
                          rxAdd: receita.rxAdd + 0.25,
                        };
                        setReceita(newState);
                        updateReceitaText(newState);
                      }}
                      className="px-3 py-1 bg-blue-100 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tipo de Lente:
                  </label>
                  <select
                    value={receita.lensType}
                    onChange={(e) => {
                      const newState = {
                        ...receita,
                        lensType: e.target.value,
                      };
                      setReceita(newState);
                      updateReceitaText(newState);
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option>Multifocal</option>
                    <option>Visão Simples (Longe)</option>
                    <option>Visão Simples (Perto)</option>
                    <option>Antirreflexo</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "laudos" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">
                    OCT (Tomografia)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Confiabilidade:
                      </label>
                      <select
                        value={laudos.octConfiabilidade}
                        onChange={(e) => {
                          const newState = {
                            ...laudos,
                            octConfiabilidade: e.target.value,
                          };
                          setLaudos(newState);
                          updateLaudosText(newState);
                        }}
                        className="w-full p-2 border rounded"
                      >
                        <option>Excelente</option>
                        <option>Boa</option>
                        <option>Adequada</option>
                        <option>Pobre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Achados:
                      </label>
                      <textarea
                        value={laudos.octDefects.join(", ")}
                        onChange={(e) => {
                          const newState = {
                            ...laudos,
                            octDefects: e.target.value
                              .split(",")
                              .map((d) => d.trim())
                              .filter((d) => d),
                          };
                          setLaudos(newState);
                          updateLaudosText(newState);
                        }}
                        placeholder="Descreva os achados (separados por vírgula)"
                        className="w-full p-2 border rounded text-sm"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">
                    CAMPO VISUAL
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Confiabilidade:
                      </label>
                      <select
                        value={laudos.cvConfiabilidade}
                        onChange={(e) => {
                          const newState = {
                            ...laudos,
                            cvConfiabilidade: e.target.value,
                          };
                          setLaudos(newState);
                          updateLaudosText(newState);
                        }}
                        className="w-full p-2 border rounded"
                      >
                        <option>Excelente</option>
                        <option>Boa</option>
                        <option>Adequada</option>
                        <option>Pobre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Achados:
                      </label>
                      <textarea
                        value={laudos.cvDefects.join(", ")}
                        onChange={(e) => {
                          const newState = {
                            ...laudos,
                            cvDefects: e.target.value
                              .split(",")
                              .map((d) => d.trim())
                              .filter((d) => d),
                          };
                          setLaudos(newState);
                          updateLaudosText(newState);
                        }}
                        placeholder="Descreva os achados (separados por vírgula)"
                        className="w-full p-2 border rounded text-sm"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "urgencia" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Queixa Principal:
                  </label>
                  <textarea
                    value={urgencia.queixa}
                    onChange={(e) => {
                      const newState = { ...urgencia, queixa: e.target.value };
                      setUrgencia(newState);
                      updateUrgenciaText(newState);
                    }}
                    placeholder="Descreva a queixa do paciente"
                    className="w-full p-2 border rounded text-sm"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Achados Clínicos:
                  </label>
                  <textarea
                    value={urgencia.achados.join("\n")}
                    onChange={(e) => {
                      const newState = {
                        ...urgencia,
                        achados: e.target.value
                          .split("\n")
                          .map((a) => a.trim())
                          .filter((a) => a),
                      };
                      setUrgencia(newState);
                      updateUrgenciaText(newState);
                    }}
                    placeholder="Um achado por linha"
                    className="w-full p-2 border rounded text-sm"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Conduta:
                  </label>
                  <textarea
                    value={urgencia.conduta}
                    onChange={(e) => {
                      const newState = { ...urgencia, conduta: e.target.value };
                      setUrgencia(newState);
                      updateUrgenciaText(newState);
                    }}
                    placeholder="Descreva a conduta a ser seguida"
                    className="w-full p-2 border rounded text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Resetar
              </Button>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-blue-600 mb-4">
              Pré-visualização do Texto
            </h3>
            <textarea
              value={outputText}
              readOnly
              className="flex-1 p-4 border rounded bg-gray-50 font-mono text-sm resize-none"
            />
            <Button
              onClick={handleCopyText}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 gap-2"
            >
              <Copy className="w-4 h-4" />
              Copiar Texto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
