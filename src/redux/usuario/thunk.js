import * as creators from './actions';

export const logIn = (userData) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8080/api/v1/userlogin', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      dispatch(creators.establecerToken(result.jwTtoken));
      const userDetails = await getDatosUsuario(result.id);
      dispatch(creators.iniciarSesion(userDetails));
    } else {
      dispatch(creators.errorSesion(result.message));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    console.log('si estoy acá');
    dispatch(creators.cerrarSesion());
  };
};

export const getDatosUsuario = async (idUsuario) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/usuarios/${idUsuario}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result = await response.json();
  if (response.ok) {
    return {
      nombre: result.nombres,
      email: result.email,
      nroTel: result.telefono,
      rol: result.rolUsuario,
    };
  }
};
