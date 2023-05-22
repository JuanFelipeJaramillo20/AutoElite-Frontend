import { Form } from '../../components/Form/Form';
import './Contacto.css';
export const Contacto = () => {
  const onSubmitContacto = (data) => {
    console.log(data);
  };
  return (
    <div className='app-contact'>
      <Form
        inputsIds={['nombre', 'email', 'asunto', 'mensaje']}
        labelTextInputs={[
          'Nombre completo',
          'Correo electrónico',
          'Asunto del correo',
          'Mensaje',
        ]}
        placeHolders={[
          'Ingresa tu nombre completo',
          'Ingresa tu correo electrónico',
          'Ingresa el asunto del correo',
          '¿Qué mensaje quieres enviar?',
        ]}
        typesInputs={['text', 'email', 'text', 'textarea']}
        validacionesEnInputs={[
          { required: true },
          { required: true },
          { required: true },
          { required: true },
          { required: true },
        ]}
        btnText='Enviar mensaje'
        onSubmit={onSubmitContacto}
      />

      <div className='app-contact__info'>
        <div>
          <h1>Contáctanos</h1>
          <p>
            Llena el formulario y nuestro equipo se pondrá en contacto contigo
            tan rápido como sea posible.
          </p>
        </div>

        <div>
          <h2>Comunicación general</h2>
          <p>
            Para dudas, problemas o sugerencias envía un correo electrónico a:{' '}
            <span>example@example.com</span>
          </p>
        </div>

        <div>
          <h2>Preguntas frecuentes</h2>
          <p>
            Si tienes preguntas, por favor dirigite aquí <span>FAQ</span>
          </p>
        </div>
      </div>
    </div>
  );
};
