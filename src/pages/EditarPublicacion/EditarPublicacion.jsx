import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CargarFotos } from '../../components/CargarFotos/CargarFotos';
import { Alert } from '../../components/Alert/Alert';
import { Input } from '../../components/Input/Input';

import { getToken, getId } from '../../redux/usuario/selectors';
import { crearPublicacion } from '../../redux/publicaciones/thunk';


import './EditarPublicacion.css';

export const EditarPublicacion = () => {

  const { publicacionId } = useParams();

  const userToken = useSelector(getToken);
  const userId = useSelector(getId);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');
  const [year, setYear] = useState(0);
  const [postDetails, setPostDetails] = useState({});

  const handlePostUpdate = useCallback(async (event, postDetails, year) => {
    event.preventDefault();

    let isApproved = true;

    const approveTest = {
      'Placa': (postDetails.carro.placa.length === 6),
      'Estado': !(postDetails.carro.estado.includes('Elige una opción')),
      'Precio': (postDetails.carro.precio >= 1 && postDetails.carro.precio <= 1000000000),
      'Precio Negociable': (typeof postDetails.carro.precioEsNegociable === 'boolean') || !(postDetails.carro.precioEsNegociable.includes('Elige una opción')),
      'Modelo': (postDetails.carro.tipo.length >= 3 && postDetails.carro.tipo.length <= 20),
      'Marca': (postDetails.carro.marca.length >= 3 && postDetails.carro.marca.length <= 20),
      'Color': (postDetails.carro.color.length >= 3 && postDetails.carro.color.length <= 20),
      'Transmision': !(postDetails.carro.transmision.includes('Elige una opción')),
      'Ciudad': (postDetails.carro.ciudad.length >= 3 && postDetails.carro.ciudad.length <= 20),
      'Combustible': !(postDetails.carro.combustible.includes('Elige una opción')),
      'Puertas': (parseInt(postDetails.carro.puertas) >= 2 && parseInt(postDetails.carro.puertas) <= 6),
      'Motor': (postDetails.carro.motor.length >= 3 && postDetails.carro.motor.length <= 20),
      'Kilometraje': (postDetails.carro.kilometraje >= 0 && postDetails.carro.kilometraje <= 100000),
      'Año': (parseInt(postDetails.carro.year) >= 1919 && parseInt(postDetails.carro.year) <= year),
      'Descripcion': (postDetails.descripcion.length >= 10 && postDetails.descripcion.length <= 100),
    };

    for (let property in approveTest) {
      if (!approveTest[property]) {
        isApproved = approveTest[property];
        setShowAlert(true);
        setAlertTitle(`Campo inválido`);
        setAlertMessage(`${property} debe de ser correcto`);
        setAlertType('alerta');
        break;
      }
    }

    if (isApproved) {
      const updatedPost = {
        "id": postDetails.id,
        "fechaPublicacion": postDetails.fechaPublicacion,
        "ciudad": postDetails.ciudad,
        "usuarioId": userId,
        "carro": {
          "puertas": parseInt(postDetails.carro.puertas),
          "motor": postDetails.carro.motor,
          "ciudad": postDetails.carro.ciudad,
          "marca": postDetails.carro.marca,
          "placa": postDetails.carro.placa,
          "color": postDetails.carro.color,
          "tipo": postDetails.carro.tipo,
          "combustible": postDetails.carro.combustible,
          "year": parseInt(postDetails.carro.year),
          "precio": postDetails.carro.precio,
          "estado": postDetails.carro.estado,
          "transmision": postDetails.carro.transmision,
          "kilometraje": postDetails.carro.kilometraje,
          "precioEsNegociable": (postDetails.carro.precioEsNegociable === 'Si') ? true : false,
        },
        "descripcion": postDetails.descripcion
      };

      const response = await crearPublicacion(updatedPost, userToken);
      if (response) {
        setShowAlert(true);
        setAlertMessage('Intenta otra vez');
        setAlertTitle('Error');
        setAlertType('error');
      } else {
        setAlertTitle('Publicado');
        setAlertMessage('La publicación fue creada');
        setAlertType('exito');
        setShowAlert(true);
      }

    }
  }, [userId, userToken]);

  const handleChangeValues = useCallback((event) => {
    setPostDetails((prevValue) => {
      const property = event.target.id;
      return {
        ...prevValue,
        carro: {
          ...prevValue.carro,
          [property]: event.target.value,
        },
      };
    });
  }, [postDetails]);

  const handleChangeDescription = useCallback((event) => {
    setPostDetails((prevValue) => {
      return {
        ...prevValue,
        "descripcion": event.target.value,
      };
    });
  }, [postDetails]);

  useEffect(() => {
    let currentYear = new Date(Date.now()).getFullYear();
    setYear(currentYear + 1);
  }, [year]);

  useEffect(() => {
    const obtenerPublicaciones = async (publicacionID) => {
      const response = await fetch(
        `http://localhost:8080/api/v1/publicaciones/${publicacionID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setPostDetails(() => {
          return {
            id: result.id,
            fechaPublicacion: result.fechaPublicacion,
            ciudad: result.ciudad,
            usuarioID: result.usuarioPublicacion.id,
            carro: {
              puertas: result.carroPublicacion.puertas,
              motor: result.carroPublicacion.motor,
              ciudad: result.carroPublicacion.ciudad,
              marca: result.carroPublicacion.marca,
              placa: result.carroPublicacion.placa,
              color: result.carroPublicacion.color,
              tipo: result.carroPublicacion.tipo,
              combustible: result.carroPublicacion.combustible,
              year: result.carroPublicacion.year,
              estado: result.carroPublicacion.estado,
              transmision: result.carroPublicacion.transmision,
              precio: result.carroPublicacion.precio,
              kilometraje: result.carroPublicacion.kilometraje,
              precioEsNegociable: result.carroPublicacion.precioEsNegociable,
            },
            descripcion: result.descripcion
          };
        });
      }
    };
    obtenerPublicaciones(publicacionId);
  }, [publicacionId]);

  return (
    <>
      {showAlert ? (
        <Alert
          title={alertTitle}
          message={alertMessage}
          type={alertType}
          setShowModal={setShowAlert}
        />
      ) : null}
      <section className='create-post edit-post'>
        <header className='post__title'>
          <h2>Rellena el formulario para editar tú publicación</h2>
        </header>
        <article className='post__form'>
          <div className='form'>
            {postDetails.carro ? (
              <form className='app-form'>
                <Input
                  id={'placa'}
                  type={'text'}
                  labelText={'Placa'}
                  value={postDetails.carro.placa}
                  placeHolder={'Digita la placa'}
                  minLength={6}
                  maxLength={6}
                  required
                  onChange={handleChangeValues}
                />
                <Input
                  id={'estado'}
                  type={'selection'}
                  labelText={'Estado'}
                  value={postDetails.carro.estado}
                  opciones={['Nuevo', 'Usado']}
                  onChange={handleChangeValues}
                  required
                />
                <Input
                  id={'precio'}
                  type={'number'}
                  labelText={'Precio'}
                  placeHolder={'Digita el precio'}
                  value={postDetails.carro.precio}
                  onChange={handleChangeValues}
                  required
                  min={1}
                  max={1000000000}
                />
                <Input
                  id={'precioEsNegociable'}
                  type={'selection'}
                  labelText={'Precio Negociable'}
                  opciones={['Si', 'No']}
                  value={postDetails.carro.precioEsNegociable}
                  onChange={handleChangeValues}
                  required
                />
                <Input
                  id={'tipo'}
                  type={'text'}
                  labelText={'Modelo'}
                  placeHolder={'Digita el modelo'}
                  value={postDetails.carro.tipo}
                  onChange={handleChangeValues}
                  required
                  minLength={3}
                  maxLength={20}
                />
                <Input
                  id={'marca'}
                  type={'text'}
                  labelText={'Marca'}
                  placeHolder={'Digita la marca'}
                  value={postDetails.carro.marca}
                  onChange={handleChangeValues}
                  required
                  minLength={3}
                  maxLength={20}
                />
                <Input
                  id={'color'}
                  type={'text'}
                  labelText={'Color'}
                  placeHolder={'Digita la color'}
                  value={postDetails.carro.color}
                  onChange={handleChangeValues}
                  required
                  minLength={3}
                  maxLength={20}
                />
                <Input
                  id={'transmision'}
                  type={'selection'}
                  labelText={'Transmisión'}
                  opciones={[
                    "Automática",
                    "Mecánica",
                    "Semiautomática",
                    "Secuencial",
                    "Manual",]}
                  value={postDetails.carro.transmision}
                  onChange={handleChangeValues}
                  required
                />
                <Input
                  id={'ciudad'}
                  type={'text'}
                  labelText={'Ciudad'}
                  placeHolder={'Digita la ciudad'}
                  opciones={['Si', 'No']}
                  value={postDetails.carro.ciudad}
                  onChange={handleChangeValues}
                  required
                  minLength={3}
                  maxLength={30}
                />
                <Input
                  id={'combustible'}
                  type={'selection'}
                  labelText={'Combustible'}
                  opciones={[
                    "Gasolina", "Diesel", "Híbrido", "Eléctrico"
                  ]}
                  value={postDetails.carro.combustible}
                  onChange={handleChangeValues}
                  required
                />
                <Input
                  id={'precioEsNegociable'}
                  type={'selection'}
                  labelText={'Precio Negociable'}
                  opciones={['Si', 'No']}
                  value={postDetails.carro.precioEsNegociable}
                  onChange={handleChangeValues}
                  required
                />
                <Input
                  id={'puertas'}
                  type={'number'}
                  labelText={'Puertas'}
                  value={postDetails.carro.puertas}
                  onChange={handleChangeValues}
                  required
                  min={1}
                  max={6}
                />
                <Input
                  id={'motor'}
                  type={'text'}
                  labelText={'Motor'}
                  value={postDetails.carro.motor}
                  onChange={handleChangeValues}
                  required
                  minLength={3}
                  maxLength={20}
                />
                <Input
                  id={'kilometraje'}
                  type={'number'}
                  labelText={'Kilómetros'}
                  value={postDetails.carro.kilometraje}
                  onChange={handleChangeValues}
                  required
                  min={0}
                  max={100000}
                />
                <Input
                  id={'year'}
                  type={'number'}
                  labelText={'Año'}
                  value={postDetails.carro.year}
                  onChange={handleChangeValues}
                  required
                  min={1919}
                  max={year}
                />
                <Input
                  id={'descripcion'}
                  type={'textarea'}
                  labelText={'Descripción'}
                  value={postDetails.descripcion}
                  onChange={handleChangeDescription}
                  required
                  minLength={10}
                  maxLength={100}
                />
                <button
                  className='app-btn'
                  onClick={(e) => { handlePostUpdate(e, postDetails, year) }}
                  disabled={userId !== postDetails.usuarioID ? true : false}
                >
                  Actualizar Publicación
                </button>
              </form>
            ) : null}
            <div className='form-pics'>
              <CargarFotos />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
