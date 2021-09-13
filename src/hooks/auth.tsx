import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { api } from '../services/api';

import { database } from '../database';
import { User } from '../database/model/User';

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
  loading: boolean;
  signIn: ({ email, password }: ISignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updatedUser: (user: IUser) => Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      try {
        const response = await api.post('/sessions', { email, password });

        const { token, user } = response.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        const userCollection = database.get<User>('users');
        await database.write(async () => {
          const responseUser = await userCollection.create(newUser => {
            newUser.user_id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.driver_license = user.driver_license;
            newUser.avatar = user.avatar;
            newUser.token = token;
          });

          const userInserted = responseUser._raw as unknown as IUser;

          const userData = {
            ...userInserted,
            token,
          };

          setData({ user: userData });
        });
      } catch (error) {
        throw new Error('Erro ao realizar o login');
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    try {
      const userCollection = database.get<User>('users');
      await database.write(async () => {
        // forma pela aula
        // const userSelected = await userCollection.find(data.user.id);
        const userSelected = await userCollection.find(data.user.user_id);
        await userSelected.destroyPermanently();
      });

      setData({} as IAuthState);
    } catch (error) {
      throw new Error('Não foi possível fazer o logout');
    }
  }, [data.user]);

  const updatedUser = useCallback(async (user: IUser) => {
    try {
      const userCollection = database.get<User>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update(userData => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });

        setData({ user });
      });
    } catch (error) {
      throw new Error('Não foi possível atualizar os dados');
    }
  }, []);

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as IUser;

        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData({ user: userData });
      }

      setLoading(false);
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updatedUser }}
    >
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
