import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  email: string | null;
  setEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  email: null,
  setEmail: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
