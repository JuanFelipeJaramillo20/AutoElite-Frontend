import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import './Publicacion.css';
import { useEffect, useState } from 'react';
import { IconoPerfil } from '../../components/IconoPerfil/IconoPerfil';

export const Publicacion = () => {
  const { publicacionId } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [esPrecioNegociable, setEsPrecioNegociable] = useState('No');
  const [imgPerfil, setImgPerfil] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getDatosPublicacion = async (idPublicacion) => {
      const response = await fetch(
        `http://localhost:8080/api/v1/publicaciones/${idPublicacion}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setPublicacion(result);
      }
    };

    getDatosPublicacion(publicacionId);
  }, []);

  useEffect(() => {
    if (
      publicacion !== null &&
      publicacion.carroPublicacion.esPrecioNegociable
    ) {
      setEsPrecioNegociable('Sí');
    } else if (publicacion !== null) {
      setImgPerfil(publicacion.usuarioPublicacion.imagenPerfil);
    }
  }, [publicacion]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imgPerfil);
    };
  }, [imgPerfil]);
  return publicacion !== null ? (
    <div className='app-publicacion'>
      <div
        className='app-publicacion__devolver'
        onClick={() => {
          navigate('/catalogo');
        }}
      >
        <i className='fa-solid fa-circle-chevron-left'></i>
        <button className='botonDevolver'>Devolverse</button>
      </div>
      <main className='app-publicacion__carro-detalles'>
        <div className='FotosCarro'>
          <h1>
            {publicacion.carroPublicacion.marca}{' '}
            {publicacion.carroPublicacion.tipo}
          </h1>
          <div className='imagenes'>
            <div className='imagen-principal'>
              <img src={publicacion.carroPublicacion.imagenes[0]} alt='' />
            </div>
            <div className='imagen-secundaria'>
              <div className='imagenPequeña '>
                <img src={publicacion.carroPublicacion.imagenes[0]} alt='' />
              </div>
              <div className='imagenPequeña'>
                <img src={publicacion.carroPublicacion.imagenes[1]} alt='' />
              </div>
              <div className='imagenPequeña'>
                <img src={publicacion.carroPublicacion.imagenes[2]} alt='' />
              </div>
              <div className='imagenPequeña'>
                <img src={publicacion.carroPublicacion.imagenes[3]} alt='' />
              </div>
              <div className='imagenPequeña '>
                <img src={publicacion.carroPublicacion.imagenes[4]} alt='' />
              </div>
            </div>
          </div>
        </div>
        <div className='app-publicacion__especificaciones'>
          <div className='app-publicacion__tituloEspecificaciones'>
            <h2>Especificaciones</h2>
          </div>
          <div className='app-publicacion__especificacionesLista'>
            <p className='item'>
              <span>Marca: </span>
              {publicacion.carroPublicacion.marca}
            </p>
            <p className='item'>
              <span>Modelo: </span>
              {publicacion.carroPublicacion.tipo}
            </p>
            <p className='item'>
              <span>Color: </span>
              {publicacion.carroPublicacion.color}
            </p>
            <p className='item'>
              <span>Tipo combustible: </span>
              {publicacion.carroPublicacion.combustible}
            </p>
            <p className='item'>
              <span>Año: </span>
              {publicacion.carroPublicacion.year}
            </p>
          </div>
          <div className='app-publicacion__especificacionesLista'>
            <p className='item'>
              <span>Precio negociable: </span>
              {esPrecioNegociable}
            </p>
            <p className='item'>
              <span>Transmision: </span>
              transmision
            </p>
            <p className='item'>
              <span>Kilometros: </span>
              {publicacion.carroPublicacion.kilometraje} km
            </p>
            <p className='item'>
              <span>Motor: </span>
              {publicacion.carroPublicacion.motor}
            </p>
            <p className='item'>
              <span>Puertas: </span>
              {publicacion.carroPublicacion.puertas}
            </p>
          </div>
        </div>
        <div className='app-publicacion__descripcion'>
          <h2>Descripcion</h2>
          <p>{publicacion.descripcion}</p>
        </div>
        <div className='app-publicacion__datosPublicacion'>
          <p className='app-publicacion__dato'>
            <span>Publicado: </span>
            {publicacion.fechaPublicacion}
          </p>
          <p className='app-publicacion__dato'>
            <span>Publicacion: </span>#{publicacionId}
          </p>
        </div>
      </main>
      <div className='app-publicacion__infoPublicacion'>
        <div className='app-publicacion__info-uso'>
          <p>{publicacion.carroPublicacion.estado}</p>
        </div>
        <p className='app-publicacion__precio'>
          ${publicacion.carroPublicacion.precio}
        </p>
        <p className='app-publicacion__ciudad'>{publicacion.ciudad}</p>
      </div>
      <aside className='app-publicacion__sideBar'>
        <div
          className='app-publicacion__infoVendedor'
          onClick={() =>
            navigate(`/perfil/${publicacion.usuarioPublicacion.id}`)
          }
        >
          <div className='app-publicacion__infoVendedor-datos'>
            <IconoPerfil srcImagenPerfil={imgPerfil} />
            <p className='app-publicacion__NombreVendedor'>
              {publicacion.usuarioPublicacion.nombres}
            </p>
          </div>
          <div className='estrellas'>
            <div className='estrella'></div>
            <div className='estrella'></div>
            <div className='estrella'></div>
            <div className='estrella'></div>
            <div className='estrella'></div>
          </div>
          <div className='reviews'>
            <p>(x reviews)</p>
          </div>
        </div>
        <div className='app-publicacion__contactoVendedor'>
          <h2>Contacta al vendedor</h2>
          <Form
            inputs={[
              {
                type: 'text',
                id: 'nombre',
                placeHolder: 'Asunto*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
              {
                type: 'text',
                id: 'email-publicacion',
                placeHolder: 'Email*',
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
                placeHolder: 'Teléfono',
              },
              {
                type: 'text',
                id: 'mensaje',
                placeHolder: 'Escribe un mensaje*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
            ]}
            btnText='Enviar mensaje'
          />
        </div>
      </aside>
    </div>
  ) : null;
};
