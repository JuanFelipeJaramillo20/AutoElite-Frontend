import * as types from './actionTypes';

export const nuevaPublicacion = (publicacion) => {
  return {
    type: types.ADD_PUBLICACION,
    payload: publicacion,
  };
};

export const eliminarPublicacion = (idPublicacion) => {
  return {
    type: types.DELETE_PUBLICACION,
    payload: idPublicacion,
  };
};

export const editarPublicacion = (publicacionEditada) => {
  return {
    type: types.UPDATE_PUBLICACION,
    payload: publicacionEditada,
  };
};

export const guardarPublicaciones = (publicaciones) => {
  return {
    type: types.SET_PUBLICACIONES,
    payload: publicaciones,
  };
};
