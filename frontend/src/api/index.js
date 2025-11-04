import axios from 'axios';

// Use the CRA dev proxy in development: set baseURL to '/api' so the dev server proxies to backend
// This avoids CORS problems during development. If you prefer direct backend host, set full URL like
// 'http://localhost:5000/api' and enable withCredentials if your backend uses cookies.
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api'),
    headers: {
        'Content-Type': 'application/json',
    },
    // temporarily disable credentials to isolate Network/CORS errors. Enable if your backend uses cookies.
    withCredentials: false
});

// Add a request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response
            console.error('Network error:', error.message);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;