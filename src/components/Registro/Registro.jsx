import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import { Modal } from '../Modal/Modal';
import { Form } from '../Form/Form';
import { Alert } from '../Alert/Alert';

import { register } from '../../redux/usuario/thunk';

import registroImg from '../../assets/img/registro/registroImg.png';

import './Registro.css';

export const Registro = ({ handleShowModal, handleShowPage }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleRegister = useCallback(
    async (newUser) => {
      const registerResult = await register(newUser);
      if (registerResult) {
        setAlertMessage(registerResult);
        setAlertTitle('Error');
        setAlertType('error');
        setShowAlert(true);
      } else {
        setAlertTitle('Bienvenido');
        setAlertMessage('Por favor inicia sesión');
        setAlertType('exito');
        setShowAlert(true);
        setTimeout(() => {
          handleShowPage('login');
        }, 10000);
      }
    },
    [handleShowPage]
  );

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
      <div className='register-container__modal'>
        <Modal width={900} heigth={750} handleModal={handleShowModal}>
          <div className='registro-container'>
            <div className='container__welcomed'>
              <div className='welcomed__title'>
                <h2>Empieza esta aventura</h2>
                <h2>con nosotros!</h2>
              </div>
              <div className='welcomed__information'>
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
              <div className='welcomed__img'>
                <img
                  src={registroImg}
                  alt='vector that animates people to login'
                />
              </div>
              <div className='welcomed__no-account'>
                <b>
                  <p>¿Ya tienes una cuenta?</p>
                </b>
                <p onClick={handleShowPage}>Inicia sesión aquí</p>
              </div>
            </div>
            <div className='container__form'>
              <div className='form-register'>
                <Form
                  inputs={[
                    {
                      type: 'text',
                      id: 'nombres',
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
                      id: 'email',
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
                      id: 'telefono',
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
                      id: 'contrasena',
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
                    handleRegister(newUser);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

Registro.propTypes = {
  handleShowModal: PropTypes.func,
  handleShowPage: PropTypes.func,
};
