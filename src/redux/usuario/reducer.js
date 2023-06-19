import * as types from './actionTypes';

const userInitialState = {
  isAuth: false,
  nombres: '',
  email: '',
  telefono: '',
  token: '',
  id: '',
  calificaciones: [],
  /*Se guardan los ids de las publicaciones */
  listaGuardados: [],
  misPublicaciones: [],
  rol: '',
  error: '',
  exito: '',
  img: '',
};

export const usuarioReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        isAuth: true,
        nombres: action.payload.nombre,
        email: action.payload.email,
        telefono: action.payload.nroTel,
        rol: action.payload.rol,
        id: action.payload.id,
        img: action.payload.img,
      };
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case types.CHANGE_IMG:
      return {
        ...state,
        img: action.payload,
      };

    case types.CHANGE_VALUES:
      return {
        ...state,
        ...action.payload,
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

    case types.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case types.EXITO:
      return {
        ...state,
        exito: action.payload,
      };

    case types.LOGOUT:
      return userInitialState;

    case types.RESET_VALUES:
      return userInitialState;

    case types.RESET_EXITO:
      return {
        ...state,
        exito: '',
      };
    default:
      return state;
  }
};
