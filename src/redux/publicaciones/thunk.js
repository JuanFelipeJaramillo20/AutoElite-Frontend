import * as creators from './actions';

export const cargarPublicaciones = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/resumen/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(creators.guardarPublicaciones(result));
      }
    } catch (error) {
      console.log('error servidor');
    }
  };
};

export const crearPublicacion = async (newPost, userToken) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/publicaciones`, {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });
    if (response.status !== 201) {
      return 'Error al crear la publicación';
    }
  } catch (error) {
    return '';
  }
};

export const loadReportPosts = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/reporte`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return '';
  }
};