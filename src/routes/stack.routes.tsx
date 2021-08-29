import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';

const StackNavigator = createStackNavigator();

const StackRoutes: React.FC = () => (
  <StackNavigator.Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}
  >
    <StackNavigator.Screen name="Splash" component={Splash} />
    <StackNavigator.Screen name="SignIn" component={SignIn} />
    <StackNavigator.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
    <StackNavigator.Screen
      name="Home"
      component={Home}
      options={{ gestureEnabled: false }}
    />
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
    <StackNavigator.Screen name="MyCars" component={MyCars} />
  </StackNavigator.Navigator>
);

export { StackRoutes };
