import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';

const StackNavigator = createStackNavigator();

const StackRoutes: React.FC = () => (
  <StackNavigator.Navigator
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
    <StackNavigator.Screen
      name="SchedulingComplete"
      component={SchedulingComplete}
    />
  </StackNavigator.Navigator>
);

export { StackRoutes };
