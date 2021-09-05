import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Confirmation } from '../screens/Confirmation';

const StackNavigator = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <StackNavigator.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}
  >
    <StackNavigator.Screen name="Splash" component={Splash} />
    <StackNavigator.Screen name="SignIn" component={SignIn} />
    <StackNavigator.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
    <StackNavigator.Screen
      name="SignUpSecondStep"
      component={SignUpSecondStep}
    />
    <StackNavigator.Screen name="Confirmation" component={Confirmation} />
  </StackNavigator.Navigator>
);

export { AuthRoutes };
