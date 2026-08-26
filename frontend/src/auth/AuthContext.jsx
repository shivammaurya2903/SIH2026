import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  user: null,
  token: null,
  role: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {}
});

export const useAuth = () => useContext(AuthContext);
