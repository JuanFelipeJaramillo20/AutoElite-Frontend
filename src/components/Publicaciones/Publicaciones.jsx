import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CardCar } from '../CardCar/CardCar';
import './Publicaciones.css';
export const Publicaciones = ({
  userId,
  setCantidadPublicaciones,
  showOpt,
}) => {
  const [publicaciones, setPublicaciones] = useState(null);

  const deletePublicacion = (idPublicacion) => {
    setPublicaciones((prevPub) => {
      return prevPub.filter((pub) => pub.id != idPublicacion);
    });
  };
  const obtenerPublicaciones = async (userId) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/publicaciones/byuser/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    if (response.ok) {
      setPublicaciones(result);
    }
  };

  useEffect(() => {
    obtenerPublicaciones(userId);
  }, []);

  useEffect(() => {
    if (publicaciones !== null && setCantidadPublicaciones !== undefined) {
      setCantidadPublicaciones(publicaciones.length);
    }
  }, [publicaciones]);

  return publicaciones !== null && publicaciones.length !== 0 ? (
    publicaciones.map((publicacion) => {
      return (
        <CardCar
          key={publicacion.id}
          idPublicacion={publicacion.id}
          srcImageCar='https://i.imgur.com/xyiSDoE.jpeg'
          yearCarro={publicacion.carroPublicacion.year}
          modeloCarro={publicacion.carroPublicacion.tipo}
          marcaCarro={publicacion.carroPublicacion.marca}
          precio={publicacion.carroPublicacion.precio}
          ciudadVenta={publicacion.carroPublicacion.ciudad}
          kilometraje={publicacion.carroPublicacion.kilometraje}
          tipoTransmision={publicacion.carroPublicacion.transmision}
          tipoCombustible={publicacion.carroPublicacion.combustible}
          estado={publicacion.carroPublicacion.estado}
          showOpt={showOpt}
          deletePublicacion={deletePublicacion}
        ></CardCar>
      );
    })
  ) : (
    <p className='app-noPublicaciones'>No hay publicaciones por el momento</p>
  );
};

Publicaciones.propTypes = {
  userId: PropTypes.number.isRequired,
  setCantidadPublicaciones: PropTypes.func,
  showOpt: PropTypes.bool,
};
