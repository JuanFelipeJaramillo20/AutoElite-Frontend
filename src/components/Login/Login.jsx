import { Modal } from '../Modal/Modal';
import { Form } from '../Form/Form';
import PropTypes from 'prop-types';
import logInImg from '../../assets/img/login/LoginImg.png';

import './Login.css';
import { Registro } from '../Registro/Registro';
import { logIn } from '../../redux/usuario/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getError } from '../../redux/usuario/selectors';
import { useEffect, useState } from 'react';
import { Alert } from '../Alert/Alert';
import { resetValores } from '../../redux/usuario/actions';

export const Login = ({ handleShowModal, pageToShow, changePageToShow }) => {
  const dispatch = useDispatch();

  const error = useSelector(getError);
  const isAuth = useSelector(getAuth);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleLogin = (data) => {
    dispatch(logIn(data));
  };

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
    if (isAuth) {
      handleShowModal();
    }
  }, [isAuth]);

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
      {pageToShow === 'registro' ? (
        <Registro
          handleShowModal={handleShowModal}
          handleShowPage={() => {
            changePageToShow('login');
          }}
        />
      ) : (
        <Modal width={800} heigth={600} handleModal={handleShowModal}>
          <div className='logIn-container'>
            <div className='container__welcomed'>
              <div className='welcomed__title'>
                <h2>Hola!</h2>
                <h2>Bienvenido otra vez.</h2>
              </div>
              <div className='welcomed__img'>
                <img
                  src={logInImg}
                  alt='vector that animates people to login'
                />
              </div>
              <div className='welcomed__no-account'>
                <b>
                  <p>¿No tienes una cuenta?</p>
                </b>
                <p onClick={() => changePageToShow('registro')}>Creala aquí</p>
              </div>
            </div>
            <div className='container__form'>
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
                  onSubmit={(data) => handleLogin(data)}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

Login.propTypes = {
  handleShowModal: PropTypes.func,
  pageToShow: PropTypes.string,
  changePageToShow: PropTypes.func,
};
