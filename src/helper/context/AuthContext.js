import { createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = AuthContext.Provider;

export { AuthContext, AuthProvider };
