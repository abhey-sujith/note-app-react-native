/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nuke,LogoutAsync } from '../store/slices/auth/authslice';
import { persistor } from '../store';

// // x------------assets and components----------------x
// import { logout } from '../utils/index';

// // x-------------state properties--------------------x
// import { nuke } from '../base/store/slices';
// import { persistor } from '../base/store';

const SideDrawer = (props) => {
    const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      {...props}
    //   style={{ backgroundColor: colors.background }}
    > 
      <View 
    //   style={styles.preference}
      >
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem('persist:auth', '');
            await dispatch(LogoutAsync())
            // await persistor.purge();
            dispatch(nuke());
            // persistor.persist();
            persistor.persist();
          }}
        >
          <Text 
        //   style={[styles.SignoutText, { color: colors.textalpha }]}
          >
            Signout
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default SideDrawer;

// const styles = StyleSheet.create({
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   DarkThemeText: { fontSize: 18, fontFamily: 'OpenSans-Regular' },
//   SignoutText: { fontSize: 18, fontFamily: 'OpenSans-Regular' },
// });
