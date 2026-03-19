// Check if we're in Vite or CRA environment
const isVite = typeof import.meta !== 'undefined' && import.meta.env;

const config = {
  apiUrl: isVite 
    ? import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    : process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
};

export default config;