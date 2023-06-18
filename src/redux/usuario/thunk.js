import { createImgBlob } from '../../helpers/createImg';
import * as creators from './actions';

export const register = async (newUser) => {
  const completeNewUser = {
    ...newUser,
    rol: 'USER',
  };
  try {
    const response = await fetch('http://localhost:8080/api/v1/registro', {
      method: 'POST',
      body: JSON.stringify(completeNewUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      return 'Error de registro';
    }
  } catch (error) {
    return '';
  }
};

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
  console.log(result);
  if (response.ok) {
    return {
      nombre: result.nombres,
      email: result.email,
      nroTel: result.telefono,
      rol: result.rolUsuario,
      id: result.id,
      img: createImgBlob(result.imagenPerfil),
    };
  }
};

export const guardarImagen = (idUsuario, file) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append('img', file);
    const response = await fetch(
      `http://localhost:8080/api/v1/usuarios/img/${idUsuario}`,
      {
        method: 'PUT',
        body: formData,
      }
    );
    console.log(response);
    if (response.ok) {
      console.log('Se cargó la foto');
    } else {
      dispatch(creators.errorSesion('No se pudo'));
    }
  };
};
