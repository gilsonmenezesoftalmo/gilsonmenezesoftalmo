// Serviço de autenticação com CRM
// Este é um exemplo simplificado. Em produção, você usaria um backend seguro.

const VALID_CRM = "84896";
const VALID_PASSWORD = "prontuariosecreto";

export interface AuthCredentials {
  crm: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

/**
 * Autentica o médico com CRM e senha
 * Em produção, isso deveria ser feito no backend
 */
export const authenticateMedico = (
  credentials: AuthCredentials
): AuthResponse => {
  if (credentials.crm === VALID_CRM && credentials.password === VALID_PASSWORD) {
    // Gerar token simples (em produção, seria JWT do backend)
    const token = btoa(`${credentials.crm}:${Date.now()}`);
    
    // Salvar no localStorage
    localStorage.setItem("medico_token", token);
    localStorage.setItem("medico_crm", credentials.crm);
    localStorage.setItem("medico_auth_time", new Date().toISOString());

    return {
      success: true,
      message: "Autenticado com sucesso",
      token,
    };
  }

  return {
    success: false,
    message: "CRM ou senha inválidos",
  };
};

/**
 * Verifica se o médico está autenticado
 */
export const isMedicoAuthenticated = (): boolean => {
  const token = localStorage.getItem("medico_token");
  const crm = localStorage.getItem("medico_crm");
  return !!token && !!crm && crm === VALID_CRM;
};

/**
 * Obtém o CRM do médico autenticado
 */
export const getMedicoCRM = (): string | null => {
  return localStorage.getItem("medico_crm");
};

/**
 * Faz logout do médico
 */
export const logoutMedico = (): void => {
  localStorage.removeItem("medico_token");
  localStorage.removeItem("medico_crm");
  localStorage.removeItem("medico_auth_time");
};

/**
 * Obtém o token de autenticação
 */
export const getMedicoToken = (): string | null => {
  return localStorage.getItem("medico_token");
};
