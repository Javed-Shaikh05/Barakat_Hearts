// API configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in development (local)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return "http://localhost:5000";
  }

  // In production (Vercel), use relative URLs (same domain)
  return "";
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to create full API URLs
export const createApiUrl = (endpoint: string) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default API_BASE_URL;
