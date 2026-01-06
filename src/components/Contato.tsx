import { Phone, Mail, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/lib/contact';
import drGilsonSurgery from '@/assets/dr-gilson-surgery.jpg';
import DoctoraliaWidget from './DoctoraliaWidget';

const Contato = () => {
  return (
    <section id="agendar" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/3] rounded overflow-hidden shadow-2xl">
              <img
                src={drGilsonSurgery}
                alt="Dr. Gilson Menezes em ambiente cirúrgico"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-primary rounded -z-10" />
          </div>

          {/* Contact Card */}
          <div className="order-1 md:order-2">
            <div className="bg-card border border-border shadow-2xl p-8 md:p-12 rounded">
              <span className="text-gold uppercase tracking-[0.2em] text-sm font-medium">
                Atendimento Premium
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mt-2 mb-4 text-foreground">
                Agende sua Consulta
              </h2>
              <p className="text-muted-foreground mb-8">
                Atendimento especializado em Glaucoma e Catarata com horários flexíveis. 
                Entre em contato pelo WhatsApp ou agende diretamente pela Doctoralia.
              </p>

              {/* WhatsApp Button */}
              <Button asChild variant="whatsapp" size="xl" className="w-full mb-6 uppercase tracking-wider font-semibold">
                <a href={CONTACT.whatsapp.link} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Agendar via WhatsApp
                </a>
              </Button>

              {/* Doctoralia Widget */}
              <div className="mb-8 rounded overflow-hidden">
                <DoctoraliaWidget />
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-6 border-t border-border">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="text-sm">{CONTACT.email}</span>
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Instagram className="w-4 h-4" />
                  </span>
                  <span className="text-sm">@gilsonmenezesoftalmo</span>
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <span className="text-sm">LinkedIn Profissional</span>
                </a>
                <a
                  href={CONTACT.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="text-sm">{CONTACT.whatsapp.displayNumber}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
