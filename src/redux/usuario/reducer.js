import * as types from './actionTypes';

const userInitialState = {
  isAuth: true,
  nombre: '',
  email: '',
  nroTel: '',
  token: '',
  calificaciones: [],
  /*Se guardan los ids de las publicaciones */
  listaGuardados: [],
  misPublicaciones: [],
  rol: '',
};

export const usuarioReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        isAuth: true,
        nombre: action.payload.nombre,
        email: action.payload.email,
        nroTel: action.payload.nroTel,
        token: action.payload.token,
        calificaciones: action.payload.calificaciones,
        listaGuardados: action.payload.listaGuardados,
        misPublicaciones: action.payload.misPublicaciones,
        rol: action.payload.role,
      };
    case types.LOGOUT:
      return userInitialState;

    case types.DELETE_PUBLICACION:
      return {
        ...state,
        misPublicaciones: state.misPublicaciones.filter((idPublicacion) => {
          return idPublicacion !== action.payload;
        }),
      };

    case types.DELETE_GUARDADO:
      return {
        ...state,
        listaGuardados: state.listaGuardados.filter((idPublicacion) => {
          return idPublicacion !== action.payload;
        }),
      };

    default:
      return state;
  }
};
