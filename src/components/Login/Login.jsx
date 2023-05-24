import { Modal } from "../Modal/Modal";
import { Form } from '../Form/Form';

import logInImg from '../../assets/img/login/LoginImg.png';

import './Login.css';
export const Login = () => {
    return (
        <>
            <Modal width={800} heigth={600}>
                <div className="logIn-container">
                    <div className="container__welcomed">
                        <div className="welcomed__title">
                            <h2>
                                Hola!
                            </h2>
                            <h2>
                                Bienvenido otra vez.
                            </h2>
                        </div>
                        <div className="welcomed__img">
                            <img src={logInImg} alt="vector that animates people to login" />
                        </div>
                        <div className="welcomed__no-account">
                            <b>
                                <p>
                                    ¿No tienes una cuenta?
                                </p>
                            </b>
                            <p>
                                Creala aqui
                            </p>
                        </div>
                    </div>
                    <div className="container__form">
                        <div className="google-login">
                            <button>Google</button>
                        </div>
                        <div className="form-login">
                            <Form
                                inputsIds={[
                                    'email',
                                    'password'
                                ]}
                                labelTextInputs={[
                                    'Correo electrónico',
                                    'Contraseña'
                                ]}
                                placeHolders={[
                                    'Digita tu correo electrónico',
                                    'Digita tu contraseña'
                                ]}
                                typesInputs={[
                                    'email',
                                    'password'
                                ]}
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
                                onSubmit={(data) => { console.log(data) }}
                            />
                        </div>
                        <div className="form_forgot-password">
                            <p>Olvidé la contraseña</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
