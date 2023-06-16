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
