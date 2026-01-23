import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { toast } from 'sonner';
import { salvarPreConsulta } from '@/lib/preConsultaService';

type FormData = {
  // Etapa 1: Identificação
  nomePaciente: string;
  endereco: string;
  cpf: string;
  whatsapp: string;
  email: string;
  dataNascimento: string;
  jaEhPaciente: 'sim' | 'nao' | '';
  
  // Etapa 2: Motivo da Visita
  motivoVisita: 'rotina' | 'glaucoma' | 'catarata' | 'plastica' | '';
  
  // Etapa 3: Dados Clínicos
  queixasOuSintomas: string;
  
  // Etapa 4: Histórico de Saúde
  historicoSaude: {
    diabetes: boolean;
    hipertensao: boolean;
    alergias: string;
    medicamentos: string;
  };
};

export default function PreConsulta() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nomePaciente: '',
    endereco: '',
    cpf: '',
    whatsapp: '',
    email: '',
    dataNascimento: '',
    jaEhPaciente: '',
    motivoVisita: '',
    queixasOuSintomas: '',
    historicoSaude: {
      diabetes: false,
      hipertensao: false,
      alergias: '',
      medicamentos: '',
    },
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Salvar no Firebase
      const preConsultaData = {
        nomeCompleto: formData.nomePaciente,
        enderecoCompleto: formData.endereco,
        cpf: formData.cpf,
        whatsapp: formData.whatsapp,
        email: formData.email,
        dataNascimento: formData.dataNascimento,
        jaEhPaciente: formData.jaEhPaciente === 'sim',
        motivoVisita: formData.motivoVisita,
        queixasOuSintomas: formData.queixasOuSintomas,
        temDiabetes: formData.historicoSaude.diabetes,
        temHipertensao: formData.historicoSaude.hipertensao,
        alergias: formData.historicoSaude.alergias,
        medicamentosEmUso: formData.historicoSaude.medicamentos,
      };

      await salvarPreConsulta(preConsultaData);

      // Criar mensagem WhatsApp
      const mensagem = `
*Pré-Consulta Oftalmológica*

*Dados Pessoais:*
Nome: ${formData.nomePaciente}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Data Nascimento: ${formData.dataNascimento}
${formData.cpf ? `CPF: ${formData.cpf}` : ''}
Endereço: ${formData.endereco}

*Motivo da Visita:* ${formData.motivoVisita}
*Já é paciente:* ${formData.jaEhPaciente === 'sim' ? 'Sim' : 'Não'}

*Queixas/Sintomas:*
${formData.queixasOuSintomas || 'Nenhum'}

*Histórico de Saúde:*
Diabetes: ${formData.historicoSaude.diabetes ? 'Sim' : 'Não'}
Hipertensão: ${formData.historicoSaude.hipertensao ? 'Sim' : 'Não'}
Alergias: ${formData.historicoSaude.alergias || 'Nenhuma'}
Medicamentos: ${formData.historicoSaude.medicamentos || 'Nenhum'}

✅ Dados salvos no sistema
      `.trim();

      const whatsappUrl = `https://wa.me/5531995324400?text=${encodeURIComponent(mensagem)}`;
      
      toast.success('Pré-consulta salva e enviada com sucesso!');
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Erro ao salvar pré-consulta:', error);
      toast.error('Erro ao salvar pré-consulta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.nomePaciente &&
          formData.endereco &&
          formData.whatsapp &&
          formData.email &&
          formData.dataNascimento &&
          formData.jaEhPaciente
        );
      case 2:
        return formData.motivoVisita;
      case 3:
      case 4:
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4 formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Step5 formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-4xl py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Pré-Consulta Oftalmológica</h1>
          <p className="text-muted-foreground text-lg">
            Preencha o questionário para agilizar seu atendimento
          </p>
          <p className="text-muted-foreground text-lg">
            Etapa {currentStep} de 5
          </p>
          <div className="mt-6 flex gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="card-premium">
          <CardContent className="pt-6">{renderStep()}</CardContent>
        </Card>

        <div className="mt-8 flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            size="lg"
            className="min-w-[120px]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>

          {currentStep < 5 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              size="lg"
              className="min-w-[120px]"
            >
              Próximo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              size="lg"
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Enviar
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

// Step 1: Identificação
function Step1({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Identificação</h2>
        <p className="text-muted-foreground">
          Por favor, preencha seus dados pessoais
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nome" className="text-base">Nome Completo *</Label>
          <Input
            id="nome"
            value={formData.nomePaciente}
            onChange={(e) => updateFormData({ nomePaciente: e.target.value })}
            placeholder="Digite seu nome completo"
            className="h-11"
          />
        </div>

        <div>
          <Label htmlFor="endereco" className="text-base">Endereço Completo *</Label>
          <Input
            id="endereco"
            value={formData.endereco}
            onChange={(e) => updateFormData({ endereco: e.target.value })}
            placeholder="Rua, número, bairro, cidade, estado"
            className="h-11"
          />
        </div>

        <div>
          <Label htmlFor="cpf" className="text-base">
            CPF (opcional)
          </Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => updateFormData({ cpf: e.target.value })}
            placeholder="000.000.000-00"
            className="h-11"
          />
          <p className="text-sm text-muted-foreground mt-1">
            ⚠️ Necessário para emissão de atestados e receitas controladas
          </p>
        </div>

        <div>
          <Label htmlFor="whatsapp" className="text-base">WhatsApp *</Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => updateFormData({ whatsapp: e.target.value })}
            placeholder="(00) 00000-0000"
            className="h-11"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="seu@email.com"
            className="h-11"
          />
        </div>

        <div>
          <Label htmlFor="dataNascimento" className="text-base">Data de Nascimento *</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) => updateFormData({ dataNascimento: e.target.value })}
            className="h-11"
          />
        </div>

        <div>
          <Label className="text-base mb-3 block">Você já é paciente do Dr. Gilson? *</Label>
          <RadioGroup
            value={formData.jaEhPaciente}
            onValueChange={(value) =>
              updateFormData({ jaEhPaciente: value as 'sim' | 'nao' })
            }
          >
            <div className="flex items-center space-x-3 mb-2">
              <RadioGroupItem value="sim" id="sim" />
              <Label htmlFor="sim" className="cursor-pointer">Sim, já sou paciente</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="nao" id="nao" />
              <Label htmlFor="nao" className="cursor-pointer">Não, é minha primeira consulta</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

// Step 2: Motivo da Visita
function Step2({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Motivo da Visita</h2>
        <p className="text-muted-foreground">
          Qual é o principal motivo de sua consulta?
        </p>
      </div>

      <RadioGroup
        value={formData.motivoVisita}
        onValueChange={(value) =>
          updateFormData({ motivoVisita: value as any })
        }
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted cursor-pointer">
            <RadioGroupItem value="rotina" id="rotina" />
            <Label htmlFor="rotina" className="cursor-pointer flex-1">
              <div className="font-semibold">Consulta de Rotina</div>
              <div className="text-sm text-muted-foreground">Acompanhamento regular</div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted cursor-pointer">
            <RadioGroupItem value="glaucoma" id="glaucoma" />
            <Label htmlFor="glaucoma" className="cursor-pointer flex-1">
              <div className="font-semibold">Suspeita de Glaucoma</div>
              <div className="text-sm text-muted-foreground">Avaliação de pressão ocular</div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted cursor-pointer">
            <RadioGroupItem value="catarata" id="catarata" />
            <Label htmlFor="catarata" className="cursor-pointer flex-1">
              <div className="font-semibold">Catarata</div>
              <div className="text-sm text-muted-foreground">Avaliação ou cirurgia</div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted cursor-pointer">
            <RadioGroupItem value="plastica" id="plastica" />
            <Label htmlFor="plastica" className="cursor-pointer flex-1">
              <div className="font-semibold">Plástica Ocular</div>
              <div className="text-sm text-muted-foreground">Cirurgia ou avaliação</div>
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}

// Step 3: Informações Clínicas
function Step3({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Informações Clínicas</h2>
        <p className="text-muted-foreground">
          Descreva seus sintomas ou queixas atuais
        </p>
      </div>

      <div>
        <Label htmlFor="queixas" className="text-base">Queixas ou Sintomas Atuais</Label>
        <Textarea
          id="queixas"
          value={formData.queixasOuSintomas}
          onChange={(e) => updateFormData({ queixasOuSintomas: e.target.value })}
          placeholder="Ex: Visão embaçada, dor nos olhos, dificuldade para enxergar à noite, etc."
          className="h-32 resize-none"
        />
      </div>
    </div>
  );
}

// Step 4: Histórico de Saúde
function Step4({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Histórico de Saúde</h2>
        <p className="text-muted-foreground">
          Informações sobre sua saúde geral
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <input
            type="checkbox"
            id="diabetes"
            checked={formData.historicoSaude.diabetes}
            onChange={(e) =>
              updateFormData({
                historicoSaude: {
                  ...formData.historicoSaude,
                  diabetes: e.target.checked,
                },
              })
            }
            className="w-5 h-5 rounded"
          />
          <Label htmlFor="diabetes" className="cursor-pointer flex-1">
            Tenho Diabetes
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <input
            type="checkbox"
            id="hipertensao"
            checked={formData.historicoSaude.hipertensao}
            onChange={(e) =>
              updateFormData({
                historicoSaude: {
                  ...formData.historicoSaude,
                  hipertensao: e.target.checked,
                },
              })
            }
            className="w-5 h-5 rounded"
          />
          <Label htmlFor="hipertensao" className="cursor-pointer flex-1">
            Tenho Hipertensão
          </Label>
        </div>

        <div>
          <Label htmlFor="alergias" className="text-base">Alergias</Label>
          <Textarea
            id="alergias"
            value={formData.historicoSaude.alergias}
            onChange={(e) =>
              updateFormData({
                historicoSaude: {
                  ...formData.historicoSaude,
                  alergias: e.target.value,
                },
              })
            }
            placeholder="Ex: Penicilina, Dipirona, etc."
            className="h-20 resize-none"
          />
        </div>

        <div>
          <Label htmlFor="medicamentos" className="text-base">Medicamentos em Uso</Label>
          <Textarea
            id="medicamentos"
            value={formData.historicoSaude.medicamentos}
            onChange={(e) =>
              updateFormData({
                historicoSaude: {
                  ...formData.historicoSaude,
                  medicamentos: e.target.value,
                },
              })
            }
            placeholder="Ex: Losartana 50mg, Metformina 500mg, etc."
            className="h-20 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

// Step 5: Revisão
function Step5({ formData }: { formData: FormData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Revisão dos Dados</h2>
        <p className="text-muted-foreground">
          Verifique se todas as informações estão corretas
        </p>
      </div>

      <div className="space-y-4 bg-muted p-4 rounded-lg">
        <div>
          <h3 className="font-semibold text-sm text-muted-foreground">Dados Pessoais</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p><strong>Nome:</strong> {formData.nomePaciente}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>WhatsApp:</strong> {formData.whatsapp}</p>
            <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
            {formData.cpf && <p><strong>CPF:</strong> {formData.cpf}</p>}
            <p><strong>Endereço:</strong> {formData.endereco}</p>
            <p><strong>Paciente anterior:</strong> {formData.jaEhPaciente === 'sim' ? 'Sim' : 'Não'}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-muted-foreground">Motivo da Consulta</h3>
          <p className="mt-2 text-sm">{formData.motivoVisita}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-muted-foreground">Queixas</h3>
          <p className="mt-2 text-sm">{formData.queixasOuSintomas || 'Nenhuma'}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-muted-foreground">Histórico de Saúde</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p><strong>Diabetes:</strong> {formData.historicoSaude.diabetes ? 'Sim' : 'Não'}</p>
            <p><strong>Hipertensão:</strong> {formData.historicoSaude.hipertensao ? 'Sim' : 'Não'}</p>
            <p><strong>Alergias:</strong> {formData.historicoSaude.alergias || 'Nenhuma'}</p>
            <p><strong>Medicamentos:</strong> {formData.historicoSaude.medicamentos || 'Nenhum'}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          ✅ Ao enviar, seus dados serão salvos no sistema e você será redirecionado para o WhatsApp para confirmar o agendamento.
        </p>
      </div>
    </div>
  );
}
