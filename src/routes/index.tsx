import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { LoadAnimated } from '../components/LoadAnimation';

import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  return loading ? (
    <LoadAnimated />
  ) : (
    <NavigationContainer>
      {user ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export { Routes };
