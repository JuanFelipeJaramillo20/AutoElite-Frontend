import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import './Contacto.css';
import emailjs from '@emailjs/browser';
import { Alert } from '../../components/Alert/Alert';
import { useState } from 'react';
import { guardarMensaje } from '../../helpers/guardarMensaje';
export const Contacto = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');
  const onSubmitContacto = (data, reset) => {
    emailjs
      .sendForm(
        'service_v833vlm',
        'template_4f9v03u',
        '#contactForm',
        'TKQEjfF3R4qahFGZW'
      )
      .then(
        () => {
          guardarMensaje(data);
          setShowAlert(true);
          setAlertTitle('Correo enviado.');
          setAlertMessage('Correo enviado con éxito. Te contactamos pronto.');
          setAlertType('exito');
        },
        () => {
          setShowAlert(true);
          setAlertTitle('Correo no enviado.');
          setAlertMessage('No se pudo enviar el mensaje.');
          setAlertType('error');
        }
      );
    reset();
  };

  return (
    <div className='app-contact'>
      {showAlert ? (
        <Alert
          title={alertTitle}
          message={alertMessage}
          type={alertType}
          setShowModal={setShowAlert}
        />
      ) : null}
      <Form
        idForm='contactForm'
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
            <span
              className='app-underlineformat'
              onClick={() => navigate('/preguntasFrecuentes')}
            >
              FAQ
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};
