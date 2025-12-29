# Guia de Deploy - Imobiliária Dernival Fontes

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes
- Conta em serviço de hospedagem (Vercel, Netlify, GitHub Pages)

## 🚀 Deploy Rápido

### Opção 1: Vercel (Recomendado) ✅

O projeto está **totalmente configurado** para deploy no Vercel!

#### Deploy via Interface Web (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em "Add New Project" ou "Import Project"
3. Selecione o repositório `Dfontes`
4. Clique em "Import"
5. As configurações serão detectadas automaticamente:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Clique em "Deploy"
7. Pronto! Seu site estará no ar em ~1 minuto

**URL de produção**: `https://dfontes.vercel.app` (ou domínio customizado)

#### Deploy via CLI

1. Instale o Vercel CLI:
```bash
npm install -g vercel
```

2. Faça login (primeira vez apenas):
```bash
vercel login
```

3. Deploy para preview:
```bash
vercel
```

4. Deploy para produção:
```bash
vercel --prod
```

**Configurações automáticas:**
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`
- ✅ Framework Detection: Vite
- ✅ Node.js Version: Detectado automaticamente
- ✅ Environment: `VERCEL=1` (configurado automaticamente)

#### Configuração de Domínio Personalizado

1. No dashboard do Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio (ex: `dernivalfontes.com.br`)
3. Siga as instruções para configurar DNS
4. HTTPS será configurado automaticamente

#### Deploy Automático via Git

Depois do primeiro deploy:
- ✅ Push para `main` → Deploy automático em produção
- ✅ Pull Requests → Deploy de preview automático
- ✅ Outras branches → Deploy de preview
- ✅ Rollback instantâneo se necessário

### Opção 2: Netlify

1. Build local:
```bash
npm run build
```

2. Arraste a pasta `dist` para [Netlify Drop](https://app.netlify.com/drop)

**OU use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Opção 3: GitHub Pages (Configurado) ✅

Este projeto está configurado para deploy automático via GitHub Actions!

**Deploy Automático:**
1. Faça push para a branch `main`:
```bash
git push origin main
```

2. O GitHub Actions irá automaticamente:
   - Instalar dependências
   - Fazer build do projeto
   - Fazer deploy para GitHub Pages

3. Acesse: `https://rafaelraas.github.io/Dfontes`

**Configuração já incluída:**
- ✅ Workflow GitHub Actions (`.github/workflows/deploy.yml`)
- ✅ Base path configurado no `vite.config.js`
- ✅ Scripts de deploy no `package.json`
- ✅ Homepage configurada

**Deploy Manual (alternativa):**
```bash
npm run deploy
```

**Nota:** Para ativar GitHub Pages pela primeira vez:
1. Vá em Settings → Pages no repositório
2. Em "Source", selecione "GitHub Actions"

## 🔧 Configurações Importantes

### Domínio Personalizado

Após o deploy, configure:

1. **DNS**: Aponte seu domínio para o serviço de hospedagem
2. **HTTPS**: Certifique-se de que SSL está ativo
3. **SEO**: Atualize as URLs no `index.html` com seu domínio real

### Variáveis de Ambiente

Se adicionar backend no futuro, crie arquivo `.env`:
```
VITE_API_URL=https://api.dernivalfontes.com.br
```

## 📊 Monitoramento

Recomendações após deploy:

1. **Google Analytics**: Adicione tracking code
2. **Google Search Console**: Registre o site
3. **Google My Business**: Configure perfil da imobiliária
4. **Facebook Pixel**: Para anúncios futuros

## 🔄 Atualizações

Para atualizar o site:

```bash
# 1. Faça suas alterações
# 2. Teste localmente
npm run dev

# 3. Build
npm run build

# 4. Deploy
vercel --prod  # ou o comando do seu serviço
```

## ⚡ Performance

Site já otimizado com:
- ✅ Minificação automática
- ✅ Code splitting
- ✅ Assets comprimidos
- ✅ Cache headers configurados

## 🎨 Próximos Passos

1. Adicione a identidade visual real
2. Substitua imagens placeholder por fotos reais
3. Configure formulário de contato com backend
4. Adicione mais imóveis ao portfólio
5. Configure Google Maps para localização
6. Adicione galeria de fotos para cada imóvel

## 📞 Suporte

Para dúvidas sobre deploy ou customizações, consulte:
- [Documentação Vite](https://vitejs.dev/guide/static-deploy.html)
- [React Documentation](https://react.dev/)
