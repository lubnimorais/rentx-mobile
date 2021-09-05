import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { api } from '../services/api';

import { database } from '../database';
import { User } from '../database/models/User';

interface IUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface IAuthState {
  user: IUser;
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
      try {
        const response = await api.post('/sessions', { email, password });

        const { token, user } = response.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        const userCollection = database.get<User>('users');
        await database.write(async () => {
          await userCollection.create(newUser => {
            newUser.user_id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.driver_license = user.driver_license;
            newUser.avatar = user.avatar;
            newUser.token = token;
          });
        });

        const userData = {
          ...user,
          token,
        };

        setData({ user: userData });
      } catch (error) {
        throw new Error('Erro ao realizar o login');
      }
    },
    [],
  );

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as IUser;

        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData({ user: userData });
      }
    }

    loadUserData();
  }, []);

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
