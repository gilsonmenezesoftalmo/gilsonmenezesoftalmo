const stats = [
  { value: 'SES-DF', label: 'Residência Médica', sublabel: 'FEPECS' },
  { value: 'MIGS', label: 'Cirurgia Minimamente', sublabel: 'Invasiva' },
  { value: 'iStent', label: 'Tecnologia', sublabel: 'Avançada' },
  { value: 'Premium', label: 'Lentes de', sublabel: 'Alta Performance' },
];

const Numeros = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium">
          Compromisso com a Excelência
        </span>
        <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-16 text-foreground">
          Excelência em Números
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 border border-border hover:border-primary transition-colors duration-300 group"
            >
              <div className="text-2xl md:text-3xl font-serif font-semibold text-primary group-hover:text-accent transition-colors">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-3">
                {stat.label}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Numeros;
