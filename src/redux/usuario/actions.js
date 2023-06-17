import * as types from './actionTypes';

export const iniciarSesion = (usuario) => {
  return {
    type: types.SET_USER,
    payload: usuario,
  };
};

export const errorSesion = (error) => {
  return {
    type: types.LOGIN_ERROR,
    payload: error,
  };
};

export const resetValores = () => {
  return {
    type: types.RESET_VALUES,
  };
};

export const establecerToken = (token) => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};

export const cerrarSesion = () => {
  return {
    type: types.LOGOUT,
  };
};

export const cargarGuardados = (idPublicaciones) => {
  return {
    type: types.SET_GUARDADOS,
    payload: idPublicaciones,
  };
};

export const eliminarPublicacionGuardada = (idPublicacion) => {
  return {
    type: types.DELETE_GUARDADO,
    payload: idPublicacion,
  };
};

export const cargarPublicaciones = (idPublicaciones) => {
  return {
    type: types.SET_PUBLICACIONES,
    payload: idPublicaciones,
  };
};

export const eliminarMiPublicacion = (idPublicacion) => {
  return {
    type: types.DELETE_PUBLICACION,
    payload: idPublicacion,
  };
};

export const cargarCalificaciones = (calificaciones) => {
  return {
    type: types.SET_CALIFICACIONES,
    payload: calificaciones,
  };
};
