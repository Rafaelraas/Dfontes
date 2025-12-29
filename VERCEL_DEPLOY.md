# 🚀 Guia Rápido de Deploy no Vercel

## Opção 1: Deploy via Interface Web (Recomendado)

### Passo a Passo:

1. **Acesse o Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub

2. **Importe o Projeto**
   - Clique em "Add New" → "Project"
   - Selecione o repositório `Rafaelraas/Dfontes`
   - Clique em "Import"

3. **Configure o Projeto**
   - As configurações serão detectadas automaticamente do `vercel.json`
   - **Framework**: Vite (detectado automaticamente)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   
4. **Deploy**
   - Clique em "Deploy"
   - Aguarde ~1 minuto
   - Seu site estará no ar! 🎉

### URL Padrão
Seu site será disponibilizado em:
- `https://dfontes.vercel.app`
- Ou `https://dfontes-[hash].vercel.app`

## Opção 2: Deploy via CLI

### Instalação

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel
```

### Primeiro Deploy

```bash
# 1. Entre no diretório do projeto
cd Dfontes

# 2. Faça login no Vercel
vercel login

# 3. Deploy (preview)
vercel

# 4. Deploy para produção
vercel --prod
```

### Deploys Subsequentes

```bash
# Deploy de preview (para testes)
vercel

# Deploy para produção
vercel --prod
```

## ⚙️ Configurações Automáticas

O projeto já está configurado com:

✅ **vercel.json** - Configuração completa
✅ **vite.config.js** - Base path automático
✅ **.vercelignore** - Otimização de build
✅ **SPA Routing** - Todas as rotas funcionam
✅ **Cache Headers** - Performance otimizada

## 🌐 Domínio Personalizado

### Adicionar Domínio

1. No dashboard do Vercel, selecione seu projeto
2. Vá em "Settings" → "Domains"
3. Clique em "Add"
4. Digite seu domínio (ex: `dernivalfontes.com.br`)
5. Siga as instruções para configurar DNS

### Configuração DNS

Adicione um dos seguintes registros no seu provedor DNS:

**Opção A - CNAME (Recomendado para subdomínios):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Opção B - A Record (Para domínio raiz):**
```
Type: A
Name: @
Value: 76.76.21.21
```

### HTTPS
- Certificado SSL é configurado automaticamente
- Renovação automática
- Força HTTPS por padrão

## 🔄 Deploy Automático

Após o primeiro deploy, o Vercel automaticamente:

✅ **Push para main** → Deploy em produção
✅ **Pull Request** → Deploy de preview
✅ **Outras branches** → Deploy de preview

### URLs de Preview
Cada PR receberá uma URL única:
- `https://dfontes-git-[branch]-[user].vercel.app`

## 📊 Monitoramento

### Analytics
No dashboard do Vercel:
- Visualize tráfego em tempo real
- Tempo de carregamento
- Origem dos visitantes

### Logs
- Acesse logs de build
- Veja erros em tempo real
- Monitore performance

## 🔧 Troubleshooting

### Build Falha

```bash
# Teste local primeiro
npm run build

# Se funcionar local, limpe cache no Vercel:
# Dashboard → Settings → General → Clear Build Cache
```

### Rotas 404

As rotas são tratadas automaticamente pelo `vercel.json`.
Se encontrar 404, verifique a configuração de `rewrites`.

### Assets não Carregam

Verifique se o build foi bem-sucedido:
```bash
npm run build
ls dist/  # Deve conter index.html e assets/
```

## 🎯 Próximos Passos

Após o deploy:

1. ✅ Teste o site em produção
2. ✅ Configure domínio personalizado
3. ✅ Ative Analytics no Vercel
4. ✅ Configure variáveis de ambiente (se necessário)
5. ✅ Adicione badges de status ao README

## 📞 Suporte

- **Documentação Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Status do Serviço**: [vercel-status.com](https://www.vercel-status.com/)
- **Suporte**: [vercel.com/support](https://vercel.com/support)

## 🎉 Vantagens do Vercel

- ⚡ Deploy em ~1 minuto
- 🌍 CDN global automático
- 🔒 HTTPS gratuito e automático
- 🔄 Rollback com um clique
- 📊 Analytics integrado
- 🎨 Preview de PRs
- 💰 Plano gratuito generoso
- 🚀 Zero configuração necessária

---

**Pronto!** Seu site estará no ar em menos de 5 minutos! 🚀
