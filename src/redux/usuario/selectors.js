export const getAuth = (state) => state.usuario.isAuth;

export const getNombre = (state) => state.usuario.nombres;

export const getToken = (state) => state.usuario.token;

export const getEmail = (state) => state.usuario.email;

export const getNroTel = (state) => state.usuario.telefono;

export const getId = (state) => state.usuario.id;

export const getRol = (state) => state.usuario.rol;

export const getError = (state) => state.usuario.error;

export const getExito = (state) => state.usuario.exito;
export const getCalificaciones = (state) => state.usuario.calificaciones;

export const getImagen = (state) => state.usuario.img;
export const getListaGuardados = (state) => state.usuario.listaGuardados;

export const getMisPublicaciones = (state) => state.usuario.misPublicaciones;
