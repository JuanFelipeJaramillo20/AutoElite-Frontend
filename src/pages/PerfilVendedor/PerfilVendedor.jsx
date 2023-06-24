import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { AddCalificacion } from './components/AddCalificacion/AddCalificacion';
import { Form } from '../../components/Form/Form';
import { Alert } from '../../components/Alert/Alert';
import { Publicaciones } from '../../components/Publicaciones/Publicaciones';
import { IconoPerfil } from '../../components/IconoPerfil/IconoPerfil';

import { getReviews, getUserData } from '../../redux/usuario/thunk';

//import { REVIEWS } from '../../../constants';

import './PerfilVendedor.css';

export const PerfilVendedor = () => {
  const { usuarioId } = useParams();

  const [usuario, setUsuario] = useState(null);
  const [cantidadPublicaciones, setCantidadPublicaciones] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [wasReviewed, setWasReviewed] = useState(false);

  useEffect(() => {
    const getDatosUsuario = async () => {
      const res = await getUserData(usuarioId);
      if (res) {
        setUsuario(res);
      }
    };
    getDatosUsuario(usuarioId);
  }, []);

  useEffect(() => {
    const getApiReviews = async () => {
      const res = await getReviews(usuarioId);
      if (res) {
        setReviews(res);
      }
    };
    getApiReviews();
  }, [wasReviewed]);

  return usuario !== null ? (
    <section className='vendor-section'>
      {wasReviewed ? (
        <Alert
          type='exito'
          message='Dejaste tu review'
          title='Review exitosa'
          setShowModal={setWasReviewed}
        />
      ) : null}
      <header className='vendor-section__profile'>
        <div className='profile-data'>
          <div className='profile-data__img'>
            <IconoPerfil srcImagenPerfil={usuario.imagenPerfil} />
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
        <AddCalificacion
          totalReviewsVendor={reviews}
          wasReviewed={setWasReviewed}
          vendorID={usuarioId}
          titleSection={'Reviews del vendedor'}
        />
      </div>
    </section>
  ) : null;
};
