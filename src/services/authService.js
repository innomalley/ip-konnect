import { USE_MOCK } from '../api/config.js';
import { request } from '../api/http.js';
import { endpoints } from '../api/endpoints.js';
import { mockApi } from '../mocks/mockApi.js';

function tokenUserId(token) {
  // mock tokens look like `mock.<userId>.<ts>`
  return token?.split('.')[1];
}

export const authService = {
  login(credentials) {
    if (USE_MOCK) return mockApi.login(credentials);
    return request(endpoints.auth.login, { method: 'POST', body: credentials });
  },

  register(payload) {
    if (USE_MOCK) return mockApi.register(payload);
    return request(endpoints.auth.register, { method: 'POST', body: payload });
  },

  me(token) {
    if (USE_MOCK) return mockApi.me(tokenUserId(token));
    return request(endpoints.auth.me);
  },

  logout() {
    if (USE_MOCK) return Promise.resolve();
    return request(endpoints.auth.logout, { method: 'POST' }).catch(() => {});
  },
};
