// Central place to read environment configuration. When the Python REST API is
// ready, set VITE_USE_MOCK=false and VITE_API_BASE_URL in a .env file.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const USE_MOCK =
  (import.meta.env.VITE_USE_MOCK ?? 'true').toString() !== 'false';

export const TOKEN_STORAGE_KEY = 'ipk.auth.token';
export const USER_STORAGE_KEY = 'ipk.auth.user';
