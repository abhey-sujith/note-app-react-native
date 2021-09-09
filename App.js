import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';

import { store, persistor } from './store';
import RootNavigator from './navigator/rootnavigator';

export default function App() {
  const [loaded] = useFonts({
    MontserratBlack: require('./fonts/Montserrat-Black.ttf'),
    MontserratBold: require('./fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('./fonts/Montserrat-ExtraBold.ttf'),
    MontserratLight: require('./fonts/Montserrat-Light.ttf'),
    MontserratMedium: require('./fonts/Montserrat-Medium.ttf'),
    MontserratRegular: require('./fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('./fonts/Montserrat-SemiBold.ttf'),

  });
  if (!loaded) {
    return null;
  }
  return  (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <RootNavigator />
    </PersistGate>
    </Provider>
  );
}

