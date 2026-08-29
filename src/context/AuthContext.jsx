import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { authService } from '../services/authService.js';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../api/config.js';

const AuthContext = createContext(null);

const readStored = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(() => readStored(USER_STORAGE_KEY));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)));

  const persist = useCallback((nextToken, nextUser) => {
    if (nextToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    setToken(nextToken || null);
    setUser(nextUser || null);
  }, []);

  // Re-validate an existing session on load.
  useEffect(() => {
    let active = true;
    if (!token) return;
    authService
      .me(token)
      .then((fresh) => {
        if (active) {
          setUser(fresh);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fresh));
        }
      })
      .catch(() => active && persist(null, null))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (credentials) => {
      const { token: t, user: u } = await authService.login(credentials);
      persist(t, u);
      return u;
    },
    [persist]
  );

  const register = useCallback(
    async (payload) => {
      const { token: t, user: u } = await authService.register(payload);
      persist(t, u);
      return u;
    },
    [persist]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    persist(null, null);
  }, [persist]);

  const value = useMemo(
    () => ({ user, token, loading, isAuthenticated: Boolean(token && user), login, register, logout }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
