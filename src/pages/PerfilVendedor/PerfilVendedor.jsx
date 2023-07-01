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
import { useSelector } from 'react-redux';
import { getId } from '../../redux/usuario/selectors';

export const PerfilVendedor = () => {
  const { usuarioId } = useParams();
  const id = useSelector(getId);
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
                id: 'nombre',
                placeholder: 'Asunto*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
              {
                type: 'text',
                id: 'email-publicacion',
                placeholder: 'Email*',
                validacion: {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                },
                error: {
                  required: 'Campo obligatorio',
                  pattern: 'Email no válido.',
                },
              },
              {
                type: 'number',
                id: 'telefono-publicacion',
                placeholder: 'Teléfono',
              },
              {
                type: 'text',
                id: 'mensaje',
                placeholder: 'Escribe un mensaje*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
            ]}
            btnText='Enviar mensaje'
            disableBtn={id === '' ? true : id == usuarioId ? true : false}
          />
        </div>
      </header>
      <article className='vendor-section__more'>
        <div className='more-title'>
          <h2>Carros disponibles</h2>
        </div>
        <div className='more__cars'>
          <Publicaciones
            userId={usuarioId}
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
