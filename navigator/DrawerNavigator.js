import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SideDrawer from './SideDrawer';
import { Home } from '../screens/Home';

const Drawer = createDrawerNavigator();


const Stack = createNativeStackNavigator();

const homeStack = () => {
    return (
        <Stack.Navigator
    initialRouteName="Home"
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
      <Stack.Screen name="Home" component={Home} 
      options={{
        title: 'Home',
      }}/>
    </Stack.Navigator>
    );
  };

const DrawerNavigator = () => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Drawer.Navigator drawerContent={(props) => <SideDrawer {...props} />} screenOptions={{headerShown:false}}>
      <Drawer.Screen name={'Drawer'} component={homeStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;