import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from '../../components/Form/Form';
import { Alert } from '../../components/Alert/Alert';

import registroImg from '../../assets/img/registro/registroImg.png';

import './Register.css';

export const RegisterPage = () => {
  const history = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = async (newUser) => {
    try {
      const response = await fetch('http://localhost:8082/api/v1/usuarios', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert ? (
        <Alert title={'Algo salio mal'} message={'bad request'} />
      ) : null}
      <div className='registro-container--p'>
        <div className='container__welcomed--p'>
          <div className='welcomed__title--p'>
            <h2>Empieza esta aventura</h2>
            <h2>con nosotros!</h2>
          </div>
          <div className='welcomed__information--p'>
            <div>
              <i className='fa-solid fa-circle-check'></i>
              <p>Publica tus carros.</p>
            </div>
            <div>
              <i className='fa-solid fa-circle-check'></i>
              <p>Descubre carros.</p>
            </div>
            <div>
              <i className='fa-solid fa-circle-check'></i>
              <p>Maneja tu lista de deseados.</p>
            </div>
          </div>
          <div className='welcomed__img--p'>
            <img src={registroImg} alt='vector that animates people to login' />
          </div>
        </div>
        <div className='welcomed__no-account--p'>
          <b>
            <p>¿Ya tienes una cuenta?</p>
          </b>
          <p>
            <span
              onClick={() => {
                history('/login');
              }}
            >
              Inicia sesión aquí
            </span>
          </p>
        </div>
        <div className='container__form--p'>
          <div className='form-register'>
            <Form
              inputs={[
                {
                  type: 'text',
                  id: 'nombre-registro',
                  label: 'Nombre completo:',
                  placeHolder: 'Escribe tu nombre completo',
                  validacion: {
                    required: true,
                  },
                  error: {
                    required: 'El nombre es obligatorio',
                  },
                },
                {
                  type: 'email',
                  id: 'email-registro',
                  label: 'Correo electrónico:',
                  placeHolder: 'Digita tu correo electrónico',
                  validacion: {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  },
                  error: {
                    required: 'El correo electrónico es obligatorio.',
                    pattern: 'Correo electrónico no válido',
                  },
                },
                {
                  type: 'text',
                  id: 'phone-registro',
                  label: 'Teléfono:',
                  placeHolder: 'Teléfono',
                  validacion: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  },
                  error: {
                    required: 'La contraseña es obligatoria.',
                    minLength: 'Mínimo 10 caracteres.',
                    maxLength: 'Máximo 10 caracteres.',
                  },
                },
                {
                  type: 'password',
                  id: 'password-registro',
                  label: 'Crear contraseña:',
                  placeHolder: 'Contraseña',
                  validacion: {
                    required: true,
                    minLength: 8,
                  },
                  error: {
                    required: 'La contraseña es obligatoria.',
                    minLength: 'Mínimo 8 caracteres.',
                  },
                },
              ]}
              btnText={'Registrate'}
              onSubmit={(newUser) => {
                console.log(newUser);
                handleRegister(newUser);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
