import { useRef, useEffect } from 'react';

import { AddCalificacion } from './components/AddCalificacion/AddCalificacion';
import { CardCar } from '../../components/CardCar/CardCar';
import { Form } from '../../components/Form/Form';

import { USUARIOS, PUBLICACION, CARROS, REVIEWS } from '../../../constants';
import carrosJuanda from '../../assets/img/inicio/elMejor.jpeg';
import fotoProfile from '../../assets/img/perfil/perfil-ejemplo.jpg';

import './PerfilVendedor.css';

export const PerfilVendedor = () => {
  const vendorProfile = useRef();
  const vendorMore = useRef();

  useEffect(() => {
    const areDefined = vendorProfile.current && vendorMore.current;
    const iswider = window.innerWidth > 925;
    if (areDefined && iswider) {
      let moreHeight = vendorMore.current.clientHeight;
      vendorProfile.current.style.height = `${moreHeight}px`;
    }
  }, []);

  return (
    <>
      <section className='vendor-section'>
        <header ref={vendorProfile} className='vendor-section__profile'>
          <div className='profile-data'>
            <div className='profile-data__img'>
              <img src={fotoProfile} alt="user picture" />
            </div>
            <div className='profile-data__personal-data'>
              <h2>
                {USUARIOS[0].Nombre}
              </h2>
              <p>
                {USUARIOS[0].Teléfono}
              </p>
            </div>
          </div>
          <div className='profile-data_about'>
            <h2>
              Carros disponibles {3}
            </h2>
            <h2>
              Carros vendidos {10}
            </h2>
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
        <article ref={vendorMore} className='vendor-section__more'>
          <div className='more-title'>
            <h2>
              Carros disponibles
            </h2>
          </div>
          <div className='more__cars'>
            {PUBLICACION.map((el, id) => {
              if (id < 3) {
                return (
                  <div key={el.IDCarro}>
                    <CardCar
                      ciudadVenta={el.Ciudad}
                      idPublicacion={el.IDPublicación}
                      kilometraje={CARROS[id].Kilómetros}
                      marcaCarro={CARROS[id].Marca}
                      modeloCarro={CARROS[id].Modelo}
                      precio={CARROS[id].Precio}
                      tipoCombustible={CARROS[id].Combustible}
                      tipoTransmision={CARROS[id].Transmisión}
                      yearCarro={CARROS[id].Año}
                      srcImageCar={carrosJuanda}
                    />
                  </ div>
                );
              }
            })}
          </div>
        </article>
        <div className='vendor-section__reviews'>
          <AddCalificacion
            totalReviewsVendor={REVIEWS}
          />
        </div>
      </section>
    </>
  );
};
