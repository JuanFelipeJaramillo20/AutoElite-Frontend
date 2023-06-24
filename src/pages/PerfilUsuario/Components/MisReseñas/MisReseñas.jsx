import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { OpcionesPerfil } from '../../../../components/OpcionesPerfil/OpcionesPerfil';
import { AddCalificacion } from '../../../PerfilVendedor/components/AddCalificacion/AddCalificacion';

import { getReviews } from '../../../../redux/usuario/thunk';
import { getId } from '../../../../redux/usuario/selectors';

import './MisReseñas.css';

export const MisReseñas = () => {
  const usuarioId = useSelector(getId);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getApiReviews = async () => {
      const res = await getReviews(usuarioId);
      if (res) {
        setReviews(res);
      }
    };
    getApiReviews();
  }, []);

  return (
    <div className='app-configuracion'>
      <OpcionesPerfil />
      <AddCalificacion
        totalReviewsVendor={reviews}
        titleSection={'Tus reviews'}
      />
    </div>
  );
};
