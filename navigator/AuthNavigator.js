import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';
const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
      <Stack.Navigator
  initialRouteName="Register"
  screenOptions={{
    headerStyle: {
      backgroundColor: '#252525',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
  >
    <Stack.Screen
      name="Register"
      component={Register}
      options={{ title: 'Welcome' }}
    />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
  );
};

export default AuthStackNavigator;