import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userReducer from './user-slice';
import darkModeReducer from './dark-slice';

const reducers = combineReducers({
  user: userReducer,
  darkMode: darkModeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'darkMode'], //여기에 다크모드를 추가하지 않는다면 무슨 일이 일어날까요?
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
