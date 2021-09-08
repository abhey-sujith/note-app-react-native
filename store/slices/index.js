import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authSlice from './auth/authslice'

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // stateReconciler: hardSet,
  // blacklist: [],
};

export const combinedReducers = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  //   user: userReducer,
});

export const initialState = {
  auth: {
    isAuthenticated:false,
    token: "",
    name: "",
    email: "",
    id:0,
    status: 'idle',
  },

};
