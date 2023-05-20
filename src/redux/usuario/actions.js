import * as types from './actionTypes';

export const iniciarSesion = (usuario) => {
  return {
    type: types.SET_USER,
    payload: usuario,
  };
};

export const cerrarSesion = () => {
  return {
    type: types.LOGOUT,
  };
};

export const eliminarMiPublicacion = (idPublicacion) => {
  return {
    type: types.DELETE_PUBLICACION,
    payload: idPublicacion,
  };
};

export const eliminarPublicacionGuardada = (idPublicacion) => {
  return {
    type: types.DELETE_GUARDADO,
    payload: idPublicacion,
  };
};
