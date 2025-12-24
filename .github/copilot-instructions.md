# GitHub Copilot Instructions - Dfontes (Dernival Fontes Imobiliária)

> 💡 **Guia Rápido**: Para referência rápida de código e snippets comuns, veja [COPILOT_QUICK_REFERENCE.md](./COPILOT_QUICK_REFERENCE.md)

## 📋 Visão Geral do Projeto

Este é um SPA (Single Page Application) moderno para a **Imobiliária Dernival Fontes**, especializada em imóveis em Natal e Grande Natal no Rio Grande do Norte. O site foi desenvolvido com foco em:

- Performance otimizada com Vite
- SEO e GEO otimizados para Natal/RN
- Interface responsiva e acessível
- Integração preparada para AI Agents
- Sistema CMS básico para gerenciamento de imóveis

## 🏗️ Arquitetura e Stack Tecnológico

### Core Technologies
- **React 19.2**: Biblioteca JavaScript para UI
- **Vite 7.2**: Build tool moderna e rápida
- **CSS3**: Estilização com variáveis CSS e animações
- **JavaScript ES6+**: Código moderno sem TypeScript

### Estrutura de Diretórios
```
/
├── .github/
│   └── workflows/deploy.yml    # GitHub Actions para deploy automático
├── public/
│   └── favicon.svg             # Ícone do site
├── src/
│   ├── components/             # Componentes React
│   │   ├── Header.jsx         # Navegação principal
│   │   ├── Hero.jsx           # Seção hero/banner
│   │   ├── About.jsx          # Sobre a imobiliária
│   │   ├── Properties.jsx     # Listagem de imóveis
│   │   ├── PropertyDetails.jsx # Detalhes do imóvel
│   │   ├── Contact.jsx        # Formulário de contato
│   │   ├── Footer.jsx         # Rodapé
│   │   ├── Admin.jsx          # Painel administrativo
│   │   ├── PropertyManager.jsx # Gerenciador de imóveis
│   │   └── ClientManager.jsx  # Gerenciador de clientes
│   ├── constants/
│   │   └── companyInfo.js     # Constantes da empresa
│   ├── utils/
│   │   ├── propertyHelpers.js # Utilidades para imóveis
│   │   ├── dataExport.js      # Exportação de dados
│   │   └── storage.js         # Persistência localStorage
│   ├── examples/
│   │   └── aiAgentIntegration.js # Exemplos de integração AI
│   ├── App.jsx                # Componente raiz
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos globais
├── index.html                 # HTML com SEO tags
├── vite.config.js             # Configuração Vite
└── package.json               # Dependências
```

## 🎨 Padrões de Código e Convenções

### Estilo de Código JavaScript/React

1. **Componentes Funcionais**: Sempre use function components com hooks
   ```javascript
   function ComponentName() {
     const [state, setState] = useState(initialValue)
     return <div>...</div>
   }
   ```

2. **Imports**: Ordem de imports
   ```javascript
   // 1. React e hooks
   import { useState, useEffect } from 'react'
   
   // 2. Componentes externos
   import ExternalComponent from 'library'
   
   // 3. Componentes internos
   import MyComponent from './components/MyComponent'
   
   // 4. Utils e helpers
   import { helperFunction } from './utils/helpers'
   
   // 5. Constantes
   import { CONSTANT } from './constants/constants'
   
   // 6. Estilos (sempre por último)
   import './Component.css'
   ```

3. **Nomenclatura**:
   - Componentes: PascalCase (`PropertyCard`, `ContactForm`)
   - Funções/variáveis: camelCase (`handleSubmit`, `propertyData`)
   - Constantes: UPPER_SNAKE_CASE (`COMPANY_INFO`, `STORAGE_KEYS`)
   - Arquivos CSS: Correspondem ao componente (`Header.jsx` → `Header.css`)

4. **Props**: Sempre desestruture props no parâmetro da função
   ```javascript
   function MyComponent({ title, description, onAction }) {
     // usar title, description, onAction diretamente
   }
   ```

5. **Event Handlers**: Prefixo `handle` para funções de evento
   ```javascript
   const handleClick = () => { ... }
   const handleSubmit = (e) => { e.preventDefault(); ... }
   const handleChange = (e) => { ... }
   ```

### Estilo CSS

1. **Variáveis CSS**: Definidas em `src/index.css`
   ```css
   :root {
     --primary-color: #2c3e50;
     --secondary-color: #3498db;
     --text-color: #333;
     --bg-color: #ffffff;
   }
   ```

2. **Classes CSS**: kebab-case
   ```css
   .property-card { }
   .hero-section { }
   .contact-form { }
   ```

3. **Responsividade**: Mobile-first approach
   ```css
   /* Mobile padrão */
   .element { }
   
   /* Tablet e acima */
   @media (min-width: 768px) { }
   
   /* Desktop e acima */
   @media (min-width: 1024px) { }
   ```

4. **Animações**: Use transitions suaves
   ```css
   transition: all 0.3s ease;
   ```

## 📦 Estrutura de Dados

### Schema de Imóvel (Property)

```javascript
{
  id: Number,              // Identificador único
  type: String,            // "Apartamento", "Casa", "Terreno"
  location: String,        // "Bairro - Cidade/Estado" (ex: "Ponta Negra - Natal/RN")
  bedrooms: Number,        // Número de quartos (0 para terrenos)
  bathrooms: Number,       // Número de banheiros (0 para terrenos)
  area: Number,            // Área em m²
  price: String,           // Formato: "R$ 450.000" ou "R$ 450.000,50"
  featured: Boolean,       // Se é imóvel em destaque
  status: String,          // "available", "pending", "sold", "rented"
  description: String      // Descrição detalhada do imóvel
}
```

### Schema de Cliente (Client)

```javascript
{
  id: Number,              // Identificador único (auto-gerado)
  name: String,            // Nome completo
  email: String,           // Email (validado)
  phone: String,           // Telefone formato: "(84) 99999-9999"
  message: String,         // Mensagem/interesse
  propertyId: Number,      // (Opcional) ID do imóvel de interesse
  createdAt: String        // ISO date string
}
```

### Informações da Empresa (COMPANY_INFO)

Sempre use `COMPANY_INFO` de `/src/constants/companyInfo.js` - **NUNCA** hardcode informações da empresa:

```javascript
import { COMPANY_INFO } from '../constants/companyInfo'

// ✅ CORRETO
<a href={COMPANY_INFO.contact.phoneLink}>{COMPANY_INFO.contact.phone}</a>

// ❌ INCORRETO - não hardcode
<a href="tel:+558499999999">(84) 9999-9999</a>
```

## 🛠️ Funções Utilitárias Importantes

### propertyHelpers.js

**Funções de Preço**:
```javascript
import { parsePriceToNumber, formatPrice } from './utils/propertyHelpers'

const numericPrice = parsePriceToNumber('R$ 450.000')  // 450000
const formattedPrice = formatPrice(450000)              // "R$ 450.000"
```

**Filtros e Busca**:
```javascript
import { filterProperties, searchProperties, matchProperties } from './utils/propertyHelpers'

// Filtrar por critérios
const filtered = filterProperties(properties, {
  type: 'Apartamento',
  minBedrooms: 3,
  maxPrice: 500000,
  city: 'Natal'
})

// Busca por texto
const results = searchProperties(properties, 'ponta negra')

// Match com score de compatibilidade (0-100%)
const matches = matchProperties(properties, {
  type: 'Casa',
  bedrooms: 4,
  maxPrice: 700000,
  city: 'Natal'
})
```

**Estatísticas**:
```javascript
import { getPropertyStats } from './utils/propertyHelpers'

const stats = getPropertyStats(properties)
// { total, byType, byCity, avgPrice, priceRange, avgArea }
```

### storage.js

**Gerenciamento de Dados**:
```javascript
import { getProperties, saveProperty, deleteProperty } from './utils/storage'

// Carregar imóveis (do localStorage ou padrão)
const properties = getProperties()

// Salvar/atualizar imóvel
const saved = saveProperty(propertyData)  // Auto-gera ID se novo

// Deletar imóvel
deleteProperty(propertyId)
```

### dataExport.js

**Exportação de Dados**:
```javascript
import { 
  exportPropertiesAsJSON, 
  exportPropertiesAsCSV, 
  exportPropertiesAsText,
  exportPropertiesForNLP 
} from './utils/dataExport'

// JSON estruturado
const jsonData = exportPropertiesAsJSON(properties)

// CSV para planilhas
const csvData = exportPropertiesAsCSV(properties)

// Texto simples
const textData = exportPropertiesAsText(properties)

// Otimizado para NLP/AI
const nlpData = exportPropertiesForNLP(properties)
```

## 🎯 Padrões de Componentes

### Estrutura Básica de Componente

```javascript
import { useState, useEffect } from 'react'
import './ComponentName.css'

function ComponentName({ prop1, prop2, onAction }) {
  // 1. State declarations
  const [state, setState] = useState(initialValue)
  
  // 2. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies])
  
  // 3. Event handlers
  const handleEvent = () => {
    // handler logic
  }
  
  // 4. Render helpers (se necessário)
  const renderItem = (item) => {
    return <div key={item.id}>{item.name}</div>
  }
  
  // 5. Return JSX
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

### Acessibilidade (A11y)

**Sempre inclua**:
1. **ARIA labels** para elementos interativos
2. **Semantic HTML** (header, nav, main, section, footer)
3. **Alt text** para imagens
4. **Labels** para inputs de formulário
5. **Keyboard navigation** suporte

```javascript
// ✅ Bom exemplo
<button 
  aria-label="Enviar formulário de contato"
  onClick={handleSubmit}
>
  Enviar
</button>

<img 
  src={image} 
  alt="Apartamento de 3 quartos em Ponta Negra" 
/>

<input
  type="email"
  id="email"
  aria-required="true"
  aria-describedby="email-help"
/>
```

### Validação de Formulários

**Email Validation**:
```javascript
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

**Phone Validation** (formato brasileiro):
```javascript
const validatePhone = (phone) => {
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/
  return phoneRegex.test(phone)
}
```

**Exemplo Completo**:
```javascript
const handleSubmit = (e) => {
  e.preventDefault()
  
  // Validar campos
  if (!name.trim()) {
    alert('Por favor, preencha seu nome')
    return
  }
  
  if (!validateEmail(email)) {
    alert('Por favor, insira um email válido')
    return
  }
  
  if (!validatePhone(phone)) {
    alert('Por favor, insira um telefone válido no formato (84) 99999-9999')
    return
  }
  
  // Processar submissão
  // ...
}
```

## 🚀 Build, Test e Deploy

### Comandos Disponíveis

```bash
# Desenvolvimento local
npm run dev          # Inicia servidor em http://localhost:3000

# Build para produção
npm run build        # Gera pasta dist/

# Preview do build
npm run preview      # Preview da build de produção

# Deploy manual (GitHub Pages)
npm run deploy       # Build + deploy para gh-pages
```

### CI/CD

- **Deploy Automático**: Push para `main` → GitHub Actions → GitHub Pages
- **URL de Produção**: https://rafaelraas.github.io/Dfontes
- **Base Path**: `/Dfontes/` (configurado em vite.config.js)

### Importante para Deploy

Ao adicionar assets ou links, considere o base path:
```javascript
// ✅ CORRETO - path relativo
<img src="./assets/image.png" />

// ✅ CORRETO - usando import
import image from './assets/image.png'
<img src={image} />

// ❌ INCORRETO - path absoluto sem base
<img src="/assets/image.png" />
```

## 🤖 Integração com AI Agents

### Documentação Disponível

Consulte sempre:
- **README_AI_AGENT.md**: Guia completo para AI agents
- **AI_AGENT_IMPROVEMENTS.md**: Melhorias implementadas
- **src/examples/aiAgentIntegration.js**: Exemplos práticos

### Padrões de Integração

**Classe PropertyAIAgent**:
```javascript
import { PropertyAIAgent } from './examples/aiAgentIntegration'

const agent = new PropertyAIAgent(properties)
const response = agent.processInquiry("Quero apartamento 3 quartos em Natal")
// Retorna: { matches, message, hasResults }
```

**Matching Inteligente**:
```javascript
import { matchProperties } from './utils/propertyHelpers'

const matches = matchProperties(properties, customerPreferences)
// Retorna array com matchScore (0-100%) ordenado
```

## 📝 Boas Práticas de Desenvolvimento

### Ao Adicionar Novos Recursos

1. **Mantenha Consistência**: Siga os padrões existentes
2. **Componentize**: Crie componentes reutilizáveis
3. **Documente**: Adicione JSDoc para funções complexas
4. **Teste Localmente**: Sempre teste com `npm run dev`
5. **Build antes de Commit**: Verifique com `npm run build`

### Ao Modificar Dados

1. **Use storage.js**: Não manipule localStorage diretamente
2. **Valide Schema**: Certifique-se que dados seguem o schema
3. **Preserve IDs**: Nunca altere IDs de entidades existentes
4. **Backup Default**: DEFAULT_PROPERTIES em storage.js é o backup

### Ao Modificar Estilos

1. **Use Variáveis CSS**: Para cores, espaçamentos, etc.
2. **Mobile First**: Comece com mobile, adicione media queries
3. **Evite !important**: Organize especificidade corretamente
4. **Teste Responsividade**: Verifique mobile, tablet, desktop

### Ao Trabalhar com Formulários

1. **Sempre Valide**: Cliente e servidor (quando implementado)
2. **Feedback Claro**: Mensagens de erro em português claro
3. **Prevenção**: `e.preventDefault()` em onSubmit
4. **Acessibilidade**: Labels, ARIA, required attributes

## 🔒 Segurança

### Práticas Implementadas

1. **Input Validation**: Todos os formulários validam input
2. **XSS Prevention**: React auto-escapa output
3. **No Sensitive Data**: Sem dados sensíveis no código
4. **HTTPS Only**: Deploy configurado para HTTPS

### Ao Adicionar Backend (Futuro)

1. **CORS**: Configure corretamente
2. **Rate Limiting**: Implemente para APIs
3. **Authentication**: Use tokens, não cookies simples
4. **Sanitization**: Valide/sanitize todo input do usuário

## 🌍 Localização (pt-BR)

### Formatação

- **Moeda**: R$ 450.000 ou R$ 450.000,50 (vírgula para centavos)
- **Números**: 1.000.000 (ponto para milhares)
- **Telefone**: (84) 99999-9999
- **CEP**: 59152-280
- **Data**: DD/MM/YYYY

### Linguagem

- **Tom**: Formal mas amigável
- **Pronome**: "você" (informal formal)
- **Termos Técnicos**: Use termos de mercado imobiliário BR
  - "Imóvel" (não "propriedade")
  - "Apartamento" (não "flat")
  - "Terreno" (não "lote")
  - "m²" para área
  - "CRECI" para registro

## 📍 Informações Geográficas

### Áreas de Atuação

**Primária (Grande Natal)**:
- Natal (capital)
- Parnamirim
- São Gonçalo do Amarante
- Macaíba
- Extremoz

**Bairros Importantes em Natal**:
- Ponta Negra (praia, turístico, alto valor)
- Lagoa Nova (central, comercial)
- Candelária (residencial estabelecido)
- Tirol (nobre, central, premium)
- Capim Macio (crescimento, boa infraestrutura)

### Contexto Local

- **Estado**: Rio Grande do Norte (RN)
- **Clima**: Tropical (quente ano todo)
- **Economia**: Turismo, comércio, serviços
- **Coordenadas**: -5.795000, -35.209444

## 🆘 Troubleshooting Comum

### Build Falha

```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### LocalStorage Issues

```javascript
// Resetar dados para padrão
localStorage.removeItem('dfontes_properties')
localStorage.removeItem('dfontes_clients')
// Recarregar página
```

### Estilos Não Aplicados

1. Verifique imports CSS no componente
2. Verifique especificidade CSS
3. Limpe cache do browser
4. Verifique se há conflitos de nomes de classes

### Deploy não Atualiza

1. Verifique se build foi bem-sucedida
2. Verifique GitHub Actions logs
3. Limpe cache do browser (Ctrl+Shift+R)
4. Aguarde alguns minutos (CDN cache)

## 💡 Dicas para GitHub Copilot

### Para Gerar Componentes Melhores

**Use comentários descritivos**:
```javascript
// Componente para exibir card de imóvel com imagem, info básica e botão de detalhes
// Props: property (objeto com schema Property), onClick (função)
// Deve ser responsivo e acessível
function PropertyCard({ property, onClick }) {
  // Copilot vai gerar código seguindo os padrões
}
```

### Para Gerar Funções Úteis

**Descreva bem a função**:
```javascript
/**
 * Converte coordenadas geográficas para link do Google Maps
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {string} URL do Google Maps
 */
function getGoogleMapsLink(lat, lng) {
  // Copilot vai gerar implementação
}
```

### Para Gerar Estilos

**Comente o que quer**:
```css
/* Card de imóvel com hover effect suave, sombra, border radius 10px */
.property-card {
  /* Copilot vai gerar CSS */
}

/* Responsivo: em mobile, cards ocupam 100% largura */
@media (max-width: 768px) {
  /* Copilot vai gerar media query */
}
```

## 📚 Recursos Adicionais

### Documentação do Projeto

- **README.md**: Visão geral e setup
- **README_AI_AGENT.md**: Integração com AI agents
- **AI_AGENT_IMPROVEMENTS.md**: Resumo de melhorias AI
- **DEPLOYMENT.md**: Guia de deploy
- **FINAL_RECOMMENDATIONS.md**: Recomendações finais

### Links Úteis

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

## ✅ Checklist para PRs

Antes de submeter um PR, verifique:

- [ ] Código segue os padrões estabelecidos
- [ ] Componentes estão devidamente documentados
- [ ] Estilos são responsivos
- [ ] Acessibilidade foi considerada (ARIA, semantic HTML)
- [ ] Formulários têm validação adequada
- [ ] Constantes da empresa usam COMPANY_INFO
- [ ] Build passa sem erros (`npm run build`)
- [ ] Teste manual no navegador
- [ ] Sem console.logs desnecessários
- [ ] Imports organizados corretamente

## 🎓 Convenções Específicas do Projeto

### Sistema CMS (Admin Panel)

- **Atalho**: `Ctrl+K` ou `Cmd+K` para abrir admin
- **Acesso**: Via Footer também
- **Persistência**: localStorage apenas (sem backend ainda)
- **Gerenciamento**: Imóveis e Clientes

### Animações e Transições

- **Duração Padrão**: 0.3s
- **Easing**: `ease` ou `ease-in-out`
- **Hover Effects**: Sempre adicione para elementos clicáveis
- **Scroll Suave**: Implementado no Header

### Performance

- **Lazy Loading**: Considere para imagens (futuro)
- **Code Splitting**: Vite faz automaticamente
- **Minificação**: Automática no build
- **Cache**: Headers configurados no GitHub Pages

---

## 🎯 Resumo Executivo

**Ao desenvolver para este projeto, sempre:**

1. ✅ Siga os padrões de código JavaScript/React estabelecidos
2. ✅ Use COMPANY_INFO para informações da empresa
3. ✅ Use funções utilitárias de propertyHelpers.js e storage.js
4. ✅ Valide formulários com padrões brasileiros
5. ✅ Mantenha acessibilidade (ARIA, semantic HTML)
6. ✅ Escreva CSS mobile-first e responsivo
7. ✅ Teste build antes de commit
8. ✅ Consulte documentação AI para integrações
9. ✅ Mantenha consistência com código existente
10. ✅ Documente código complexo com JSDoc

**Este projeto está pronto para produção e preparado para integração com AI agents para ajudar clientes a encontrar imóveis em Natal e Rio Grande do Norte.**

## 📚 Recursos Adicionais para GitHub Copilot

Para referência rápida enquanto codifica, consulte:
- **[COPILOT_QUICK_REFERENCE.md](./COPILOT_QUICK_REFERENCE.md)**: Snippets, schemas e exemplos de código prontos para uso

---

*Última atualização: Dezembro 2024*
*Versão: 1.0*
