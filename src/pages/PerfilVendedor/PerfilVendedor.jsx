import { useEffect, useState } from 'react';

import { AddCalificacion } from './components/AddCalificacion/AddCalificacion';
import { Form } from '../../components/Form/Form';

import { REVIEWS } from '../../../constants';

import './PerfilVendedor.css';
import { useParams } from 'react-router';
import { Publicaciones } from '../../components/Publicaciones/Publicaciones';
import { createImgBlob } from '../../helpers/createImg';

export const PerfilVendedor = () => {
  const { usuarioId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [cantidadPublicaciones, setCantidadPublicaciones] = useState(0);

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

  return usuario !== null ? (
    <section className='vendor-section'>
      <header className='vendor-section__profile'>
        <div className='profile-data'>
          <div className='profile-data__img'>
            <img src={createImgBlob(usuario.imagenPerfil)} alt='user picture' />
          </div>
          <div className='profile-data__personal-data'>
            <h2>{usuario.nombres}</h2>
            <p>{usuario.telefono}</p>
          </div>
        </div>
        <div className='profile-data_about'>
          <h2>{usuario.email}</h2>
          {cantidadPublicaciones !== 0 ? (
            <h2>Carros publicados {cantidadPublicaciones}</h2>
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
          <Publicaciones
            userEmail={usuario.email}
            setCantidadPublicaciones={(cantidad) =>
              setCantidadPublicaciones(cantidad)
            }
          />
        </div>
      </article>
      <div className='vendor-section__reviews'>
        <AddCalificacion totalReviewsVendor={REVIEWS} />
      </div>
    </section>
  ) : null;
};
