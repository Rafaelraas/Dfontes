# GitHub Copilot - Guia Rápido de Referência

## 🚀 Início Rápido

### Comandos Essenciais

```bash
npm run dev      # Desenvolvimento local (porta 3000)
npm run build    # Build de produção
npm run preview  # Preview do build
```

### Estrutura Básica de Componente

```javascript
import { useState } from 'react'
import './Component.css'

function Component({ prop1, prop2 }) {
  const [state, setState] = useState(null)
  
  const handleAction = () => {
    // lógica
  }
  
  return (
    <div className="component">
      {/* JSX */}
    </div>
  )
}

export default Component
```

## 📊 Schemas de Dados

### Imóvel (Property)

```javascript
{
  id: 1,
  type: 'Apartamento',           // 'Casa', 'Terreno'
  location: 'Ponta Negra - Natal/RN',
  bedrooms: 3,
  bathrooms: 2,
  area: 85,
  price: 'R$ 450.000',
  featured: true,
  status: 'available',           // 'pending', 'sold', 'rented'
  description: 'Descrição do imóvel'
}
```

### Cliente (Client)

```javascript
{
  id: 1,
  name: 'Nome Completo',
  email: 'email@example.com',
  phone: '(84) 99999-9999',
  message: 'Mensagem',
  createdAt: '2024-01-01T00:00:00.000Z'
}
```

## 🛠️ Funções Úteis

### Preços

```javascript
import { parsePriceToNumber, formatPrice } from './utils/propertyHelpers'

parsePriceToNumber('R$ 450.000')  // → 450000
formatPrice(450000)                // → 'R$ 450.000'
```

### Busca e Filtros

```javascript
import { filterProperties, searchProperties, matchProperties } from './utils/propertyHelpers'

// Filtrar
filterProperties(properties, {
  type: 'Apartamento',
  minBedrooms: 3,
  maxPrice: 500000
})

// Buscar texto
searchProperties(properties, 'ponta negra')

// Match com score
matchProperties(properties, customerPreferences)
```

### Armazenamento

```javascript
import { getProperties, saveProperty, deleteProperty } from './utils/storage'

const properties = getProperties()      // Carregar
saveProperty(propertyData)              // Salvar/atualizar
deleteProperty(id)                      // Deletar
```

### Informações da Empresa

```javascript
import { COMPANY_INFO } from './constants/companyInfo'

COMPANY_INFO.contact.phone          // '(84) 9999-9999'
COMPANY_INFO.contact.email          // 'contato@dernivalfontes.com.br'
COMPANY_INFO.address.full           // Endereço completo
COMPANY_INFO.creci                  // CRECI registration
```

## 🎨 Padrões CSS

### Variáveis

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --text-color: #333;
  --bg-color: #ffffff;
}
```

### Classes Comuns

```css
.property-card { }      /* Card de imóvel */
.hero-section { }       /* Seção hero */
.contact-form { }       /* Formulário */
.btn-primary { }        /* Botão primário */
```

### Responsividade

```css
/* Mobile padrão */
.element { }

/* Tablet+ */
@media (min-width: 768px) { }

/* Desktop+ */
@media (min-width: 1024px) { }
```

## ✅ Validação de Formulários

### Email

```javascript
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

### Telefone

```javascript
const validatePhone = (phone) => {
  return /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(phone)
}
```

### Exemplo de Submit

```javascript
const handleSubmit = (e) => {
  e.preventDefault()
  
  if (!name.trim()) {
    alert('Preencha o nome')
    return
  }
  
  if (!validateEmail(email)) {
    alert('Email inválido')
    return
  }
  
  // Processar...
}
```

## 🎯 Acessibilidade

### Sempre Inclua

```javascript
// ARIA labels
<button aria-label="Enviar formulário">Enviar</button>

// Alt text
<img src={img} alt="Apartamento 3 quartos" />

// Labels para inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-required="true" />

// Semantic HTML
<header>, <nav>, <main>, <section>, <article>, <footer>
```

## 🤖 AI Integration

### PropertyAIAgent

```javascript
import { PropertyAIAgent } from './examples/aiAgentIntegration'

const agent = new PropertyAIAgent(properties)
const response = agent.processInquiry("Busco apartamento 3 quartos")
// { matches, message, hasResults }
```

### Export para NLP

```javascript
import { exportPropertiesForNLP } from './utils/dataExport'

const nlpData = exportPropertiesForNLP(properties)
// Dados otimizados para language models
```

## 🔍 Snippets Úteis

### Novo Componente

```javascript
// Comment: Criar componente Card de imóvel responsivo com hover effect
function PropertyCard({ property, onClick }) {
  // Copilot vai gerar o código
}
```

### Estilo Responsivo

```css
/* Comment: Card grid responsivo - 1 col mobile, 2 tablet, 3 desktop */
.property-grid {
  /* Copilot vai gerar */
}
```

### Função Helper

```javascript
/**
 * Comment: Extrair nome do bairro de location string "Bairro - Cidade/Estado"
 * @param {string} location - Location string completo
 * @returns {string} Nome do bairro
 */
function extractNeighborhood(location) {
  // Copilot vai gerar
}
```

## 📝 Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `PropertyCard.jsx` |
| Funções | camelCase | `handleSubmit()` |
| Constantes | UPPER_SNAKE_CASE | `COMPANY_INFO` |
| CSS Classes | kebab-case | `.property-card` |
| Arquivos CSS | Component.css | `PropertyCard.css` |

## 🌍 Formatação pt-BR

```javascript
// Moeda
'R$ 450.000'          // Sem centavos
'R$ 450.000,50'       // Com centavos

// Telefone
'(84) 99999-9999'

// CEP
'59152-280'

// Data
'31/12/2024'          // DD/MM/YYYY
```

## 🚫 Anti-Patterns (Evite)

```javascript
// ❌ NÃO hardcode informações da empresa
<a href="tel:+558499999999">

// ✅ Use constantes
<a href={COMPANY_INFO.contact.phoneLink}>

// ❌ NÃO manipule localStorage diretamente
localStorage.setItem('properties', JSON.stringify(data))

// ✅ Use storage.js
saveProperty(data)

// ❌ NÃO use path absoluto
<img src="/assets/image.png" />

// ✅ Use import ou path relativo
import img from './assets/image.png'
<img src={img} />
```

## 🔒 Segurança

```javascript
// ✅ Sempre valide input
if (!validateEmail(email)) return

// ✅ Previna submit
const handleSubmit = (e) => {
  e.preventDefault()
  // ...
}

// ✅ React auto-escapa output (XSS protection)
<div>{userInput}</div>  // Seguro
```

## 📦 Imports Order

```javascript
// 1. React e hooks
import { useState, useEffect } from 'react'

// 2. Bibliotecas externas
import ExternalLib from 'external-lib'

// 3. Componentes internos
import Header from './components/Header'

// 4. Utils e helpers
import { helper } from './utils/helpers'

// 5. Constantes
import { CONST } from './constants/constants'

// 6. Estilos (último)
import './App.css'
```

## 🎓 Dicas para Copilot

### 💡 Comentários Descritivos

```javascript
// Função para calcular desconto baseado em condições: 
// - 10% se área > 100m²
// - 5% se featured = true
// - Retorna preço com desconto
function calculateDiscount(property) {
  // Copilot vai gerar implementação completa
}
```

### 💡 JSDoc para Funções Complexas

```javascript
/**
 * Filtra e ordena imóveis por múltiplos critérios
 * @param {Array} properties - Array de imóveis
 * @param {Object} filters - Filtros: {type, minBedrooms, maxPrice, city}
 * @param {string} sortBy - Campo para ordenação: 'price' | 'area' | 'bedrooms'
 * @returns {Array} Imóveis filtrados e ordenados
 */
function filterAndSort(properties, filters, sortBy) {
  // Copilot vai gerar código consistente
}
```

### 💡 CSS com Contexto

```css
/* Card de imóvel com:
   - Sombra suave
   - Border radius 10px
   - Hover: sombra maior + leve elevação
   - Transition suave 0.3s
   - Responsivo: 100% width em mobile
*/
.property-card {
  /* Copilot vai gerar CSS completo */
}
```

## 📚 Links Rápidos

- **Instruções Completas**: [copilot-instructions.md](./copilot-instructions.md)
- **README Principal**: [README.md](../README.md)
- **AI Integration**: [README_AI_AGENT.md](../README_AI_AGENT.md)
- **Deploy**: [DEPLOYMENT.md](../DEPLOYMENT.md)

## 🆘 Ajuda Rápida

### Build Falha?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Resetar Dados LocalStorage?
```javascript
localStorage.removeItem('dfontes_properties')
localStorage.removeItem('dfontes_clients')
// Recarregar página
```

### Estilos Não Aplicados?
1. Verificar import CSS no componente
2. Limpar cache: Ctrl+Shift+R
3. Verificar especificidade CSS

---

**Para informações mais detalhadas, consulte [copilot-instructions.md](./copilot-instructions.md)**
