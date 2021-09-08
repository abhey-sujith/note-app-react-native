import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
// x------------assets and components----------------x
import AuthStackNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
const RootNavigator = () => {

  const auth = useSelector((state)=>state.auth.isAuthenticated);

  console.log('auth------------------------',auth);
  return (
    <>
      <NavigationContainer>
        {auth ? (
            <DrawerNavigator />
          ) :(
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;