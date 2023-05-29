
import { Form } from "../../components/Form/Form";

import './CrearPublicacion.css';
export const CrearPublicacion = () => {

  return (
    <>
      <section className="create-post">
        <header className="post__title">
          <h2>
            Rellena el formulario para crear tú publicación
          </h2>
        </header>
        <article className="post__form">
          <div className="form-pao">
            <Form
              inputsIds={[
                'modelo-vehiculo',
                'marca-vehiculo',
                'color-vehiculo',
                'transmision-vehiculo',
                'ciudad-vehiculo',
                'combustible-vehiculo',
                'puertas-vehiculo',
                'motor-vehiculo',
                'kilometros-vehiculo',
                'año-vehiculo',
              ]}
              typesInputs={[
                'text',
                'text',
                'text',
                'text',
                'text',
                'text',
                'number',
                'text',
                'number',
                'date'
              ]}
              labelTextInputs={[
                'Modelo',
                'Marca',
                'Color',
                'Transmisión',
                'Ciudad',
                'Combustible',
                'Puertas',
                'Motor',
                'Kilómetros',
                'Año',
              ]}
              placeHolders={[
                'Modelo del vehículo',
                'Marca del vehículo',
                'Color del vehículo',
                'Transmisión del vehículo',
                'Ciudad',
                'Tipo de combustible',
                'Número de puertas',
                'Motor',
                'Kilómetros',
                'Año',
              ]}
              validacionesEnInputs={[
                {//modelo
                  required: true,
                  maxLength: 20,
                  minLength: 1,
                },
                {//marca
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
                {//color
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
                {//transmisión
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
                {//ciudad
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
                {//tipo combustible
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
                {//número puertas
                  required: true,
                  min: 2,
                  max: 10,
                },
                {//motor
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
                {//kilómetros
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
                {//año
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                },
              ]}
              btnText={'Crear publicación'}
              onSubmit={(data) => {
                console.log(data)
              }}
            />
          </div>
        </article>
      </section>
    </>
  );
};