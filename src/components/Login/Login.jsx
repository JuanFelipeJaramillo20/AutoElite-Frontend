import { Modal } from '../Modal/Modal';
import { Form } from '../Form/Form';
import PropTypes from 'prop-types';
import logInImg from '../../assets/img/login/LoginImg.png';

import './Login.css';
import { useState } from 'react';
import { Registro } from '../Registro/Registro';
export const Login = ({ handleShowLogin }) => {
  const [showRegistro, setShowRegistro] = useState(false);
  const handleRegistro = () => {
    setShowRegistro(true);
  };
  return (
    <>
      {showRegistro ? (
        <Registro
          handleShowRegistro={() => {
            setShowRegistro(false);
            handleShowLogin(false);
          }}
        />
      ) : (
        <Modal width={800} heigth={600} handleModal={handleShowLogin}>
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
                <p onClick={handleRegistro}>Creala aqui</p>
              </div>
            </div>
            <div className='container__form'>
              <div className='google-login'>
                <button>Google</button>
              </div>
              <div className='form-login'>
                <Form
                  inputsIds={['email-login', 'password']}
                  labelTextInputs={['Correo electrónico', 'Contraseña']}
                  placeHolders={[
                    'Digita tu correo electrónico',
                    'Digita tu contraseña',
                  ]}
                  typesInputs={['email', 'password']}
                  validacionesEnInputs={[
                    {
                      required: true,
                      maxLength: 50,
                      minLength: 8,
                    },
                    {
                      required: true,
                      maxLength: 50,
                      minLength: 8,
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
        </Modal>
      )}
    </>
  );
};

Login.propTypes = {
  handleShowLogin: PropTypes.func,
};
