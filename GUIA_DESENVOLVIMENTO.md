# Guia de Desenvolvimento: Atualizando seu Site Localmente

## 📋 Índice
1. [Configuração Inicial](#configuração-inicial)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Tarefas Comuns](#tarefas-comuns)
4. [Troubleshooting](#troubleshooting)

---

## 🔧 Configuração Inicial

### Pré-requisitos

Você precisa ter instalado:
- **Node.js** (versão 16+) - Download em https://nodejs.org/
- **Git** - Download em https://git-scm.com/
- Um editor de código (recomendamos **VS Code** em https://code.visualstudio.com/)

### Primeiros Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/USERNAME/gilsonmenezesoftalmo.git
   cd gilsonmenezesoftalmo
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Abra no navegador**:
   - Acesse http://localhost:5173
   - O site recarregará automaticamente quando você fizer alterações

---

## 📁 Estrutura do Projeto

```
vis-o-premium-main/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.tsx       # Menu de navegação
│   │   ├── Hero.tsx         # Seção inicial
│   │   ├── Blog.tsx         # Página de dúvidas ⭐ NOVO
│   │   ├── Contato.tsx      # Seção de contato
│   │   ├── Footer.tsx       # Rodapé
│   │   └── ui/              # Componentes de UI (botões, cards, etc)
│   ├── pages/
│   │   └── Index.tsx        # Página principal
│   ├── lib/
│   │   └── contact.ts       # Informações de contato centralizadas
│   ├── assets/              # Imagens
│   └── App.tsx              # Arquivo principal
├── public/                  # Arquivos públicos (favicon, etc)
├── index.html               # HTML principal
├── tailwind.config.ts       # Configuração de estilos
├── vite.config.ts           # Configuração do build
├── package.json             # Dependências do projeto
└── netlify.toml             # Configuração do Netlify
```

---

## 🛠️ Tarefas Comuns

### 1. Editar Informações de Contato

**Arquivo**: `src/lib/contact.ts`

```typescript
export const CONTACT = {
  whatsapp: {
    number: '+5531995324400',  // Seu número do WhatsApp
    message: 'Olá! Gostaria de agendar uma consulta...',
    displayNumber: '+55 (31) 99532-4400',
  },
  email: 'seu.email@gmail.com',
  instagram: 'https://www.instagram.com/seu-usuario',
  linkedin: 'https://www.linkedin.com/in/seu-usuario',
  doctoralia: 'https://www.doctoralia.com.br/seu-perfil',
};
```

### 2. Adicionar Perguntas ao Blog

**Arquivo**: `src/components/Blog.tsx`

Encontre o array `questions` e adicione um novo objeto:

```typescript
const [questions, setQuestions] = useState<Question[]>([
  // ... perguntas existentes
  {
    id: '3',
    name: 'Seu Nome',
    email: 'email@example.com',
    question: 'Sua pergunta aqui?',
    date: '2024-01-06',
    likes: 0,
    answered: true,
    answer: 'Resposta do Dr. Gilson',
    answerDate: '2024-01-06',
  },
]);
```

### 3. Mudar Cores do Site

**Arquivo**: `tailwind.config.ts`

Procure pela seção `colors` e edite:

```typescript
colors: {
  primary: '#1a1a1a',      // Cor principal
  secondary: '#f5f5f5',    // Cor secundária
  gold: '#d4af37',         // Cor destaque
  // ... outras cores
}
```

### 4. Editar Textos da Página

Os textos estão em vários componentes:
- **Hero**: `src/components/Hero.tsx`
- **Especialidades**: `src/components/Especialidades.tsx`
- **Tecnologia**: `src/components/Tecnologia.tsx`
- **Contato**: `src/components/Contato.tsx`

Abra o arquivo e edite os textos diretamente.

### 5. Adicionar Novas Imagens

1. Coloque a imagem em `src/assets/`
2. Importe no componente:
   ```typescript
   import minhaImagem from '@/assets/minha-imagem.jpg';
   ```
3. Use no HTML:
   ```typescript
   <img src={minhaImagem} alt="Descrição" />
   ```

### 6. Criar uma Nova Página

1. Crie um arquivo em `src/pages/NovaPage.tsx`:
   ```typescript
   const NovaPage = () => {
     return (
       <div>
         <h1>Minha Nova Página</h1>
       </div>
     );
   };
   export default NovaPage;
   ```

2. Adicione a rota em `src/App.tsx`:
   ```typescript
   <Route path="/nova-pagina" element={<NovaPage />} />
   ```

---

## 🚀 Publicar Alterações

Depois de fazer alterações locais:

```bash
# 1. Verifique as mudanças
git status

# 2. Adicione os arquivos alterados
git add .

# 3. Crie um commit com mensagem descritiva
git commit -m "Descrição clara da mudança"

# 4. Envie para o GitHub
git push

# ✅ Pronto! O Netlify detectará e atualizará automaticamente
```

---

## 🐛 Troubleshooting

### Erro: "npm: command not found"
- **Solução**: Instale Node.js em https://nodejs.org/

### Erro: "Cannot find module"
- **Solução**: Execute `npm install` novamente

### Site não atualiza após push
- **Solução**: Aguarde 2-3 minutos e recarregue a página
- Verifique o status em https://app.netlify.com/

### Porta 5173 já está em uso
- **Solução**: Execute `npm run dev -- --port 3000`

### Mudanças locais não aparecem
- **Solução**: Pressione `Ctrl+Shift+R` para limpar cache do navegador

---

## 📚 Recursos Úteis

- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **shadcn/ui**: https://ui.shadcn.com/
- **Vite**: https://vitejs.dev/

---

## 💡 Dicas

1. **Sempre faça commits pequenos** com mensagens claras
2. **Teste localmente** antes de fazer push
3. **Use `git log`** para ver o histórico de mudanças
4. **Mantenha o código organizado** em componentes pequenos
5. **Comente o código** quando necessário

---

**Última atualização**: Janeiro 2026
