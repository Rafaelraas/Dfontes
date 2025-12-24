/**
 * Local Storage Management for CMS
 * Handles properties and clients data persistence
 */

const STORAGE_KEYS = {
  PROPERTIES: 'dfontes_properties',
  CLIENTS: 'dfontes_clients'
};

// Default properties data
const DEFAULT_PROPERTIES = [
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
  },
  {
    id: 3,
    type: 'Apartamento',
    location: 'Lagoa Nova - Natal/RN',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    price: 'R$ 320.000',
    featured: false,
    status: 'available',
    description: 'Apartamento aconchegante em área central'
  },
  {
    id: 4,
    type: 'Terreno',
    location: 'Parnamirim - Grande Natal/RN',
    bedrooms: 0,
    bathrooms: 0,
    area: 360,
    price: 'R$ 180.000',
    featured: false,
    status: 'available',
    description: 'Terreno pronto para construção'
  },
  {
    id: 5,
    type: 'Casa',
    location: 'Tirol - Natal/RN',
    bedrooms: 5,
    bathrooms: 4,
    area: 250,
    price: 'R$ 1.200.000',
    featured: true,
    status: 'available',
    description: 'Casa de luxo em localização premium'
  },
  {
    id: 6,
    type: 'Apartamento',
    location: 'Capim Macio - Natal/RN',
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    price: 'R$ 520.000',
    featured: false,
    status: 'available',
    description: 'Apartamento espaçoso em bairro em crescimento'
  }
];

// Property Storage Functions
export const getProperties = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default data
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(DEFAULT_PROPERTIES));
    return DEFAULT_PROPERTIES;
  } catch (error) {
    console.error('Error loading properties:', error);
    return DEFAULT_PROPERTIES;
  }
};

export const saveProperty = (property) => {
  try {
    const properties = getProperties();
    
    if (property.id) {
      // Update existing
      const index = properties.findIndex(p => p.id === property.id);
      if (index !== -1) {
        properties[index] = property;
      }
    } else {
      // Create new
      const maxId = properties.reduce((max, p) => Math.max(max, p.id || 0), 0);
      property.id = maxId + 1;
      properties.push(property);
    }
    
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    return property;
  } catch (error) {
    console.error('Error saving property:', error);
    throw error;
  }
};

export const deleteProperty = (id) => {
  try {
    const properties = getProperties();
    const filtered = properties.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

// Client Storage Functions
export const getClients = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading clients:', error);
    return [];
  }
};

export const saveClient = (client) => {
  try {
    const clients = getClients();
    
    if (client.id) {
      // Update existing
      const index = clients.findIndex(c => c.id === client.id);
      if (index !== -1) {
        clients[index] = client;
      }
    } else {
      // Create new
      const maxId = clients.reduce((max, c) => Math.max(max, c.id || 0), 0);
      client.id = maxId + 1;
      client.createdAt = new Date().toISOString();
      clients.push(client);
    }
    
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    return client;
  } catch (error) {
    console.error('Error saving client:', error);
    throw error;
  }
};

export const deleteClient = (id) => {
  try {
    const clients = getClients();
    const filtered = clients.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};
