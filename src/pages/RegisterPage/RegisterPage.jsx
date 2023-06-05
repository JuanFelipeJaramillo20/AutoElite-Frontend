import { useNavigate } from 'react-router-dom';

import { Form } from '../../components/Form/Form';

import registroImg from '../../assets/img/registro/registroImg.png';

import './Register.css';

export const RegisterPage = () => {
  const history = useNavigate();
  return (
    <>
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
          <div className='google-login--p'>
            <button>Registro con Google</button>
          </div>
          <div className='form-login'>
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
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
