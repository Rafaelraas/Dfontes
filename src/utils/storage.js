/**
 * Local Storage Management for CMS
 * Handles properties and clients data persistence
 */

const STORAGE_KEYS = {
  PROPERTIES: 'dfontes_properties',
  CLIENTS: 'dfontes_clients',
  PROPOSALS: 'dfontes_proposals',
  MESSAGES: 'dfontes_messages',
  CLIENT_SESSION: 'dfontes_client_session',
  AUTH_USER: 'dfontes_auth_user',
  AUTH_SESSION: 'dfontes_auth_session'
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
      // Create new - find the maximum ID and add 1
      const maxId = properties.length > 0 
        ? Math.max(...properties.map(p => p.id))
        : 0;
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
      // Create new - find the maximum ID and add 1
      const maxId = clients.length > 0 
        ? Math.max(...clients.map(c => c.id))
        : 0;
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

// Client Authentication Functions
export const getClientByEmail = (email) => {
  try {
    const clients = getClients();
    return clients.find(c => c.email && c.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Error finding client by email:', error);
    return null;
  }
};

export const authenticateClient = (email, password) => {
  try {
    const client = getClientByEmail(email);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }
    
    if (!client.password) {
      throw new Error('Cliente não possui senha cadastrada');
    }
    
    // Simple password comparison (in production, use hashed passwords)
    if (client.password !== password) {
      throw new Error('Senha incorreta');
    }
    
    return client;
  } catch (error) {
    console.error('Error authenticating client:', error);
    throw error;
  }
};

export const setClientSession = (client) => {
  try {
    const session = {
      client,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };
    localStorage.setItem(STORAGE_KEYS.CLIENT_SESSION, JSON.stringify(session));
  } catch (error) {
    console.error('Error setting client session:', error);
    throw error;
  }
};

export const getClientSession = () => {
  try {
    const sessionStr = localStorage.getItem(STORAGE_KEYS.CLIENT_SESSION);
    if (!sessionStr) {
      return null;
    }
    
    const session = JSON.parse(sessionStr);
    
    // Check if session has expired
    if (new Date(session.expiresAt) < new Date()) {
      clearClientSession();
      return null;
    }
    
    return session.client;
  } catch (error) {
    console.error('Error getting client session:', error);
    clearClientSession();
    return null;
  }
};

export const clearClientSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CLIENT_SESSION);
  } catch (error) {
    console.error('Error clearing client session:', error);
  }
};

// Proposal Storage Functions
export const getProposals = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading proposals:', error);
    return [];
  }
};

export const saveProposal = (proposal) => {
  try {
    const proposals = getProposals();
    
    if (proposal.id) {
      // Update existing
      const index = proposals.findIndex(p => p.id === proposal.id);
      if (index !== -1) {
        proposals[index] = { ...proposal, updatedAt: new Date().toISOString() };
      }
    } else {
      // Create new
      const maxId = proposals.length > 0 
        ? Math.max(...proposals.map(p => p.id))
        : 0;
      proposal.id = maxId + 1;
      proposal.createdAt = new Date().toISOString();
      proposal.status = 'pending'; // pending, approved, rejected
      proposals.push(proposal);
    }
    
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
    return proposal;
  } catch (error) {
    console.error('Error saving proposal:', error);
    throw error;
  }
};

export const getProposalsByClient = (clientId) => {
  try {
    const proposals = getProposals();
    return proposals.filter(p => p.clientId === clientId);
  } catch (error) {
    console.error('Error getting proposals by client:', error);
    return [];
  }
};

export const deleteProposal = (id) => {
  try {
    const proposals = getProposals();
    const filtered = proposals.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting proposal:', error);
    throw error;
  }
};

// Message Storage Functions
export const getMessages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};

export const saveMessage = (message) => {
  try {
    const messages = getMessages();
    
    if (message.id) {
      // Update existing
      const index = messages.findIndex(m => m.id === message.id);
      if (index !== -1) {
        messages[index] = { ...message, updatedAt: new Date().toISOString() };
      }
    } else {
      // Create new
      const maxId = messages.length > 0 
        ? Math.max(...messages.map(m => m.id))
        : 0;
      message.id = maxId + 1;
      message.createdAt = new Date().toISOString();
      messages.push(message);
    }
    
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    return message;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

export const getMessagesByClient = (clientId) => {
  try {
    const messages = getMessages();
    return messages.filter(m => m.clientId === clientId);
  } catch (error) {
    console.error('Error getting messages by client:', error);
    return [];
  }
};

export const deleteMessage = (id) => {
  try {
    const messages = getMessages();
    const filtered = messages.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};
