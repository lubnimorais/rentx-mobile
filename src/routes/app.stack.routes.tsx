import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';

const StackNavigator = createStackNavigator();

const AppStackRoutes: React.FC = () => (
  <StackNavigator.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <StackNavigator.Screen name="Home" component={Home} />

    <StackNavigator.Screen name="CarDetails" component={CarDetails} />
    <StackNavigator.Screen name="Scheduling" component={Scheduling} />
    <StackNavigator.Screen
      name="SchedulingDetails"
      component={SchedulingDetails}
    />
    <StackNavigator.Screen name="Confirmation" component={Confirmation} />
    <StackNavigator.Screen name="MyCars" component={MyCars} />
  </StackNavigator.Navigator>
);

export { AppStackRoutes };
