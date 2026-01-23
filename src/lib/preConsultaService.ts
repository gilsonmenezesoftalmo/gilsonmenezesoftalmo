import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface PreConsultaData {
  id?: string;
  // Etapa 1 - Identificação
  nomeCompleto: string;
  enderecoCompleto: string;
  cpf?: string;
  whatsapp: string;
  email: string;
  dataNascimento: string;
  jaEhPaciente: boolean;

  // Etapa 2 - Motivo da Visita
  motivoVisita: string;

  // Etapa 3 - Informações Clínicas
  queixasOuSintomas: string;

  // Etapa 4 - Histórico de Saúde (MELHORADO)
  temDiabetes: boolean;
  temHipertensao: boolean;
  medicamentosTexto: string;
  medicamentosFoto?: string | null; // Base64 da foto
  medicamentosOlho: boolean;
  medicamentosCorp: boolean;
  alergiaComida: string;
  alergiaAmbiente: string;
  alergiaMedicamento: string;
  usaOculos: string;

  // Metadados
  dataCriacao?: string;
  dataAtualizacao?: string;
  status?: "pendente" | "em_andamento" | "concluido";
}

/**
 * Salva dados de pré-consulta no Firebase
 */
export const salvarPreConsulta = async (
  data: PreConsultaData
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "pre_consultas"), {
      ...data,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      status: "pendente",
    });
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar pré-consulta:", error);
    throw error;
  }
};

/**
 * Obtém todas as pré-consultas ordenadas por data
 */
export const obterTodasPreConsultas = async (): Promise<PreConsultaData[]> => {
  try {
    const q = query(
      collection(db, "pre_consultas"),
      orderBy("dataCriacao", "desc")
    );
    const querySnapshot = await getDocs(q);
    const preConsultas: PreConsultaData[] = [];

    querySnapshot.forEach((doc) => {
      preConsultas.push({
        id: doc.id,
        ...doc.data(),
      } as PreConsultaData);
    });

    return preConsultas;
  } catch (error) {
    console.error("Erro ao obter pré-consultas:", error);
    throw error;
  }
};

/**
 * Obtém uma pré-consulta específica pelo ID
 */
export const obterPreConsultaPorId = async (
  id: string
): Promise<PreConsultaData | null> => {
  try {
    const docRef = doc(db, "pre_consultas", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as PreConsultaData;
    }

    return null;
  } catch (error) {
    console.error("Erro ao obter pré-consulta:", error);
    throw error;
  }
};

/**
 * Atualiza o status de uma pré-consulta
 */
export const atualizarStatusPreConsulta = async (
  id: string,
  status: "pendente" | "em_andamento" | "concluido"
): Promise<void> => {
  try {
    const docRef = doc(db, "pre_consultas", id);
    await updateDoc(docRef, {
      status,
      dataAtualizacao: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    throw error;
  }
};

/**
 * Atualiza dados de uma pré-consulta
 */
export const atualizarPreConsulta = async (
  id: string,
  data: Partial<PreConsultaData>
): Promise<void> => {
  try {
    const docRef = doc(db, "pre_consultas", id);
    await updateDoc(docRef, {
      ...data,
      dataAtualizacao: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao atualizar pré-consulta:", error);
    throw error;
  }
};
