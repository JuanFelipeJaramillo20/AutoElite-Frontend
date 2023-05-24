import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { usuarioReducer } from './usuario/reducer';
import { publicacionesReducer } from './publicaciones/reducer';

const loggerMiddleware = createLogger();
export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    publicaciones: publicacionesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, loggerMiddleware),
});
