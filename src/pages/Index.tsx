import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Especialidades from '@/components/Especialidades';
import Tecnologia from '@/components/Tecnologia';
import Numeros from '@/components/Numeros';
import Jornada from '@/components/Jornada';
import Contato from '@/components/Contato';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Especialidades />
      <Tecnologia />
      <Numeros />
      <Jornada />
      <Contato />
      <Blog />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
