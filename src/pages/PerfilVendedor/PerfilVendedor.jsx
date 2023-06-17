import { useEffect, useState } from 'react';

import { AddCalificacion } from './components/AddCalificacion/AddCalificacion';
import { CardCar } from '../../components/CardCar/CardCar';
import { Form } from '../../components/Form/Form';

import { REVIEWS } from '../../../constants';
import fotoProfile from '../../assets/img/perfil/usuario.png';

import './PerfilVendedor.css';
import { useParams } from 'react-router';

export const PerfilVendedor = () => {
  const { usuarioId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState(null);

  const obtenerPublicaciones = async (emailAutor) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/publicaciones/byuser/${emailAutor}`,
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
    const getDatosUsuario = async (idUsuario) => {
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
        setUsuario(result);
      }
    };

    getDatosUsuario(usuarioId);
  }, []);

  useEffect(() => {
    if (usuario !== null) {
      obtenerPublicaciones(usuario.email);
    }
  }, [usuario]);

  return usuario !== null ? (
    <section className='vendor-section'>
      <header className='vendor-section__profile'>
        <div className='profile-data'>
          <div className='profile-data__img'>
            <img src={fotoProfile} alt='user picture' />
          </div>
          <div className='profile-data__personal-data'>
            <h2>{usuario.nombres}</h2>
            <p>{usuario.telefono}</p>
          </div>
        </div>
        <div className='profile-data_about'>
          <h2>{usuario.email}</h2>
          {publicaciones !== null ? (
            <h2>Carros publicados {publicaciones.length}</h2>
          ) : (
            <h2>Carros publicados 0</h2>
          )}
        </div>
        <div className='about-form'>
          <Form
            inputs={[
              {
                type: 'text',
                id: 'name-send',
                label: 'Nombre completo',
                placeHolder: 'Digita tu nombre',
                validacion: {
                  required: true,
                },
                error: {
                  required: 'El nombre es obligatorio.',
                },
              },
              {
                type: 'email',
                id: 'email-send',
                label: 'Correo electrónico',
                placeHolder: 'Digita tu correo',
                validacion: {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                },
                error: {
                  required: 'El nombre es obligatorio.',
                  pattern: 'Correo electrónico no válido',
                },
              },
              {
                type: 'textarea',
                id: 'message-send',
                label: 'Motivo',
                placeHolder: 'Quiero comprar tu carro!',
                validacion: {
                  required: true,
                },
                error: {
                  required: 'El motivo es obligatorio.',
                },
              },
            ]}
            btnText={'Enviar mensaje'}
            onSubmit={(data) => {
              console.log(data);
            }}
          />
        </div>
      </header>
      <article className='vendor-section__more'>
        <div className='more-title'>
          <h2>Carros disponibles</h2>
        </div>
        <div className='more__cars'>
          {publicaciones !== null ? (
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
                ></CardCar>
              );
            })
          ) : (
            <h2>Ninguno</h2>
          )}
        </div>
      </article>
      <div className='vendor-section__reviews'>
        <AddCalificacion totalReviewsVendor={REVIEWS} />
      </div>
    </section>
  ) : null;
};
