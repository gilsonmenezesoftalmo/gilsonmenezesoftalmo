// Centralized contact information
export const CONTACT = {
  whatsapp: {
    number: '+5531995324400',
    message: 'Olá! Gostaria de agendar uma consulta com o Dr. Gilson Menezes.',
    get link() {
      return `https://wa.me/${this.number.replace(/\D/g, '')}?text=${encodeURIComponent(this.message)}`;
    },
    displayNumber: '+55 (31) 99532-4400',
  },
  email: 'gilsonmenezesoftalmo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gilson-menezes-oftalmo',
  instagram: 'https://www.instagram.com/gilsonmenezesoftalmo',
  doctoralia: 'https://www.doctoralia.com.br/gilson-de-santana-menezes-junior/oftalmologista/lagoa-santa',
  doctoraliaDoctor: 'gilson-de-santana-menezes-junior',
} as const;
