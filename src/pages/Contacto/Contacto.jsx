import { Form } from '../../components/Form/Form';
import './Contacto.css';
export const Contacto = () => {
  const onSubmitContacto = (data, reset) => {
    console.log(data);
    reset();
  };
  return (
    <div className='app-contact'>
      <Form
        inputs={[
          {
            type: 'text',
            id: 'nombre',
            label: 'Nombre completo:',
            placeHolder: 'Ingresa tu nombre completo',
            validacion: { required: true },
            error: {
              required: 'Campo obligatorio.',
            },
          },
          {
            type: 'email',
            id: 'email-contacto',
            label: 'Correo electrónico:',
            placeHolder: 'Ingresa tu correo electrónico',
            validacion: {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            },
            error: {
              required: 'Campo obligatorio.',
              pattern: 'Email no válido.',
            },
          },
          {
            type: 'text',
            id: 'asunto',
            label: 'Asunto del correo:',
            placeHolder: 'Ingresa el asunto del correo',
            validacion: { required: true },
            error: {
              required: 'Campo obligatorio.',
            },
          },
          {
            type: 'textarea',
            id: 'mensaje',
            label: 'Mensaje: ',
            placeHolder: '¿Qué mensaje quieres enviar?',
            validacion: { required: true },
            error: {
              required: 'Campo obligatorio.',
            },
          },
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
