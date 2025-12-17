/**
 * Property Helper Utilities
 * Functions to assist AI agents in searching, filtering, and matching properties
 */

/**
 * Parse price string to numeric value for comparison
 * Handles Brazilian currency format: R$ 450.000 or R$ 450.000,50
 * @param {string} priceString - Price in format "R$ 450.000" or "R$ 450.000,50"
 * @returns {number} Numeric price value
 */
export const parsePriceToNumber = (priceString) => {
  if (!priceString) return 0;
  // Remove "R$" and spaces, then handle Brazilian format
  // Brazilian format: thousands separator is ".", decimal separator is ","
  // Example: R$ 450.000,50 -> 450000.50
  const cleaned = priceString.replace(/R\$\s*/g, '');
  
  // Check if there's a comma (decimal separator)
  if (cleaned.includes(',')) {
    // Remove periods (thousands separator) and replace comma with period for decimal
    return parseFloat(cleaned.replace(/\./g, '').replace(',', '.'));
  } else {
    // No decimal part, just remove periods (thousands separator)
    return parseInt(cleaned.replace(/\./g, ''));
  }
};

/**
 * Format number to Brazilian price string
 * @param {number} price - Numeric price
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return `R$ ${price.toLocaleString('pt-BR')}`;
};

/**
 * Extract city from location string
 * @param {string} location - Full location string (e.g., "Ponta Negra - Natal/RN")
 * @returns {string} City name
 */
export const extractCity = (location) => {
  if (!location) return '';
  const match = location.match(/([^-]+)\/RN/);
  return match ? match[1].trim() : '';
};

/**
 * Extract neighborhood from location string
 * @param {string} location - Full location string
 * @returns {string} Neighborhood name
 */
export const extractNeighborhood = (location) => {
  if (!location) return '';
  return location.split('-')[0]?.trim() || '';
};

/**
 * Filter properties by criteria
 * @param {Array} properties - Array of property objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered properties
 */
export const filterProperties = (properties, filters = {}) => {
  return properties.filter(property => {
    // Filter by property type
    if (filters.type && property.type !== filters.type) {
      return false;
    }

    // Filter by minimum bedrooms
    if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) {
      return false;
    }

    // Filter by minimum bathrooms
    if (filters.minBathrooms && property.bathrooms < filters.minBathrooms) {
      return false;
    }

    // Filter by minimum area
    if (filters.minArea && property.area < filters.minArea) {
      return false;
    }

    // Filter by maximum area
    if (filters.maxArea && property.area > filters.maxArea) {
      return false;
    }

    // Filter by price range
    if (filters.minPrice || filters.maxPrice) {
      const price = parsePriceToNumber(property.price);
      if (filters.minPrice && price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && price > filters.maxPrice) {
        return false;
      }
    }

    // Filter by city
    if (filters.city) {
      const propertyCity = extractCity(property.location);
      if (!propertyCity.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
    }

    // Filter by neighborhood
    if (filters.neighborhood) {
      const propertyNeighborhood = extractNeighborhood(property.location);
      if (!propertyNeighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
        return false;
      }
    }

    // Filter by featured status
    if (filters.featuredOnly === true && !property.featured) {
      return false;
    }

    return true;
  });
};

/**
 * Sort properties by criteria
 * @param {Array} properties - Array of property objects
 * @param {string} sortBy - Sort criterion: 'price-asc', 'price-desc', 'area-asc', 'area-desc', 'bedrooms-desc'
 * @returns {Array} Sorted properties
 */
export const sortProperties = (properties, sortBy = 'price-asc') => {
  const sorted = [...properties];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => parsePriceToNumber(a.price) - parsePriceToNumber(b.price));
    case 'price-desc':
      return sorted.sort((a, b) => parsePriceToNumber(b.price) - parsePriceToNumber(a.price));
    case 'area-asc':
      return sorted.sort((a, b) => a.area - b.area);
    case 'area-desc':
      return sorted.sort((a, b) => b.area - a.area);
    case 'bedrooms-desc':
      return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    case 'featured-first':
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    default:
      return sorted;
  }
};

/**
 * Search properties by text query
 * @param {Array} properties - Array of property objects
 * @param {string} query - Search query
 * @returns {Array} Matching properties
 */
export const searchProperties = (properties, query) => {
  if (!query || query.trim() === '') return properties;

  const searchTerm = query.toLowerCase().trim();
  
  return properties.filter(property => {
    // Search in location
    if (property.location?.toLowerCase().includes(searchTerm)) return true;
    
    // Search in type
    if (property.type?.toLowerCase().includes(searchTerm)) return true;
    
    // Search in price
    if (property.price?.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  });
};

/**
 * Get property statistics
 * @param {Array} properties - Array of property objects
 * @returns {Object} Statistics object
 */
export const getPropertyStats = (properties) => {
  if (!properties || properties.length === 0) {
    return {
      total: 0,
      byType: {},
      priceRange: { min: 0, max: 0 },
      avgPrice: 0,
      avgArea: 0,
      featured: 0
    };
  }

  const prices = properties.map(p => parsePriceToNumber(p.price)).filter(p => p > 0);
  const areas = properties.map(p => p.area).filter(a => a > 0);

  const byType = properties.reduce((acc, property) => {
    acc[property.type] = (acc[property.type] || 0) + 1;
    return acc;
  }, {});

  return {
    total: properties.length,
    byType,
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    },
    avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    avgArea: areas.reduce((a, b) => a + b, 0) / areas.length,
    featured: properties.filter(p => p.featured).length
  };
};

/**
 * Match properties to customer preferences
 * Scores properties based on how well they match preferences (0-100)
 * @param {Array} properties - Array of property objects
 * @param {Object} preferences - Customer preferences
 * @returns {Array} Properties with match scores
 */
export const matchProperties = (properties, preferences = {}) => {
  // If no preferences provided, return properties with default score
  if (!preferences || Object.keys(preferences).length === 0) {
    return properties.map(property => ({
      ...property,
      matchScore: 50 // Neutral score when no preferences
    }));
  }

  return properties.map(property => {
    let score = 0;
    let maxScore = 0;

    // Type preference (weight: 20)
    if (preferences.type) {
      maxScore += 20;
      if (property.type === preferences.type) score += 20;
    }

    // Bedrooms preference (weight: 15)
    if (preferences.bedrooms) {
      maxScore += 15;
      if (property.bedrooms === preferences.bedrooms) {
        score += 15;
      } else if (Math.abs(property.bedrooms - preferences.bedrooms) === 1) {
        score += 10; // Close match
      }
    }

    // Price preference (weight: 25)
    if (preferences.maxPrice) {
      maxScore += 25;
      const price = parsePriceToNumber(property.price);
      if (price <= preferences.maxPrice) {
        // Score based on how much under budget
        const priceRatio = price / preferences.maxPrice;
        score += Math.round(25 * (1 - priceRatio * 0.3)); // Prefer properties under budget
      }
    }

    // Area preference (weight: 15)
    if (preferences.minArea) {
      maxScore += 15;
      if (property.area >= preferences.minArea) {
        score += 15;
      } else {
        score += Math.round(15 * (property.area / preferences.minArea));
      }
    }

    // Location preference (weight: 20)
    if (preferences.city || preferences.neighborhood) {
      maxScore += 20;
      const propertyCity = extractCity(property.location);
      const propertyNeighborhood = extractNeighborhood(property.location);
      
      if (preferences.city && propertyCity.toLowerCase().includes(preferences.city.toLowerCase())) {
        score += 10;
      }
      if (preferences.neighborhood && propertyNeighborhood.toLowerCase().includes(preferences.neighborhood.toLowerCase())) {
        score += 10;
      }
    }

    // Featured bonus (weight: 5)
    maxScore += 5;
    if (property.featured) score += 5;

    // Calculate percentage score
    const matchScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    return {
      ...property,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore); // Sort by match score
};

/**
 * Get unique cities from properties
 * @param {Array} properties - Array of property objects
 * @returns {Array} Array of unique city names
 */
export const getUniqueCities = (properties) => {
  const cities = properties.map(p => extractCity(p.location)).filter(Boolean);
  return [...new Set(cities)];
};

/**
 * Get unique neighborhoods from properties
 * @param {Array} properties - Array of property objects
 * @returns {Array} Array of unique neighborhood names
 */
export const getUniqueNeighborhoods = (properties) => {
  const neighborhoods = properties.map(p => extractNeighborhood(p.location)).filter(Boolean);
  return [...new Set(neighborhoods)];
};

/**
 * Generate property summary for AI agents
 * @param {Object} property - Property object
 * @returns {string} Human-readable summary
 */
export const generatePropertySummary = (property) => {
  const parts = [];
  
  parts.push(`${property.type} em ${property.location}`);
  
  if (property.bedrooms > 0) {
    parts.push(`${property.bedrooms} ${pluralizePT(property.bedrooms, 'quarto')}`);
  }
  
  if (property.bathrooms > 0) {
    parts.push(`${property.bathrooms} ${pluralizePT(property.bathrooms, 'banheiro')}`);
  }
  
  parts.push(`${property.area}m²`);
  parts.push(`por ${property.price}`);
  
  if (property.featured) {
    parts.push('(Destaque)');
  }
  
  return parts.join(', ');
};

/**
 * Validate property object
 * @param {Object} property - Property object to validate
 * @returns {Object} Validation result { valid: boolean, errors: Array }
 */
export const validateProperty = (property) => {
  const errors = [];

  if (!property.id) errors.push('ID is required');
  if (!property.type) errors.push('Type is required');
  if (!property.location) errors.push('Location is required');
  if (typeof property.bedrooms !== 'number') errors.push('Bedrooms must be a number');
  if (typeof property.bathrooms !== 'number') errors.push('Bathrooms must be a number');
  if (typeof property.area !== 'number' || property.area <= 0) errors.push('Area must be a positive number');
  if (!property.price) errors.push('Price is required');
  if (typeof property.featured !== 'boolean') errors.push('Featured must be a boolean');

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Pluralize Portuguese words
 * @param {number} count - Number to determine pluralization
 * @param {string} singular - Singular form of the word
 * @param {string} plural - Plural form of the word (optional, adds 's' by default)
 * @returns {string} Correctly pluralized word
 */
export const pluralizePT = (count, singular, plural = null) => {
  if (count === 1) return singular;
  return plural || `${singular}s`;
};
