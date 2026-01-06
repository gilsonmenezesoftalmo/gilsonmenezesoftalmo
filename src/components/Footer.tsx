import { Linkedin, Mail, Phone, Instagram } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

const Footer = () => {
  return (
    <footer className="py-12 bg-stone-dark border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="font-serif text-xl text-primary-foreground mb-2">
              Dr. Gilson Menezes
            </div>
            <div className="text-xs text-stone-medium uppercase tracking-[0.2em]">
              Precisão na Medicina. Excelência na Visão.
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-stone-medium hover:text-gold transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={CONTACT.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-medium hover:text-gold transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-medium hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-medium hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-xs text-stone-medium">
            © {new Date().getFullYear()} Dr. Gilson Menezes. Oftalmologista. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
