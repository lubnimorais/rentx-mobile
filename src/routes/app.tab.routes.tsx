import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { AppStackRoutes } from './app.stack.routes';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';

const BottomNavigator = createBottomTabNavigator();

const AppTabRoutes: React.FC = () => {
  const theme = useTheme();

  return (
    <BottomNavigator.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_secondary,
        },
      }}
    >
      <BottomNavigator.Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <BottomNavigator.Screen
        name="MyCars"
        options={{
          tabBarIcon: ({ color }) => <CarSvg fill={color} />,
        }}
        component={MyCars}
      />
      <BottomNavigator.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <PeopleSvg fill={color} />,
        }}
        component={Home}
      />
    </BottomNavigator.Navigator>
  );
};

export { AppTabRoutes };
