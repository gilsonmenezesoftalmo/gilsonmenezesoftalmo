# Guia Completo: Publicar seu Site no Netlify com Domínio Personalizado

## 📋 Sumário
1. [Preparação Inicial](#preparação-inicial)
2. [Publicar no Netlify](#publicar-no-netlify)
3. [Conectar Domínio Personalizado](#conectar-domínio-personalizado)
4. [Atualizar o Site](#atualizar-o-site)
5. [Dúvidas Frequentes](#dúvidas-frequentes)

---

## 🚀 Preparação Inicial

Antes de começar, você precisa ter:

- ✅ Uma conta no GitHub (gratuita em https://github.com)
- ✅ Uma conta no Netlify (gratuita em https://netlify.com)
- ✅ Acesso ao painel de controle do seu domínio (Registro.br)

---

## 📤 Publicar no Netlify

### Passo 1: Criar um Repositório no GitHub

1. Acesse https://github.com/new
2. Preencha os dados:
   - **Repository name**: `gilsonmenezesoftalmo` (ou outro nome que preferir)
   - **Description**: "Site do Dr. Gilson Menezes - Oftalmologia"
   - **Public** (deixe selecionado)
3. Clique em **Create repository**

### Passo 2: Enviar o Projeto para GitHub

Abra o terminal no computador (ou use Git Bash no Windows) e execute:

```bash
# Navegue até a pasta do projeto
cd caminho/para/vis-o-premium-main

# Adicione o repositório remoto (substitua USERNAME pelo seu usuário do GitHub)
git remote add origin https://github.com/USERNAME/gilsonmenezesoftalmo.git

# Envie o código para o GitHub
git branch -M main
git push -u origin main
```

### Passo 3: Conectar ao Netlify

1. Acesse https://netlify.com e faça login
2. Clique em **Add new site** → **Import an existing project**
3. Selecione **GitHub** como provedor
4. Autorize o Netlify a acessar seus repositórios
5. Selecione o repositório `gilsonmenezesoftalmo`
6. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Clique em **Deploy site**

**Pronto!** Seu site estará online em um URL como: `https://seu-site-randomico.netlify.app`

---

## 🌐 Conectar Domínio Personalizado

### Passo 1: Configurar no Netlify

1. No painel do Netlify, vá para **Site settings** → **Domain management**
2. Clique em **Add custom domain**
3. Digite seu domínio: `gilsonmenezesoftalmo.com.br`
4. Clique em **Verify**
5. O Netlify mostrará um aviso sobre DNS. Clique em **Check DNS configuration**

### Passo 2: Configurar DNS no Registro.br

1. Acesse https://registro.br/login/
2. Faça login com suas credenciais
3. Vá para **Meus Domínios** → Selecione seu domínio
4. Clique em **Editar zona de DNS**
5. **Remova** todos os registros existentes (A, MX, etc.)
6. **Adicione** os registros que o Netlify forneceu:

   O Netlify mostrará algo como:
   ```
   Nome do Host: @
   Tipo: A
   Valor: 75.2.60.5
   
   Nome do Host: www
   Tipo: CNAME
   Valor: seu-site-randomico.netlify.app
   ```

7. Salve as alterações

### Passo 3: Aguardar Propagação

- A propagação pode levar de **5 minutos a 48 horas**
- Você pode verificar o status em: https://www.whatsmydns.net/
- Digite seu domínio e verifique se o DNS foi atualizado

**Pronto!** Seu site estará acessível em `https://gilsonmenezesoftalmo.com.br`

---

## 🔄 Atualizar o Site

Sempre que você quiser fazer alterações:

### Opção 1: Via Terminal (Recomendado)

```bash
# 1. Faça as alterações nos arquivos
# 2. Navegue até a pasta do projeto
cd caminho/para/vis-o-premium-main

# 3. Adicione as mudanças
git add .

# 4. Crie um commit com uma mensagem descritiva
git commit -m "Descrição da alteração"

# 5. Envie para o GitHub
git push

# Pronto! O Netlify detectará as mudanças e atualizará automaticamente
```

### Opção 2: Editar Diretamente no GitHub

1. Acesse seu repositório em https://github.com/USERNAME/gilsonmenezesoftalmo
2. Navegue até o arquivo que quer editar
3. Clique no ícone de lápis (Edit)
4. Faça as alterações
5. Clique em **Commit changes**
6. O Netlify atualizará automaticamente

---

## ❓ Dúvidas Frequentes

### P: Quanto custa?
**R:** Tudo é gratuito! GitHub, Netlify e o domínio você já comprou.

### P: Quanto tempo leva para o site aparecer?
**R:** Geralmente 2-3 minutos após fazer o push no GitHub.

### P: Como adiciono novas páginas?
**R:** Crie um novo arquivo `.tsx` em `src/pages/` e adicione a rota em `src/App.tsx`.

### P: Como mudo as cores do site?
**R:** Edite o arquivo `tailwind.config.ts` na raiz do projeto.

### P: Como adiciono mais dúvidas ao Blog?
**R:** Edite o arquivo `src/components/Blog.tsx` e adicione mais itens ao array `questions`.

### P: E se o domínio não funcionar?
**R:** Verifique:
1. Se o DNS foi propagado em https://www.whatsmydns.net/
2. Se os registros estão corretos no Registro.br
3. Se o certificado SSL foi gerado (Netlify faz automaticamente)

### P: Como faço backup do meu site?
**R:** Tudo está no GitHub! Você tem um backup automático.

### P: Posso usar outro provedor de hospedagem?
**R:** Sim! Você pode usar Vercel, GitHub Pages, ou qualquer outro. O processo é similar.

---

## 📞 Suporte

Se tiver dúvidas:
- Contato: gilsonmenezesoftalmo@gmail.com
- WhatsApp: +55 (31) 99532-4400

---

**Última atualização**: Janeiro 2026
