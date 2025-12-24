/**
 * Authentication and Authorization Management
 * Handles user authentication, session management, and admin access control
 */

const STORAGE_KEYS = {
  AUTH_USER: 'dfontes_auth_user',
  AUTH_SESSION: 'dfontes_auth_session'
}

// Default admin credentials (in production, this should be securely stored in a backend)
const DEFAULT_ADMIN = {
  id: 1,
  email: 'admin@dfontes.com.br',
  password: 'admin123', // In production, this should be hashed
  name: 'Administrador',
  role: 'admin'
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Authenticates a user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {object|null} - User object if authenticated, null otherwise
 */
export const login = (email, password) => {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios')
    }

    if (!validateEmail(email)) {
      throw new Error('Email inválido')
    }

    // Check credentials against default admin
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      const user = {
        id: DEFAULT_ADMIN.id,
        email: DEFAULT_ADMIN.email,
        name: DEFAULT_ADMIN.name,
        role: DEFAULT_ADMIN.role
      }

      // Create session
      const session = {
        user,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      }

      // Store session
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session))
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user))

      return user
    }

    throw new Error('Email ou senha incorretos')
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * Logs out the current user
 */
export const logout = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION)
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
  } catch (error) {
    console.error('Logout error:', error)
  }
}

/**
 * Gets the current authenticated user
 * @returns {object|null} - Current user object or null if not authenticated
 */
export const getCurrentUser = () => {
  try {
    const sessionStr = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION)
    if (!sessionStr) {
      return null
    }

    const session = JSON.parse(sessionStr)

    // Check if session has expired
    if (new Date(session.expiresAt) < new Date()) {
      logout()
      return null
    }

    return session.user
  } catch (error) {
    console.error('Error getting current user:', error)
    logout()
    return null
  }
}

/**
 * Checks if the current user is authenticated
 * @returns {boolean} - True if user is authenticated
 */
export const isAuthenticated = () => {
  return getCurrentUser() !== null
}

/**
 * Checks if the current user has admin role
 * @returns {boolean} - True if user is admin
 */
export const isAdmin = () => {
  const user = getCurrentUser()
  return user && user.role === 'admin'
}

/**
 * Gets the default admin credentials (for documentation purposes)
 * @returns {object} - Object with default credentials info
 */
export const getDefaultCredentials = () => {
  return {
    email: DEFAULT_ADMIN.email,
    password: '***hidden***',
    note: 'Use estas credenciais para fazer login no painel administrativo'
  }
}
