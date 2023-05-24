import * as types from './actionTypes';

const publicaciones = [];

export const publicacionesReducer = (state = publicaciones, action) => {
  switch (action.type) {
    case types.SET_PUBLICACIONES:
      return action.payload;
    case types.ADD_PUBLICACION:
      return [...state, action.payload];
    case types.UPDATE_PUBLICACION:
      return state.map((publicacion) => {
        return publicacion.id === action.payload.id
          ? action.payload
          : publicacion;
      });

    case types.DELETE_PUBLICACION:
      return state.filter((publicacion) => {
        return publicacion.id !== action.payload;
      });
    default:
      return state;
  }
};
