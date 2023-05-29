import { Modal } from '../Modal/Modal';
import { Form } from '../Form/Form';
import PropTypes from 'prop-types';
import registroImg from '../../assets/img/registro/registroImg.png';
import './Registro.css';
export const Registro = ({ handleShowRegistro }) => {
  return (
    <Modal width={800} heigth={700} handleModal={handleShowRegistro}>
      <div className='registro-container'>
        <div className='container__welcomed'>
          <div className='welcomed__title'>
            <h2>Hola!</h2>
            <h2>Bienvenido otra vez.</h2>
          </div>
          <div className='welcomed__img'>
            <img src={registroImg} alt='vector that animates people to login' />
          </div>
          <div className='welcomed__no-account'>
            <b>
              <p>¿No tienes una cuenta?</p>
            </b>
            <p onClick={() => console.log('bien')}>Creala aqui</p>
          </div>
        </div>
        <div className='container__form'>
          <div className='google-login'>
            <button>Google</button>
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
                    maxLength: 50,
                    minLength: 8,
                  },
                },
                {
                  type: 'password',
                  id: 'password',
                  label: 'Contraseña',
                  placeHolder: 'Digita tu contraseña',
                  validacion: {
                    required: true,
                    maxLength: 50,
                    minLength: 8,
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
    </Modal>
  );
};

Registro.propTypes = {
  handleShowRegistro: PropTypes.func,
};
