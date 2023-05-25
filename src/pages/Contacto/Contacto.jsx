import { Form } from '../../components/Form/Form';
import './Contacto.css';
export const Contacto = () => {
  const onSubmitContacto = (data) => {
    console.log(data);
  };
  return (
    <div className='app-contact'>
      <Form
        inputsIds={['nombre', 'email-contacto', 'asunto', 'mensaje']}
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

      <section>
        <div className='app-contact__info'>
          <h1 className='app-contact__title'>Contáctanos</h1>
          <p>
            Llena el formulario y nuestro equipo se pondrá en <br />
            contacto contigo tan rápido como sea posible.
          </p>
        </div>

        <div className='app-contact__info'>
          <div>
            <i className='fa-solid fa-envelope'></i>
            <h2 className='app-contact__subtitle'>Comunicación general</h2>
          </div>
          <p>
            Para dudas, problemas o sugerencias envía <br /> un correo
            electrónico a:{' '}
            <span className='app-underlineformat'>example@example.com</span>
          </p>
        </div>

        <div className='app-contact__info'>
          <div>
            <i className='fa-solid fa-circle-question'></i>
            <h2 className='app-contact__subtitle'>Preguntas frecuentes</h2>
          </div>
          <p>
            Si tienes preguntas, por favor dirigite aquí{' '}
            <span className='app-underlineformat'>FAQ</span>
          </p>
        </div>
      </section>
    </div>
  );
};
