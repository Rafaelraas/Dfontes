/**
 * Property Data Export Utilities
 * Functions to export property data in various formats for AI agent consumption
 */

import { getPropertyStats, extractCity, extractNeighborhood, parsePriceToNumber } from './propertyHelpers';

/**
 * Export properties as JSON for AI agent consumption
 * @param {Array} properties - Array of property objects
 * @returns {Object} Formatted data for AI agents
 */
export const exportPropertiesJSON = (properties) => {
  const stats = getPropertyStats(properties);
  
  return {
    metadata: {
      exportDate: new Date().toISOString(),
      total: stats.total,
      featured: stats.featured,
      propertyTypes: stats.byType,
      priceRange: {
        min: stats.priceRange.min,
        max: stats.priceRange.max,
        average: Math.round(stats.avgPrice)
      },
      areaStats: {
        average: Math.round(stats.avgArea)
      }
    },
    properties: properties.map(property => ({
      id: property.id,
      type: property.type,
      location: {
        full: property.location,
        city: extractCity(property.location),
        neighborhood: extractNeighborhood(property.location),
        state: 'RN'
      },
      details: {
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        areaUnit: 'm²'
      },
      pricing: {
        display: property.price,
        numeric: parsePriceToNumber(property.price),
        currency: 'BRL'
      },
      status: property.status || 'available',
      featured: property.featured,
      description: property.description || '',
      tags: generatePropertyTags(property)
    }))
  };
};

/**
 * Generate searchable tags for a property
 * @param {Object} property - Property object
 * @returns {Array} Array of tags
 */
const generatePropertyTags = (property) => {
  const tags = [];
  
  // Type tags
  tags.push(property.type.toLowerCase());
  
  // Location tags
  const city = extractCity(property.location);
  const neighborhood = extractNeighborhood(property.location);
  if (city) tags.push(city.toLowerCase());
  if (neighborhood) tags.push(neighborhood.toLowerCase());
  
  // Size tags
  if (property.bedrooms > 0) {
    tags.push(`${property.bedrooms}-quartos`);
    if (property.bedrooms >= 3) tags.push('familia');
  }
  
  // Area tags
  if (property.area < 100) tags.push('compacto');
  else if (property.area >= 100 && property.area < 200) tags.push('medio');
  else tags.push('amplo');
  
  // Price tags
  const price = parsePriceToNumber(property.price);
  if (price < 300000) tags.push('economico');
  else if (price >= 300000 && price < 700000) tags.push('medio-padrao');
  else tags.push('luxo');
  
  // Special tags
  if (property.featured) tags.push('destaque');
  if (property.type === 'Terreno') tags.push('construcao');
  
  // Neighborhood specific tags
  if (neighborhood.toLowerCase().includes('ponta negra')) tags.push('praia');
  if (neighborhood.toLowerCase().includes('tirol')) tags.push('nobre');
  
  return tags;
};

/**
 * Export properties as CSV string
 * @param {Array} properties - Array of property objects
 * @returns {string} CSV formatted string
 */
export const exportPropertiesCSV = (properties) => {
  const headers = [
    'ID',
    'Tipo',
    'Localização',
    'Cidade',
    'Bairro',
    'Quartos',
    'Banheiros',
    'Área (m²)',
    'Preço (Display)',
    'Preço (Numérico)',
    'Status',
    'Destaque',
    'Descrição'
  ];
  
  const rows = properties.map(property => [
    property.id,
    property.type,
    property.location,
    extractCity(property.location),
    extractNeighborhood(property.location),
    property.bedrooms,
    property.bathrooms,
    property.area,
    property.price,
    parsePriceToNumber(property.price),
    property.status || 'available',
    property.featured ? 'Sim' : 'Não',
    property.description || ''
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
};

/**
 * Export properties as plain text summary for AI agents
 * @param {Array} properties - Array of property objects
 * @returns {string} Plain text summary
 */
export const exportPropertiesText = (properties) => {
  const stats = getPropertyStats(properties);
  
  let text = '=== DERNIVAL FONTES - LISTAGEM DE IMÓVEIS ===\n\n';
  text += `Total de imóveis: ${stats.total}\n`;
  text += `Imóveis em destaque: ${stats.featured}\n`;
  text += `Faixa de preço: R$ ${stats.priceRange.min.toLocaleString('pt-BR')} - R$ ${stats.priceRange.max.toLocaleString('pt-BR')}\n`;
  text += `Preço médio: R$ ${Math.round(stats.avgPrice).toLocaleString('pt-BR')}\n`;
  text += `Área média: ${Math.round(stats.avgArea)}m²\n\n`;
  
  text += 'TIPOS DE IMÓVEIS:\n';
  Object.entries(stats.byType).forEach(([type, count]) => {
    text += `  - ${type}: ${count}\n`;
  });
  text += '\n';
  
  text += '=== IMÓVEIS DISPONÍVEIS ===\n\n';
  
  properties.forEach((property, index) => {
    text += `${index + 1}. ${property.type.toUpperCase()} - ID: ${property.id}\n`;
    text += `   Localização: ${property.location}\n`;
    if (property.description) {
      text += `   Descrição: ${property.description}\n`;
    }
    if (property.bedrooms > 0) {
      text += `   Quartos: ${property.bedrooms} | Banheiros: ${property.bathrooms}\n`;
    }
    text += `   Área: ${property.area}m²\n`;
    text += `   Preço: ${property.price}\n`;
    text += `   Status: ${property.status || 'available'}\n`;
    if (property.featured) {
      text += `   ⭐ DESTAQUE\n`;
    }
    text += '\n';
  });
  
  text += '=== INFORMAÇÕES DE CONTATO ===\n';
  text += 'Dernival Fontes Consultoria de Imóveis\n';
  text += 'CRECI RN: 6359 - 17° REGIÃO\n';
  text += 'Endereço: Rua Poço Branco, 33 - Parnamirim/RN - CEP 59152-280\n';
  text += 'Telefone: (84) 9999-9999\n';
  text += 'Email: contato@dernivalfontes.com.br\n';
  text += 'Horário: Seg-Sex 8h-18h | Sáb 8h-12h\n';
  
  return text;
};

/**
 * Export properties for natural language processing
 * Creates structured data optimized for AI language models
 * @param {Array} properties - Array of property objects
 * @returns {Object} NLP-optimized data structure
 */
export const exportPropertiesForNLP = (properties) => {
  return {
    context: {
      company: 'Dernival Fontes Consultoria de Imóveis',
      creci: '6359 - 17° REGIÃO (RN)',
      serviceArea: 'Grande Natal e todo Rio Grande do Norte',
      specialization: 'Venda, Locação e Administração de Imóveis',
      contact: {
        phone: '(84) 9999-9999',
        email: 'contato@dernivalfontes.com.br',
        address: 'Rua Poço Branco, 33 - Parnamirim/RN - CEP 59152-280',
        hours: 'Segunda a Sexta: 8h às 18h, Sábado: 8h às 12h'
      }
    },
    inventory: properties.map(property => {
      const city = extractCity(property.location);
      const neighborhood = extractNeighborhood(property.location);
      const price = parsePriceToNumber(property.price);
      
      return {
        // Core identifiers
        id: property.id,
        type: property.type,
        
        // Natural language description
        summary: generateNaturalLanguageSummary(property),
        
        // Structured location
        location: {
          neighborhood,
          city,
          state: 'Rio Grande do Norte',
          fullAddress: property.location
        },
        
        // Features
        features: {
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          totalArea: property.area
        },
        
        // Pricing
        price: {
          formatted: property.price,
          amount: price,
          currency: 'BRL'
        },
        
        // Status and metadata
        status: property.status || 'available',
        isFeatured: property.featured,
        description: property.description || '',
        
        // Search keywords
        keywords: generatePropertyTags(property),
        
        // AI matching hints
        suitableFor: generateSuitabilityHints(property)
      };
    })
  };
};

/**
 * Generate natural language summary for a property
 * @param {Object} property - Property object
 * @returns {string} Natural language description
 */
const generateNaturalLanguageSummary = (property) => {
  const parts = [];
  
  // Start with type and location
  parts.push(`${property.type} localizado em ${property.location}`);
  
  // Add room details
  if (property.bedrooms > 0) {
    parts.push(`com ${property.bedrooms} quarto${property.bedrooms > 1 ? 's' : ''}`);
    if (property.bathrooms > 0) {
      parts.push(`e ${property.bathrooms} banheiro${property.bathrooms > 1 ? 's' : ''}`);
    }
  }
  
  // Add area
  parts.push(`totalizando ${property.area} metros quadrados`);
  
  // Add price
  parts.push(`pelo valor de ${property.price}`);
  
  // Add featured status
  if (property.featured) {
    parts.push('(imóvel em destaque)');
  }
  
  return parts.join(', ') + '.';
};

/**
 * Generate suitability hints for property matching
 * @param {Object} property - Property object
 * @returns {Array} Array of suitability descriptions
 */
const generateSuitabilityHints = (property) => {
  const hints = [];
  
  // Family size hints
  if (property.bedrooms >= 4) {
    hints.push('Famílias grandes');
  } else if (property.bedrooms === 3) {
    hints.push('Famílias médias');
  } else if (property.bedrooms === 2) {
    hints.push('Casais ou famílias pequenas');
  } else if (property.bedrooms === 1) {
    hints.push('Solteiros ou casais');
  }
  
  // Investment hints
  const price = parsePriceToNumber(property.price);
  if (price < 300000) {
    hints.push('Primeiro imóvel');
    hints.push('Investimento de entrada');
  } else if (price >= 1000000) {
    hints.push('Alto padrão');
    hints.push('Investidores experientes');
  }
  
  // Location-based hints
  const neighborhood = extractNeighborhood(property.location).toLowerCase();
  if (neighborhood.includes('ponta negra')) {
    hints.push('Amantes de praia');
    hints.push('Turismo');
  }
  if (neighborhood.includes('lagoa nova') || neighborhood.includes('tirol')) {
    hints.push('Localização central');
    hints.push('Acesso a serviços');
  }
  
  // Property type hints
  if (property.type === 'Terreno') {
    hints.push('Construtores');
    hints.push('Investimento a longo prazo');
  }
  
  return hints;
};

/**
 * Create a downloadable file from exported data
 * @param {string} content - Content to download
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export const downloadExportedData = (content, filename, mimeType = 'application/json') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
