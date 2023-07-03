import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getReviews, addReport, sendMessage } from '../../redux/usuario/thunk';

import { IconoPerfil } from '../../components/IconoPerfil/IconoPerfil';
import { Alert } from '../../components/Alert/Alert';
import { Form } from '../../components/Form/Form';
import { Modal } from '../../components/Modal/Modal';

import './Publicacion.css';
import { useSelector } from 'react-redux';
import { getEmail, getId } from '../../redux/usuario/selectors';

export const Publicacion = () => {
  const { publicacionId } = useParams();

  const navigate = useNavigate();
  const id = useSelector(getId);
  const email = useSelector(getEmail);
  const [publicacion, setPublicacion] = useState(null);
  const [esPrecioNegociable, setEsPrecioNegociable] = useState('No');
  const [imgPerfil, setImgPerfil] = useState('');
  const [reviews, setReviews] = useState([]);
  const [startRate, setStarRate] = useState('');
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mainPicture, setMainPicture] = useState(0);

  const handleImageChange = (event) => {
    setMainPicture(parseInt(event.target.id));
  };

  const handleEnvioMensaje = async (data, reset) => {
    const mensaje = {
      email,
      mensaje: data.mensaje,
      telefono: data['telefono-publicacion'],
      sender: id,
      receiver: publicacion.usuarioPublicacion.id,
      asunto: data.asunto,
    };
    const successEnvio = await sendMessage(mensaje);

    if (successEnvio) {
      setShowAlert(true);
      setAlert({
        title: 'Mensaje enviado',
        message: 'Se envió el mensaje correctamente',
        type: 'exito',
      });
    } else {
      setShowAlert(true);
      setAlert({
        title: 'Fallo al enviar el mensaje.',
        message: 'Envia de nuevo el mensaje.',
        type: 'error',
      });
    }
    reset();
  };

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

  function handleShowModal() {
    setShowModal(!showModal);
  }

  const handleReport = async (data) => {
    const newReport = {
      comentarios: data.comments,
      publicacionId: publicacionId,
    };
    const [status, res] = await addReport(newReport);
    if (status) {
      setShowAlert(true);
      setAlert({
        title: 'Operación realizada',
        message: res,
        type: 'exito',
      });
      handleShowModal();
    } else {
      setShowAlert(true);
      setAlert({
        title: 'Operación no realizada',
        message: res,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (publicacion !== null) {
      setImgPerfil(publicacion.usuarioPublicacion.imagenPerfil);
      publicacion.carroPublicacion.precioEsNegociable
        ? setEsPrecioNegociable('Sí')
        : setEsPrecioNegociable('No');
    }
  }, [publicacion]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imgPerfil);
    };
  }, [imgPerfil]);

  useEffect(() => {
    if (publicacion?.usuarioPublicacion?.id) {
      const getApiReviews = async () => {
        const res = await getReviews(publicacion.usuarioPublicacion.id);
        if (res) {
          setReviews(res);
        }
      };
      getApiReviews();
    }
  }, [publicacion]);

  useEffect(() => {
    if (reviews.length > 0) {
      setStarRate(() => {
        let avg = 0;
        reviews.forEach((number) => {
          avg += number.numEstrellas;
        });
        const [number, decimal] = `${avg / reviews.length}`.split('.');
        if (decimal) {
          return `${number},${decimal[0]}`;
        } else {
          return `${number}`;
        }
      });
    } else {
      setStarRate('0');
    }
  }, [publicacion, reviews]);

  return publicacion !== null ? (
    <div className='app-publicacion'>
      {showAlert ? (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          setShowModal={setShowAlert}
        />
      ) : null}
      {showModal ? (
        <Modal width={300} heigth={400} handleModal={handleShowModal}>
          <div className='leave-report'>
            <Form
              inputs={[
                {
                  type: 'textarea',
                  id: 'comments',
                  label: 'Reporte',
                  placeholder: '¿Por qué reportas?',
                  validacion: {
                    required: true,
                    minLength: 2,
                    maxLength: 30,
                  },
                  error: {
                    required: 'El reporte es obligatorio.',
                    minLength: 'Mínimo 2 caracteres.',
                    maxLength: 'Máximo 30 caracteres',
                  },
                },
              ]}
              btnText={'Enviar reporte'}
              onSubmit={(data) => handleReport(data)}
            />
          </div>
        </Modal>
      ) : null}
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
              <img
                src={publicacion.carroPublicacion.imagenes[mainPicture]}
                alt=''
              />
            </div>
            <div className='imagen-secundaria'>
              <div
                className={`imagenPequeña ${
                  mainPicture === 0 ? 'selected-file__img' : ''
                }`}
              >
                <img
                  id='0'
                  onClick={handleImageChange}
                  src={publicacion.carroPublicacion.imagenes[0]}
                  alt=''
                />
              </div>
              <div
                className={`imagenPequeña ${
                  mainPicture === 1 ? 'selected-file__img' : ''
                }`}
              >
                <img
                  id='1'
                  onClick={handleImageChange}
                  src={publicacion.carroPublicacion.imagenes[1]}
                  alt=''
                />
              </div>
              <div
                className={`imagenPequeña ${
                  mainPicture === 2 ? 'selected-file__img' : ''
                }`}
              >
                <img
                  id='2'
                  onClick={handleImageChange}
                  src={publicacion.carroPublicacion.imagenes[2]}
                  alt=''
                />
              </div>
              <div
                className={`imagenPequeña ${
                  mainPicture === 3 ? 'selected-file__img' : ''
                }`}
              >
                <img
                  id='3'
                  onClick={handleImageChange}
                  src={publicacion.carroPublicacion.imagenes[3]}
                  alt=''
                />
              </div>
              <div
                className={`imagenPequeña ${
                  mainPicture === 4 ? 'selected-file__img' : ''
                }`}
              >
                <img
                  id='4'
                  onClick={handleImageChange}
                  src={publicacion.carroPublicacion.imagenes[4]}
                  alt=''
                />
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
              {publicacion.carroPublicacion.transmision}
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
        <div className='report-post'>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className='app-btn'
            disabled={
              id === ''
                ? true
                : id == publicacion.usuarioPublicacion.id
                ? true
                : false
            }
          >
            Reportar
          </button>
        </div>
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
            {Array(5)
              .fill()
              .map((el, id) => {
                if (parseInt(startRate[0]) > id) {
                  return <i key={id} className='fa-solid fa-star'></i>;
                } else {
                  if (
                    parseInt(startRate[2]) >= 5 &&
                    id === parseInt(startRate[0])
                  ) {
                    return (
                      <i key={id} className='fa-solid fa-star-half-stroke'></i>
                    );
                  } else {
                    return <i key={id} className='fa-regular fa-star'></i>;
                  }
                }
              })}
            <p>{startRate}</p>
          </div>
          <div className='reviews'>
            <p>Total de reseñas: {reviews.length}</p>
          </div>
        </div>
        <div className='app-publicacion__contactoVendedor'>
          <h2>Contacta al vendedor</h2>
          <Form
            inputs={[
              {
                type: 'text',
                id: 'asunto',
                placeholder: 'Asunto*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
              {
                type: 'number',
                id: 'telefono-publicacion',
                placeholder: 'Teléfono',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
              {
                type: 'textarea',
                id: 'mensaje',
                placeholder: 'Escribe un mensaje*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
            ]}
            btnText='Enviar mensaje'
            disableBtn={
              id === ''
                ? true
                : id == publicacion.usuarioPublicacion.id
                ? true
                : false
            }
            onSubmit={(data, reset) => {
              handleEnvioMensaje(data, reset);
            }}
          />
        </div>
      </aside>
    </div>
  ) : null;
};
