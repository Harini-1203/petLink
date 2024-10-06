import { createContext, useState, useEffect, useReducer } from 'react';

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // This can be enhanced to check for stored token or session.
    const storedAuth = JSON.parse(localStorage.getItem('token')) || null;
    setAuth(storedAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;

