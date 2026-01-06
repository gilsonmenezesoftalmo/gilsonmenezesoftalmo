import { Eye, Microscope, Cpu } from 'lucide-react';

const technologies = [
  {
    number: '01',
    icon: Eye,
    title: 'MIGS & Glaucoma',
    description: 'Procedimentos minimamente invasivos com iStent e PreserFlo para controle da pressão ocular com recuperação rápida.',
  },
  {
    number: '02',
    icon: Microscope,
    title: 'Catarata Premium',
    description: 'Implantes de lentes de última geração personalizadas para seu estilo de vida e necessidades visuais.',
  },
  {
    number: '03',
    icon: Cpu,
    title: 'Tecnologia Avançada',
    description: 'Planejamento digital e equipamentos de precisão para cirurgias com máxima segurança e previsibilidade.',
  },
];

const Tecnologia = () => {
  return (
    <section id="tecnologia" className="py-24 px-6 bg-stone-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-medium">
            Inovação & Precisão
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 text-primary-foreground">
            Tecnologia a Serviço da Visão
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {technologies.map((tech) => (
            <div key={tech.number} className="text-center group">
              <div className="text-gold text-4xl font-serif mb-4 opacity-60">
                {tech.number}
              </div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/5 mb-6 group-hover:bg-primary-foreground/10 transition-colors">
                <tech.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-primary-foreground">
                {tech.title}
              </h3>
              <p className="text-stone-medium font-light leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecnologia;
