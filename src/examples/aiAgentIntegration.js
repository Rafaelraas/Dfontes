/**
 * Example: AI Agent Integration with Dernival Fontes Property System
 * 
 * This file demonstrates how an AI agent can interact with the property
 * listing system to help customers find suitable housing.
 */

import {
  filterProperties,
  sortProperties,
  searchProperties,
  matchProperties,
  getPropertyStats,
  getUniqueCities,
  getUniqueNeighborhoods,
  generatePropertySummary
} from '../utils/propertyHelpers.js';

import {
  exportPropertiesJSON,
  exportPropertiesCSV,
  exportPropertiesText,
  exportPropertiesForNLP,
  downloadExportedData
} from '../utils/dataExport.js';

// Example property dataset (this would come from your database/API)
const sampleProperties = [
  {
    id: 1,
    type: 'Apartamento',
    location: 'Ponta Negra - Natal/RN',
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    price: 'R$ 450.000',
    featured: true,
    status: 'available',
    description: 'Moderno apartamento em Ponta Negra, próximo à praia'
  },
  {
    id: 2,
    type: 'Casa',
    location: 'Candelária - Natal/RN',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    price: 'R$ 680.000',
    featured: true,
    status: 'available',
    description: 'Casa ampla em bairro estabelecido de Natal'
  }
];

// ============================================================================
// Example 1: Basic Property Search
// ============================================================================

console.log('=== Example 1: Basic Property Search ===\n');

// Search by text query
const searchResults = searchProperties(sampleProperties, 'ponta negra');
console.log('Search for "ponta negra":', searchResults.length, 'results');
searchResults.forEach(prop => {
  console.log(' -', generatePropertySummary(prop));
});

// ============================================================================
// Example 2: Filter Properties by Criteria
// ============================================================================

console.log('\n=== Example 2: Filter Properties ===\n');

// Filter for apartments with at least 2 bedrooms under R$ 500,000
const filters = {
  type: 'Apartamento',
  minBedrooms: 2,
  maxPrice: 500000
};

const filteredProperties = filterProperties(sampleProperties, filters);
console.log('Filtered properties:', filteredProperties.length, 'results');
filteredProperties.forEach(prop => {
  console.log(' -', generatePropertySummary(prop));
});

// ============================================================================
// Example 3: Match Properties to Customer Preferences
// ============================================================================

console.log('\n=== Example 3: Match Customer Preferences ===\n');

// Customer looking for a 3-bedroom property in Natal, budget up to R$ 500,000
const customerPreferences = {
  type: 'Apartamento',
  bedrooms: 3,
  maxPrice: 500000,
  city: 'Natal',
  minArea: 70
};

const matchedProperties = matchProperties(sampleProperties, customerPreferences);
console.log('Matched properties (sorted by score):');
matchedProperties.forEach(prop => {
  console.log(` - [Score: ${prop.matchScore}%]`, generatePropertySummary(prop));
});

// ============================================================================
// Example 4: Get Property Statistics
// ============================================================================

console.log('\n=== Example 4: Property Statistics ===\n');

const stats = getPropertyStats(sampleProperties);
console.log('Total properties:', stats.total);
console.log('Featured properties:', stats.featured);
console.log('Price range: R$', stats.priceRange.min.toLocaleString('pt-BR'), 
            '- R$', stats.priceRange.max.toLocaleString('pt-BR'));
console.log('Average price: R$', Math.round(stats.avgPrice).toLocaleString('pt-BR'));
console.log('Average area:', Math.round(stats.avgArea), 'm²');
console.log('Properties by type:', stats.byType);

// ============================================================================
// Example 5: Export Data for AI Processing
// ============================================================================

console.log('\n=== Example 5: Export Data for AI ===\n');

// Export as JSON
const jsonData = exportPropertiesJSON(sampleProperties);
console.log('JSON Export (first property):');
console.log(JSON.stringify(jsonData.properties[0], null, 2));

// Export for NLP (optimized for language models)
const nlpData = exportPropertiesForNLP(sampleProperties);
console.log('\nNLP-Optimized Export (first property summary):');
console.log(nlpData.inventory[0].summary);
console.log('Keywords:', nlpData.inventory[0].keywords.join(', '));
console.log('Suitable for:', nlpData.inventory[0].suitableFor.join(', '));

// Export as plain text
const textExport = exportPropertiesText(sampleProperties);
console.log('\nPlain Text Export (first 500 chars):');
console.log(textExport.substring(0, 500) + '...');

// ============================================================================
// Example 6: AI Agent Conversation Simulation
// ============================================================================

console.log('\n=== Example 6: AI Agent Conversation ===\n');

// Simulate an AI agent helping a customer
class PropertyAIAgent {
  constructor(properties) {
    this.properties = properties;
    this.conversationHistory = [];
  }

  // Process customer inquiry
  processInquiry(customerMessage) {
    this.conversationHistory.push({ role: 'customer', message: customerMessage });
    
    // Extract intent and preferences from message
    const intent = this.extractIntent(customerMessage);
    const preferences = this.extractPreferences(customerMessage);
    
    // Generate response
    const response = this.generateResponse(intent, preferences);
    this.conversationHistory.push({ role: 'agent', message: response });
    
    return response;
  }

  extractIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('procur') || lowerMessage.includes('quero')) {
      return 'search';
    } else if (lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
      return 'pricing';
    } else if (lowerMessage.includes('onde') || lowerMessage.includes('localiz')) {
      return 'location';
    }
    
    return 'general';
  }

  extractPreferences(message) {
    const preferences = {};
    
    // Extract bedroom count
    const bedroomMatch = message.match(/(\d+)\s*quarto/i);
    if (bedroomMatch) {
      preferences.bedrooms = parseInt(bedroomMatch[1]);
    }
    
    // Extract property type
    if (message.toLowerCase().includes('apartamento')) {
      preferences.type = 'Apartamento';
    } else if (message.toLowerCase().includes('casa')) {
      preferences.type = 'Casa';
    }
    
    // Extract budget
    const budgetMatch = message.match(/até\s*R?\$?\s*([\d.]+)/i);
    if (budgetMatch) {
      preferences.maxPrice = parseInt(budgetMatch[1].replace(/\./g, ''));
    }
    
    return preferences;
  }

  generateResponse(intent, preferences) {
    let response = '';
    
    if (intent === 'search' && Object.keys(preferences).length > 0) {
      // Match properties to preferences
      const matches = matchProperties(this.properties, preferences);
      
      if (matches.length > 0) {
        response = `Encontrei ${matches.length} imóve${matches.length > 1 ? 'is' : 'l'} que atendem suas necessidades:\n\n`;
        
        // Show top 3 matches
        matches.slice(0, 3).forEach((property, index) => {
          response += `${index + 1}. ${generatePropertySummary(property)}\n`;
          response += `   Compatibilidade: ${property.matchScore}%\n\n`;
        });
        
        response += 'Gostaria de saber mais sobre algum desses imóveis?';
      } else {
        response = 'Não encontrei imóveis que correspondem exatamente ao que você procura, ';
        response += 'mas posso mostrar opções similares. Poderia me dizer mais sobre suas preferências?';
      }
    } else {
      response = 'Olá! Sou o assistente virtual da Dernival Fontes. ';
      response += 'Estou aqui para ajudá-lo a encontrar o imóvel ideal em Natal e RN. ';
      response += 'Pode me dizer que tipo de imóvel você procura?';
    }
    
    return response;
  }

  getConversationHistory() {
    return this.conversationHistory;
  }
}

// Test the AI Agent
const agent = new PropertyAIAgent(sampleProperties);

console.log('Customer: Olá, estou procurando um apartamento com 3 quartos em Natal');
console.log('Agent:', agent.processInquiry('Olá, estou procurando um apartamento com 3 quartos em Natal'));

console.log('\n---\n');

console.log('Customer: Meu orçamento é até R$ 500.000');
console.log('Agent:', agent.processInquiry('Meu orçamento é até R$ 500.000'));

// ============================================================================
// Example 7: Download Export (for browser usage)
// ============================================================================

console.log('\n=== Example 7: Export Downloads ===\n');

// This function would be called in a browser environment
// to allow users to download property data

const createDownloadButtons = () => {
  console.log('In a browser, you could create download buttons like this:');
  
  // JSON Download
  console.log('\n1. JSON Download Button:');
  console.log('   onClick: downloadExportedData(');
  console.log('     JSON.stringify(exportPropertiesJSON(properties), null, 2),');
  console.log('     "properties.json",');
  console.log('     "application/json"');
  console.log('   )');
  
  // CSV Download
  console.log('\n2. CSV Download Button:');
  console.log('   onClick: downloadExportedData(');
  console.log('     exportPropertiesCSV(properties),');
  console.log('     "properties.csv",');
  console.log('     "text/csv"');
  console.log('   )');
  
  // Text Download
  console.log('\n3. Text Download Button:');
  console.log('   onClick: downloadExportedData(');
  console.log('     exportPropertiesText(properties),');
  console.log('     "properties.txt",');
  console.log('     "text/plain"');
  console.log('   )');
};

createDownloadButtons();

// ============================================================================
// Example 8: Get Available Cities and Neighborhoods
// ============================================================================

console.log('\n=== Example 8: Available Locations ===\n');

const cities = getUniqueCities(sampleProperties);
const neighborhoods = getUniqueNeighborhoods(sampleProperties);

console.log('Available cities:', cities.join(', '));
console.log('Available neighborhoods:', neighborhoods.join(', '));

// ============================================================================
// Example 9: Sort Properties
// ============================================================================

console.log('\n=== Example 9: Sort Properties ===\n');

// Sort by price (ascending)
const sortedByPrice = sortProperties(sampleProperties, 'price-asc');
console.log('Sorted by price (low to high):');
sortedByPrice.forEach(prop => {
  console.log(' -', prop.price, '-', generatePropertySummary(prop));
});

// Sort by area (descending)
const sortedByArea = sortProperties(sampleProperties, 'area-desc');
console.log('\nSorted by area (large to small):');
sortedByArea.forEach(prop => {
  console.log(' -', prop.area + 'm²', '-', generatePropertySummary(prop));
});

// ============================================================================
// Summary and Best Practices
// ============================================================================

console.log('\n=== Best Practices for AI Agents ===\n');
console.log('1. Always validate customer preferences before searching');
console.log('2. Use matchProperties() to rank results by relevance');
console.log('3. Provide 2-3 best matches initially, not overwhelming lists');
console.log('4. Use generatePropertySummary() for consistent descriptions');
console.log('5. Export data in appropriate format for your AI model');
console.log('6. Keep conversation history for context');
console.log('7. Direct customers to contact form for detailed inquiries');
console.log('8. Always mention CRECI registration for credibility');
console.log('9. Be transparent about property availability');
console.log('10. Escalate complex questions to human agents');

export { PropertyAIAgent };
