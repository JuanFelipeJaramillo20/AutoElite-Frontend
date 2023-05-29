
import { useEffect, useState } from "react";
import { Form } from "../../components/Form/Form";
import { CargarFotos } from '../../components/CargarFotos/CargarFotos';

import './CrearPublicacion.css';
export const CrearPublicacion = () => {

  const [year, setYear] = useState(0);

  useEffect(() => {
    let currentYear = new Date(Date.now()).getFullYear();
    setYear(currentYear);
  }, [])

  return (
    <>
      <section className="create-post">
        <header className="post__title">
          <h2>
            Rellena el formulario para crear tú publicación
          </h2>
        </header>
        <article className="post__form">
          <div className="form">
            <Form
              inputs={[
                {
                  type: 'text',
                  id: 'nombre-vahiculo',
                  label: 'Nombre',
                  placeHolder: 'Digita el nombre del vehículo',
                  validacion: {
                    required: true,
                    minLength: 1,
                    maxLength: 20,
                  },
                  error: {
                    required: 'El nombre del vehículo es obligatorio.',
                    minLength: 'Mínimo 1 caracteres.',
                    maxLength: 'Máximo 20 caracteres'
                  },
                },
                {
                  type: 'selection',
                  id: 'estado-vehiculo',
                  label: 'Estado',
                  options: ['Nuevo', 'Usado'],
                  error: {
                    notDefaultOpt: 'Debes seleccionar otra opción.',
                  },
                },
                {
                  type: 'number',
                  id: 'precio-vahiculo',
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
                    max: 'Precio máximo $1.000.000.000'
                  },
                },
                {
                  type: 'selection',
                  id: 'negociable-vehiculo',
                  label: 'Precio negociable',
                  options: ['Si', 'No'],
                  error: {
                    notDefaultOpt: 'Debes seleccionar otra opción.',
                  },
                },
                {
                  type: 'text',
                  id: 'modelo-vahiculo',
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
                    maxLength: 'Máximo 20 caracteres'
                  },
                },
                {
                  type: 'text',
                  id: 'marca-vehiculo',
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
                    maxLength: 'Máximo 20 caracteres'
                  },
                },
                {
                  type: 'text',
                  id: 'color-vehiculo',
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
                    maxLength: 'Máximo 20 caracteres'
                  },
                },
                {
                  type: 'text',
                  id: 'transmision-vehiculo',
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
                    maxLength: 'Máximo 20 caracteres'
                  },
                },
                {
                  type: 'text',
                  id: 'ciudad-vehiculo',
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
                    maxLength: 'Máximo 30 caracteres'
                  },
                },
                {
                  type: 'text',
                  id: 'combustible-vehiculo',
                  label: 'Combustible',
                  placeHolder: 'Digita el tipo de combustible del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  },
                  error: {
                    required: 'El tipo de combustible del vehículo es obligatoria.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres'
                  },
                },
                {
                  type: 'number',
                  id: 'puertas-vehiculo',
                  label: 'Puertas',
                  placeHolder: 'Digita la cantidad de puertas del vehículo',
                  validacion: {
                    required: true,
                    min: 1,
                    max: 10,
                  },
                  error: {
                    required: 'La cantidad de puertas del vehículo es obligatoria.',
                    min: 'Mínimo una puerta.',
                    max: 'Máximo 10 puertas'
                  },
                },
                {
                  type: 'text',
                  id: 'motor-vehiculo',
                  label: 'Motor',
                  placeHolder: 'Digita el motor del vehículo',
                  validacion: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  },
                  error: {
                    required: 'El motor del vehículo es obligatorio.',
                    minLength: 'Mínimo 3 caracteres.',
                    maxLength: 'Máximo 20 caracteres'
                  },
                },
                {
                  type: 'number',
                  id: 'kilometros-vehiculo',
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
                    max: 'Máximo 200000'
                  },
                },
                {
                  type: 'number',
                  id: 'año-vehiculo',
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
                    max: `Año máximo ${year}`
                  },
                },
                {
                  type: 'textarea',
                  id: 'descripción-vehiculo',
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
                    maxLength: 'Máximo 100 caracteres'
                  },
                },
              ]}
              btnText={'Crear vehículo'}
              onSubmit={(data) => {
                console.log(data);
              }}
            />
            <div className="form-pics">
              <CargarFotos />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};