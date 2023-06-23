import { compressImage } from '../../helpers/compressImg';
import { createImgBlob } from '../../helpers/createImg';
import * as creators from './actions';
export const register = async (newUser) => {
  const completeNewUser = {
    ...newUser,
    rolUsuario: 'USER',
  };
  try {
    const response = await fetch('http://localhost:8080/api/v1/registro', {
      method: 'POST',
      body: JSON.stringify(completeNewUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (response.status !== 200) {
      return result.Error;
    }
  } catch (error) {
    return 'error en el servidor';
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
      localStorage.setItem('token', result.jwTtoken);
      localStorage.setItem('id', result.id);
      dispatch(creators.establecerToken(result.jwTtoken));
      dispatch(getDatosUsuario(result.id));
    } else {
      dispatch(creators.error(result.Error));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    dispatch(creators.cerrarSesion());
  };
};

export const getDatosUsuario = (idUsuario) => {
  return async (dispatch) => {
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
      const userDetails = {
        nombre: result.nombres,
        email: result.email,
        nroTel: result.telefono,
        rol: result.rolUsuario,
        id: result.id,
        img: createImgBlob(result.imagenPerfil),
      };
      dispatch(creators.iniciarSesion(userDetails));
    }
  };
};

export const guardarImagen = (idUsuario, file) => {
  return async (dispatch) => {
    try {
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append('img', compressedFile);

      const response = await fetch(
        `http://localhost:8080/api/v1/usuarios/img/${idUsuario}`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      if (response.ok) {
        const objUrl = URL.createObjectURL(compressedFile);
        dispatch(creators.cambiarFotoPerfil(objUrl));
      } else {
        dispatch(creators.error('Error al comprimir la imagen'));
      }
    } catch (error) {
      console.log(error);
      dispatch(creators.error('Error en el servidor.'));
    }
  };
};

export const guardarCambios = (idUsuario, newData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/usuarios/${idUsuario}`,
        {
          method: 'PUT',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        if (newData['contrasena']) {
          delete newData.contrasena;
        }
        dispatch(creators.cambiarDatos(newData));
        dispatch(creators.exito('Los datos se actualizarón exitosamente'));
      } else {
        console.log(result.Error);
      }
    } catch (error) {
      dispatch(creators.error('Error en el servidor al actualizar datos.'));
    }
  };
};

export const addReview = async (newReview, currentUserTOKEN) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/calificacion`,
      {
        method: 'POST',
        body: JSON.stringify(newReview),
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUserTOKEN
        },
      }
    );

    if (response.status !== 201) {
      return response.Error;
    }
  } catch (err) {
    return err;
  }
};

export const removeReview = async (newReview, currentUserTOKEN) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/calificacion/4`,
      {
        method: 'DELETE',
        body: JSON.stringify(newReview),
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUserTOKEN
        },
      }
    );

    if (response.status !== 201) {
      return response.Error;
    }
  } catch (err) {
    return err;
  }
};

export const getReviews = async (usuarioId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/calificacion/${usuarioId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    if (response.ok) {
      return result;
    }
  } catch (err) {
    return false;
  }
};

export const getUserData = async (idUsuario) => {
  try {
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
      return result;
    }
  } catch (err) {
    return err;
  }
};