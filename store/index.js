import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combinedReducers, initialState } from './slices';

const persistConfig = {
  key: 'root',
  // version: 1,
  storage: AsyncStorage,
  whitelist: [],
  // blacklist: [],
};


const persistedReducer = persistReducer(persistConfig, combinedReducers);

// Setting up redux
export const store = configureStore({
  reducer: (state, action) => {
    if (action.type === 'NUKE') {
      state = initialState;
    }
    return persistedReducer(state, action);
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);