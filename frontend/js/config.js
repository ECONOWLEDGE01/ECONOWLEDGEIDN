// Frontend Configuration
// Centralized API endpoint configuration
// Change API_URL based on deployment environment

const CONFIG = {
  // API endpoint - update based on your deployment
  // Development: http://localhost:5000
  // Production: https://your-api-domain.com
  API_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://api.econowledge.com', // Update with your production domain

  // Token storage key in localStorage
  TOKEN_KEY: 'auth_token',
  
  // User storage key in localStorage
  USER_KEY: 'user_data',

  // Session timeout in milliseconds (24 hours)
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000,
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}