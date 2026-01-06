import drGilsonPortrait from '@/assets/dr-gilson-portrait.jpg';

const Especialidades = () => {
  return (
    <section id="especialidades" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-semibold uppercase tracking-[0.2em] text-sm">
              Expertise Clínica
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-foreground">
              Tratamentos com Rigor Científico.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              Como especialista em <strong className="text-foreground">Glaucoma e Catarata</strong>, 
              entendo que cada diagnóstico requer um plano cirúrgico único. Meu foco é preservar 
              sua qualidade de vida através de intervenções minimamente invasivas.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Com formação pela <strong className="text-foreground">SES-DF (FEPECS)</strong>, 
              utilizo tecnologias de ponta, incluindo planejamento digital e dispositivos de 
              última geração como <strong className="text-foreground">iStent</strong> e 
              <strong className="text-foreground"> PreserFlo</strong>, para garantir o melhor 
              desfecho clínico possível.
            </p>
          </div>
          
          <div className="relative">
            <div className="aspect-[3/4] rounded overflow-hidden shadow-2xl">
              <img
                src={drGilsonPortrait}
                alt="Dr. Gilson Menezes - Oftalmologista"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-primary rounded -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Especialidades;
