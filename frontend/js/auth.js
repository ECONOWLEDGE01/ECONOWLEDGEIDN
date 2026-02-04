// Frontend Authentication Module
// Handles login, token management, and protected requests

/**
 * Login function
 * Sends credentials to backend, stores JWT token
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login response with token and user data
 */
async function login(email, password) {
  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token and user data in localStorage
    localStorage.setItem(CONFIG.TOKEN_KEY, data.token);
    localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(data.user));

    return {
      success: true,
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get current user from backend
 * Requires valid JWT token in localStorage
 * 
 * @returns {Promise} User data from /auth/me endpoint
 */
async function getCurrentUser() {
  try {
    const token = localStorage.getItem(CONFIG.TOKEN_KEY);

    if (!token) {
      return {
        success: false,
        error: 'No token found',
      };
    }

    const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Token is invalid or expired
      if (response.status === 401 || response.status === 403) {
        logout();
      }
      throw new Error(data.message || 'Failed to fetch user data');
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error('Get user error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Logout function
 * Clears stored token and user data
 */
function logout() {
  localStorage.removeItem(CONFIG.TOKEN_KEY);
  localStorage.removeItem(CONFIG.USER_KEY);
  console.log('Logged out successfully');
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if valid token exists
 */
function isAuthenticated() {
  return !!localStorage.getItem(CONFIG.TOKEN_KEY);
}

/**
 * Get stored JWT token
 * @returns {string|null} JWT token or null
 */
function getToken() {
  return localStorage.getItem(CONFIG.TOKEN_KEY);
}

/**
 * Get stored user data
 * @returns {object|null} User data or null
 */
function getStoredUser() {
  const userJson = localStorage.getItem(CONFIG.USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}