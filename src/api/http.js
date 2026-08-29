import { API_BASE_URL, TOKEN_STORAGE_KEY } from './config.js';

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function authHeader() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Thin fetch wrapper around the Python REST API. All service modules go through
 * this so headers, base URL and error handling stay consistent.
 */
export async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(data?.detail || data?.message || res.statusText, res.status, data);
  }
  return data;
}
