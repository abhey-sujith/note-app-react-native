import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authSlice from './auth/authslice'
import noteSlice from './note/noteslice'

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // stateReconciler: hardSet,
  // blacklist: [],
};

export const combinedReducers = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  note: noteSlice,
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
  note:{
    notes:[],
    status: 'idle',
  }
};
