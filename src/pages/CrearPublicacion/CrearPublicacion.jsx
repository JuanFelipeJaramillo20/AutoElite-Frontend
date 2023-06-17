import { useEffect, useState, useCallback } from 'react';

import { Form } from '../../components/Form/Form';
import { CargarFotos } from '../../components/CargarFotos/CargarFotos';
import { Alert } from '../../components/Alert/Alert';

import { v4 as uuidv4 } from 'uuid';

import { crearPublicacion } from '../../redux/publicaciones/thunk';

import './CrearPublicacion.css';

export const CrearPublicacion = () => {
  const [year, setYear] = useState(0);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  useEffect(() => {
    let currentYear = new Date(Date.now()).getFullYear();
    setYear(currentYear);
  }, []);

  const handlePostCreation = useCallback(async (data) => {
    const thisDate = `${new Date(Date.now()).getFullYear()}-${new Date(
      Date.now()
    ).getMonth()}-${new Date(Date.now()).getDate()}`;

    const newPost = {
      id: `${uuidv4()}`,
      fechaPublicacion: thisDate,
      ciudad: data.ciudad,
      usuarioId: 1,
      carro: {
        puertas: data.puertas,
        motor: data.motor,
        ciudad: data.ciudad,
        marca: data.marca,
        placa: data.placa,
        color: data.color,
        tipo: data.tipo,
        combustible: data.combustible,
        year: data.year,
        estado: data.estado,
        transmision: data.transmision,
        precio: parseFloat(data.precio),
        kilometraje: parseInt(data.kilometraje),
        precioEsNegociable: data.precioEsNegociable === 'si' ? true : false,
      },
      descripcion: data.descripcion,
    };

    const response = await crearPublicacion(newPost);
    if (response) {
      setAlertMessage('Intenta otra vez');
      setAlertTitle('Error');
      setShowAlert(true);
      setShowAlert(true);
    } else {
      setAlertTitle('Publicado');
      setAlertMessage('La publicación fue creada');
      setShowAlert(true);
    }
  }, []);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert ? <Alert title={alertTitle} message={alertMessage} /> : null}
      <section className='create-post'>
        <header className='post__title'>
          <h2>Rellena el formulario para crear tú publicación</h2>
        </header>
        <article className='post__form'>
          <div className='form'>
            <Form
              inputs={[
                {
                  type: 'text',
                  id: 'placa',
                  label: 'Placa',
                  placeHolder: 'Digita la placa del vehículo',
                  validacion: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                  },
                  error: {
                    required: 'La descripción del vehículo es obligatoria.',
                    minLength: 'Mínimo 10 caracteres.',
                    maxLength: 'Máximo 100 caracteres',
                  },
                },
                {
                  type: 'selection',
                  id: 'estado',
                  label: 'Estado',
                  options: ['Nuevo', 'Usado'],
                  error: {
                    notDefaultOpt: 'Debes seleccionar otra opción.',
                  },
                },
                {
                  type: 'number',
                  id: 'precio',
                  label: 'Precio',
                  placeHolder: 'Digita el precio del vehículo',
                  validacion: {
                    required: true,
                    min: 1,
                    max: 1000000000,
                  },
                  error: {
                    required: 'El precio del vehículo es obligatorio.',
                    min: 'Precio mínimo $1.',
                    max: 'Precio máximo $1.000.000.000',
                  },
                },
                {
                  type: 'selection',
                  id: 'precioEsNegociable',
                  label: 'Precio negociable',
                  options: ['Si', 'No'],
                  error: {
                    notDefaultOpt: 'Debes seleccionar otra opción.',
                  },
                },
                {
                  type: 'text',
                  id: 'tipo',
                  label: 'Modelo',
                  placeHolder: 'Digita el modelo del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  },
                  error: {
                    required: 'El modelo del vehículo es obligatorio.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres',
                  },
                },
                {
                  type: 'text',
                  id: 'marca',
                  label: 'Marca',
                  placeHolder: 'Digita la marca del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  },
                  error: {
                    required: 'La marca del vehículo es obligatoria.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres',
                  },
                },
                {
                  type: 'text',
                  id: 'color',
                  label: 'Color',
                  placeHolder: 'Digita el color del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  },
                  error: {
                    required: 'El color del vehículo es obligatorio.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres',
                  },
                },
                {
                  type: 'text',
                  id: 'transmision',
                  label: 'Transmisión',
                  placeHolder: 'Digita la transmisión del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  },
                  error: {
                    required: 'La transmisión del vehículo es obligatoria.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres',
                  },
                },
                {
                  type: 'text',
                  id: 'ciudad',
                  label: 'Ciudad',
                  placeHolder: 'Digita la ciudad del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                  },
                  error: {
                    required: 'La ciudad del vehículo es obligatoria.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 30 caracteres',
                  },
                },
                {
                  type: 'text',
                  id: 'combustible',
                  label: 'Combustible',
                  placeHolder: 'Digita el tipo de combustible del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  },
                  error: {
                    required:
                      'El tipo de combustible del vehículo es obligatoria.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres',
                  },
                },
                {
                  type: 'number',
                  id: 'puertas',
                  label: 'Puertas',
                  placeHolder: 'Digita la cantidad de puertas del vehículo',
                  validacion: {
                    required: true,
                    min: 1,
                    max: 10,
                  },
                  error: {
                    required:
                      'La cantidad de puertas del vehículo es obligatoria.',
                    min: 'Mínimo una puerta.',
                    max: 'Máximo 10 puertas',
                  },
                },
                {
                  type: 'text',
                  id: 'motor',
                  label: 'Motor',
                  placeHolder: 'Digita el motor del vehículo',
                  validacion: {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  },
                  error: {
                    required: 'El motor del vehículo es obligatorio.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres',
                  },
                },
                {
                  type: 'number',
                  id: 'kilometraje',
                  label: 'Kilómetros',
                  placeHolder: 'Digita los kilómetros del vehículo',
                  validacion: {
                    required: true,
                    min: 0,
                    max: 100000,
                  },
                  error: {
                    required: 'Los kilómetros del vehículo son obligatorios.',
                    min: 'Mínimo 0 kilómetros.',
                    max: 'Máximo 200000',
                  },
                },
                {
                  type: 'number',
                  id: 'year',
                  label: 'Año',
                  placeHolder: 'Digita el año del vehículo',
                  validacion: {
                    required: true,
                    min: 1919,
                    max: year,
                  },
                  error: {
                    required: 'El año del vehículo es obligatorio.',
                    min: 'Año mínimo 1919.',
                    max: `Año máximo ${year}`,
                  },
                },
                {
                  type: 'textarea',
                  id: 'descripcion',
                  label: 'Descripción',
                  placeHolder: 'Da una descripción del vehículo',
                  validacion: {
                    required: true,
                    minLength: 10,
                    maxLength: 100,
                  },
                  error: {
                    required: 'La descripción del vehículo es obligatoria.',
                    minLength: 'Mínimo 10 caracteres.',
                    maxLength: 'Máximo 100 caracteres',
                  },
                },
              ]}
              btnText={'Crear vehículo'}
              onSubmit={handlePostCreation}
            />
            <div className='form-pics'>
              <CargarFotos />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
