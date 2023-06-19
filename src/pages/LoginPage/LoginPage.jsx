//import PropTypes from 'prop-types';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import logInImg from '../../assets/img/login/LoginImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { getError } from '../../redux/usuario/selectors';
import { logIn } from '../../redux/usuario/thunk';
import { useEffect, useState } from 'react';
import { Alert } from '../../components/Alert/Alert';
import { resetValores } from '../../redux/usuario/actions';

export const LoginPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');

  const error = useSelector(getError);
  useEffect(() => {
    if (error) {
      console.log('acá estoy');
      setShowAlert(true);
      setAlertMessage(error);
      setAlertTitle('Intenta de nuevo');
      setAlertType('error');
    }
  }, [error]);

  useEffect(() => {
    if (!showAlert) {
      dispatch(resetValores());
    }
  }, [showAlert]);
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
          <div className='form-login'>
            <Form
              inputs={[
                {
                  type: 'email',
                  id: 'email',
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
                  id: 'contrasena',
                  label: 'Contraseña',
                  placeHolder: 'Digita tu contraseña',
                  validacion: {
                    required: true,
                  },
                  error: {
                    required: 'La contraseña es obligatoria.',
                  },
                },
              ]}
              btnText={'Iniciar sesión'}
              onSubmit={(data) => {
                dispatch(logIn(data));
                history('/');
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
