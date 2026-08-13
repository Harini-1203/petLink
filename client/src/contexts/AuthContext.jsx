import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { AUTH_EXPIRED_EVENT } from '../services/api';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // authLoading = "checking if a stored token is still valid" — used to
  // gate ProtectedRoute so we don't flash a login redirect on refresh.
  const [authLoading, setAuthLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setUser(null);
  }, []);

  const loadCurrentUser = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) {
      setAuthLoading(false);
      return;
    }
    try {
      const data = await authService.getCurrentUser();
      setUser(data.user ?? data);
    } catch {
      clearSession();
    } finally {
      setAuthLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    loadCurrentUser();
    window.addEventListener(AUTH_EXPIRED_EVENT, clearSession);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, clearSession);
  }, [loadCurrentUser, clearSession]);

  const login = useCallback(async ({ email, password }) => {
    const data = await authService.login({ email, password });
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    setUser(data.user ?? null);
    // Some backends only return the token on login — fetch the profile if so.
    if (!data.user) {
      const me = await authService.getCurrentUser();
      setUser(me.user ?? me);
    }
    return data;
  }, []);

  const register = useCallback(async ({ username, email, password }) => {
    const data = await authService.register({ username, email, password });
    return data;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    toast.success("You've been signed out.");
  }, [clearSession]);

  const updateProfile = useCallback(async (payload) => {
    const data = await authService.updateProfile(payload);
    setUser((prev) => ({ ...prev, ...(data.user ?? data) }));
    return data;
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    authLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshUser: loadCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
