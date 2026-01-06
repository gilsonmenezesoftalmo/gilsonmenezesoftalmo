import { ClipboardList, Stethoscope, UserCheck, HeartPulse } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Avaliação Detalhada',
    description: 'Exames de imagem avançados para mapear cada detalhe da sua saúde ocular.',
    isActive: true,
  },
  {
    icon: Stethoscope,
    title: 'Diagnóstico Preciso',
    description: 'Análise minuciosa para identificar a melhor estratégia de tratamento.',
    isActive: false,
  },
  {
    icon: UserCheck,
    title: 'Planejamento Cirúrgico',
    description: 'Discussão transparente sobre as melhores opções de tratamento e lentes.',
    isActive: false,
  },
  {
    icon: HeartPulse,
    title: 'Acompanhamento',
    description: 'Suporte próximo no pós-operatório para garantir sua recuperação perfeita.',
    isActive: true,
  },
];

const Jornada = () => {
  return (
    <section id="jornada" className="py-24 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium">
            Processo Estruturado
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 text-foreground">
            Sua Jornada Conosco
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Um processo cuidadosamente estruturado para garantir sua tranquilidade em cada etapa.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className={`inline-flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground font-semibold">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jornada;
