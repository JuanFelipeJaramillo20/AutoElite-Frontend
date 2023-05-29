import { Modal } from '../Modal/Modal';
import { Form } from '../Form/Form';
import PropTypes from 'prop-types';
import registroImg from '../../assets/img/registro/registroImg.png';
import './Registro.css';
export const Registro = ({ handleShowRegistro, handleShowLogin }) => {
  return (
    <Modal width={900} heigth={750} handleModal={handleShowRegistro}>
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
            <img src={registroImg} alt='vector that animates people to login' />
          </div>
          <div className='welcomed__no-account'>
            <b>
              <p>¿Ya tienes una cuenta?</p>
            </b>
            <p onClick={handleShowLogin}>Inicia sesión aquí</p>
          </div>
        </div>
        <div className='container__form'>
          <div className='google-login'>
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
    </Modal>
  );
};

Registro.propTypes = {
  handleShowRegistro: PropTypes.func,
  handleShowLogin: PropTypes.func,
};
