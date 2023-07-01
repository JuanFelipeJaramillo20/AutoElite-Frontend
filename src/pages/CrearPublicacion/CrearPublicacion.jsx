import { useEffect, useState, useCallback } from 'react';

import { Form } from '../../components/Form/Form';
import { CargarFotos } from '../../components/CargarFotos/CargarFotos';
import { Alert } from '../../components/Alert/Alert';

import { v4 as uuidv4 } from 'uuid';

import { crearPublicacion } from '../../redux/publicaciones/thunk';

import './CrearPublicacion.css';
import { useSelector } from 'react-redux';
import { getId, getToken } from '../../redux/usuario/selectors';
import { guardarImagen } from '../../helpers/guardarImagen';

export const CrearPublicacion = () => {
  const token = useSelector(getToken);
  const idCreador = useSelector(getId);
  const [year, setYear] = useState(0);
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');
  useEffect(() => {
    let currentYear = new Date(Date.now()).getFullYear();
    setYear(currentYear);
  }, []);

  const handlePostCreation = useCallback(async (data, files = [], reset) => {
    if (files.length >= 4) {
      const thisDate = `${new Date(Date.now()).getFullYear()}-${new Date(
        Date.now()
      ).getMonth()}-${new Date(Date.now()).getDate()}`;
      const imagenes = await guardarImagen(files);
      if (imagenes.length !== 0) {
        const newPost = {
          id: `${uuidv4()}`,
          fechaPublicacion: thisDate,
          ciudad: data.ubicacion,
          usuarioId: idCreador,
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
            imagenes: imagenes,
          },
          descripcion: data.descripcion,
        };
        const response = await crearPublicacion(newPost, token);
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
          reset();
        }
      }
    } else {
      setAlertTitle('Elige 5 imagenes');
      setAlertMessage('Por favor selecciona 5 imagenes.');
      setAlertType('error');
      setShowAlert(true);
    }
  }, []);

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
                  placeholder: 'Digita la placa del vehículo',
                  validacion: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                  },
                  error: {
                    required: 'La placa del vehículo es obligatoria.',
                    minLength: 'Mínimo 6 caracteres.',
                    maxLength: 'Máximo 6 caracteres',
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
                  placeholder: 'Digita el precio del vehículo',
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
                  placeholder: 'Digita el modelo del vehículo',
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
                  placeholder: 'Digita la marca del vehículo',
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
                  placeholder: 'Digita el color del vehículo',
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
                  type: 'selection',
                  id: 'transmision',
                  label: 'Transmisión',
                  options: [
                    'Automática',
                    'Mecánica',
                    'Semiautomática',
                    'Secuencial',
                    'Manual',
                  ],
                  error: {
                    notDefaultOpt: 'Debes seleccionar otra opción.',
                  },
                },
                {
                  type: 'text',
                  id: 'ciudad',
                  label: 'Ciudad del carro',
                  placeholder: 'Digita la ciudad del vehículo',
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
                  id: 'ubicacion',
                  label: 'Ubicación',
                  placeholder: 'Digita la Ubicación del vehículo',
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
                  type: 'selection',
                  id: 'combustible',
                  label: 'Combustible',
                  options: ['Gasolina', 'Diesel', 'Híbrido', 'Eléctrico'],
                  error: {
                    notDefaultOpt: 'Debes seleccionar otra opción.',
                  },
                },
                {
                  type: 'number',
                  id: 'puertas',
                  label: 'Puertas',
                  placeholder: 'Digita la cantidad de puertas del vehículo',
                  validacion: {
                    required: true,
                    min: 1,
                    max: 6,
                  },
                  error: {
                    required:
                      'La cantidad de puertas del vehículo es obligatoria.',
                    min: 'Mínimo una puerta.',
                    max: 'Máximo 6 puertas',
                  },
                },
                {
                  type: 'text',
                  id: 'motor',
                  label: 'Motor',
                  placeholder: 'Digita el motor del vehículo',
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
                  placeholder: 'Digita los kilómetros del vehículo',
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
                  placeholder: 'Digita el año del vehículo',
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
                  placeholder: 'Da una descripción del vehículo',
                  validacion: {
                    required: true,
                    maxLength: 1000,
                  },
                  error: {
                    required: 'La descripción del vehículo es obligatoria.',
                    maxLength: 'Máximo 100 caracteres',
                  },
                },
              ]}
              btnText={'Crear vehículo'}
              onSubmit={(data, reset) => handlePostCreation(data, files, reset)}
            />
            <div className='form-pics'>
              <CargarFotos
                setFiles={(filesSelected) => setFiles(filesSelected)}
              />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
