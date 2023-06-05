//import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Form } from '../../components/Form/Form';
import logInImg from '../../assets/img/login/LoginImg.png';

import './LoginPage.css';

export const LoginPage = () => {
  const history = useNavigate();
  return (
    <>
      <div className='logIn-container--p'>
        <div className='container__welcomed--p'>
          <div className='welcomed__title--p'>
            <h2>Hola!</h2>
            <h2>Bienvenido otra vez.</h2>
          </div>
          <div className='welcomed__img--p'>
            <img src={logInImg} alt='vector that animates people to login' />
          </div>
        </div>
        <div className='welcomed__no-account--p'>
          <b>
            <p>¿No tienes una cuenta?</p>
          </b>
          <p>
            <span
              onClick={() => {
                history('/registro');
              }}
            >
              Creala aquí
            </span>
          </p>
        </div>
        <div className='container__form--p'>
          <div className='google-login--p'>
            <button>Ingresar con Google</button>
          </div>
          <div className='form-login'>
            <Form
              inputs={[
                {
                  type: 'email',
                  id: 'email-login',
                  label: 'Correo electrónico',
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
                  type: 'password',
                  id: 'password',
                  label: 'Contraseña',
                  placeHolder: 'Digita tu contraseña',
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
              btnText={'Iniciar sesión'}
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </div>
          <div className='form_forgot-password'>
            <p>Olvidé la contraseña</p>
          </div>
        </div>
      </div>
    </>
  );
};
