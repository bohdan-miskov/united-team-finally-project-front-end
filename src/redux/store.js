import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import categoriesReducer from './categories/slice';
import filtersReducer from './filters/slice';
import ingredientsReducer from './ingredients/slice';
import recipeDetailsReducer from './recipeDetails/slice';
import recipesReducer from './recipes/slice';
import userReducer from './user/slice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { injectStore } from '../services/axiosConfig';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated'],
};

const persistAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    categories: categoriesReducer,
    filters: filtersReducer,
    ingredients: ingredientsReducer,
    recipeDetails: recipeDetailsReducer,
    recipes: recipesReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

injectStore(store);
