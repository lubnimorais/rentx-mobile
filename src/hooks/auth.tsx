import React, { useContext, createContext, useState, useCallback } from 'react';

import { api } from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface IAuthState {
  user: IUser;
  token: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: ({ email, password }: ISignInCredentials) => Promise<void>;
  // signOut: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data as IAuthState;

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
