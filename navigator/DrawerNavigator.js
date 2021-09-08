import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SideDrawer from './SideDrawer';
import { Home } from '../screens/Home';
import { createNote } from '../screens/createNote';
import { editNote } from '../screens/editNote';
import { displayNote } from '../screens/displayNote';

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
       <Stack.Screen name="Createnote" component={createNote} 
      options={{
        title: 'Create a Note',
      }}/>
        <Stack.Screen name="Displaynote" component={displayNote} 
      options={{
        title: 'Note',
      }}/>
       <Stack.Screen name="Editnote" component={editNote} 
      options={{
        title: 'Note',
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