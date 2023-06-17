import * as types from './actionTypes';

const userInitialState = {
  isAuth: false,
  nombre: '',
  email: '',
  nroTel: '',
  token: '',
  id: '',
  calificaciones: [],
  /*Se guardan los ids de las publicaciones */
  listaGuardados: [],
  misPublicaciones: [],
  rol: '',
  error: '',
};

export const usuarioReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        isAuth: true,
        nombre: action.payload.nombre,
        email: action.payload.email,
        nroTel: action.payload.nroTel,
        rol: action.payload.rol,
        id: action.payload.id,
      };
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case types.SET_GUARDADOS:
      return {
        ...state,
        listaGuardados: action.payload,
      };

    case types.SET_PUBLICACIONES:
      return {
        ...state,
        misPublicaciones: action.payload,
      };

    case types.SET_CALIFICACIONES:
      return {
        ...state,
        calificaciones: action.payload,
      };

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

    case types.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case types.LOGOUT:
      return userInitialState;
    case types.RESET_VALUES:
      return userInitialState;
    default:
      return state;
  }
};
