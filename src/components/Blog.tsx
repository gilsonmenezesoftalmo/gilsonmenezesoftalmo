import { useState } from 'react';
import { MessageCircle, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Question {
  id: string;
  name: string;
  email: string;
  question: string;
  date: string;
  likes: number;
  answered: boolean;
  answer?: string;
  answerDate?: string;
}

const Blog = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@example.com',
      question: 'Qual é o tempo de recuperação após uma cirurgia de catarata?',
      date: '2024-01-05',
      likes: 12,
      answered: true,
      answer: 'A recuperação visual após a cirurgia de catarata geralmente ocorre em 2 a 4 semanas. A maioria dos pacientes consegue retomar atividades normais em poucos dias, mas a visão final estabiliza completamente após cerca de um mês.',
      answerDate: '2024-01-05',
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@example.com',
      question: 'Como saber se tenho glaucoma?',
      date: '2024-01-04',
      likes: 8,
      answered: true,
      answer: 'O glaucoma geralmente não apresenta sintomas no início. Por isso, é importante fazer exames oftalmológicos regulares. Os principais sinais incluem aumento da pressão intraocular, alterações no campo visual e dano ao nervo óptico.',
      answerDate: '2024-01-04',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  const [likedQuestions, setLikedQuestions] = useState<Set<string>>(new Set());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.question) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      question: formData.question,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      answered: false,
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setFormData({ name: '', email: '', question: '' });
    alert('Pergunta enviada com sucesso! O Dr. Gilson responderá em breve.');
  };

  const handleLike = (id: string) => {
    setLikedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    setQuestions(prev =>
      prev.map(q =>
        q.id === id
          ? { ...q, likes: q.likes + (likedQuestions.has(id) ? -1 : 1) }
          : q
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-medium">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2 mb-4 text-foreground">
            Perguntas dos Pacientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tem uma dúvida sobre oftalmologia, glaucoma ou catarata? Envie sua pergunta e o Dr. Gilson responderá em breve.
          </p>
        </div>

        {/* Form Section */}
        <Card className="p-8 mb-12 border-2 border-primary/20 bg-card">
          <h3 className="text-2xl font-serif mb-6 text-foreground flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            Envie sua Pergunta
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Nome *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu.email@example.com"
                  className="w-full"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Sua Pergunta *
              </label>
              <Textarea
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Descreva sua dúvida sobre oftalmologia, glaucoma, catarata ou qualquer outro tema relacionado à saúde ocular..."
                className="w-full min-h-32 resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full uppercase tracking-wider font-semibold"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Pergunta
            </Button>
          </form>
        </Card>

        {/* Questions List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif text-foreground mb-6">
            Perguntas e Respostas
          </h3>

          {questions.length === 0 ? (
            <Card className="p-8 text-center bg-card">
              <p className="text-muted-foreground">
                Nenhuma pergunta ainda. Seja o primeiro a fazer uma pergunta!
              </p>
            </Card>
          ) : (
            questions.map(q => (
              <Card key={q.id} className="p-6 bg-card hover:shadow-lg transition-shadow border border-border">
                {/* Question Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{q.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(q.date)}
                    </p>
                  </div>
                  {q.answered && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      Respondida
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <p className="text-foreground mb-4 leading-relaxed">
                  {q.question}
                </p>

                {/* Answer Section */}
                {q.answered && q.answer && (
                  <div className="bg-primary/5 border-l-4 border-primary p-4 mb-4 rounded">
                    <p className="text-sm font-semibold text-primary mb-2">
                      Resposta do Dr. Gilson Menezes
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">
                      {q.answer}
                    </p>
                    {q.answerDate && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDate(q.answerDate)}
                      </p>
                    )}
                  </div>
                )}

                {/* Like Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(q.id)}
                    className={`flex items-center gap-1 px-3 py-2 rounded transition-colors ${
                      likedQuestions.has(q.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={likedQuestions.has(q.id) ? 'currentColor' : 'none'}
                    />
                    <span className="text-sm font-medium">{q.likes}</span>
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
