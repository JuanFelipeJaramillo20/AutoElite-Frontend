import * as types from './actionTypes';

export const iniciarSesion = (usuario) => {
  return {
    type: types.SET_USER,
    payload: usuario,
  };
};

export const error = (error) => {
  return {
    type: types.ERROR,
    payload: error,
  };
};

export const exito = (mensajeExito) => {
  return {
    type: types.EXITO,
    payload: mensajeExito,
  };
};

export const resetValores = () => {
  return {
    type: types.RESET_VALUES,
  };
};

export const resetExito = () => {
  return {
    type: types.RESET_EXITO,
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

export const addGuardado = (pubGuardada) => {
  return {
    type: types.ADD_GUARDADO,
    payload: pubGuardada,
  };
};

export const eliminarPublicacionGuardada = (idPublicacion) => {
  return {
    type: types.DELETE_GUARDADO,
    payload: idPublicacion,
  };
};

export const cambiarFotoPerfil = (foto) => {
  return {
    type: types.CHANGE_IMG,
    payload: foto,
  };
};

export const cambiarDatos = (datos) => {
  return {
    type: types.CHANGE_VALUES,
    payload: datos,
  };
};
