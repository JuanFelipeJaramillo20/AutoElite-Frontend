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
    if (response.ok) {
      localStorage.setItem('token', result.jwTtoken);
      localStorage.setItem('id', result.id);
      dispatch(creators.establecerToken(result.jwTtoken));
      dispatch(getDatosUsuario(result.id));
      dispatch(getFavorites(result.id));
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
        img: result.imagenPerfil,
      };
      dispatch(creators.iniciarSesion(userDetails));
      dispatch(getFavorites(result.id));
    }
  };
};

export const guardarImagen = (idUsuario, file) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fotoPerfil_usuarios');
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dxej0w19x/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();
    if (response.ok) {
      dispatch(creators.cambiarFotoPerfil(result.secure_url));
      guardarURLenBD(idUsuario, result.secure_url);
    }
  };
};

export const guardarURLenBD = async (idUsuario, url) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/usuarios/img/${idUsuario}`,
    {
      method: 'PUT',
      body: url,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }
  );
  if (!response.ok) {
    console.log('error en el servidor back');
  }
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
    const response = await fetch(`http://localhost:8080/api/v1/calificacion`, {
      method: 'POST',
      body: JSON.stringify(newReview),
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUserTOKEN,
      },
    });

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
          Authorization: currentUserTOKEN,
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

export const getFavorites = (idUsuario) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/usuarios/${idUsuario}/favorites`,
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
      const lstFavorites = [];
      result.map((pub) => {
        const favPub = {
          id: pub.id,
          yearCarro: pub.carroPublicacion.year,
          modeloCarro: pub.carroPublicacion.tipo,
          marcaCarro: pub.carroPublicacion.marca,
          precio: pub.carroPublicacion.precio,
          ciudadVenta: pub.carroPublicacion.ciudad,
          kilometraje: pub.carroPublicacion.kilometraje,
          tipoTransmision: pub.carroPublicacion.transmision,
          tipoCombustible: pub.carroPublicacion.combustible,
          estado: pub.carroPublicacion.estado,
        };
        lstFavorites.push(favPub);
      });
      dispatch(creators.cargarGuardados(lstFavorites));
    } else {
      dispatch(creators.error('Error cargando las publicaciones favoritas.'));
    }
  };
};

export const setFavorites = (idPub, idUsuario) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/usuarios/${idUsuario}/favoritos/${idPub}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      if (response.ok) {
        dispatch(getFavorites(idUsuario));
      }
    } catch (err) {
      return dispatch(creators.error('Error con el servidor'));
    }
  };
};

export const deleteFavorites = (idPub, idUsuario) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/usuarios/${idUsuario}/favorites/remove/${idPub}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      console.log(response);
      if (response.ok) {
        dispatch(getFavorites(idUsuario));
      }
    } catch (err) {
      return dispatch(creators.error('Error con el servidor'));
    }
  };
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

export const getAllUsers = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/usuarios`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    if (response.ok && !result.Error) {
      return [true, result];
    } else {
      return [false, result.Error];
    }
  } catch (err) {
    return [false, err];
  }
};