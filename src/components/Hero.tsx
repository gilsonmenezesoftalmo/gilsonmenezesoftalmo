import { Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/lib/contact';
import heroImage from '@/assets/hero-eye.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-6 animate-fade-in">
          Oftalmologia de Precisão
        </span>
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 leading-tight animate-slide-up">
          A ciência da visão em sua forma mais precisa.
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/80 font-light max-w-2xl mx-auto mb-10 italic animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Especialista em Glaucoma e Catarata. Unindo tecnologia de ponta à medicina humanizada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild variant="whatsapp" size="xl" className="uppercase tracking-wider font-semibold">
            <a href={CONTACT.whatsapp.link} target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5" />
              Agendar Avaliação
            </a>
          </Button>
          <Button asChild variant="hero" size="xl" className="uppercase tracking-wider font-semibold">
            <a href="#especialidades">
              Conhecer Tratamentos
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#especialidades" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
