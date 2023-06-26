import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import './Alert.css';
import { useState } from 'react';

export const Alert = (props) => {
    const {
        title,
        message,
        type,
        setShowModal
    } = props;

    const containerAlert = useRef();
    const alertBodyRed = useRef();

    const [iconModal, setIconModal] = useState('');

    useEffect(() => {
        const areDefined = alertBodyRed.current
        if (areDefined) {
            if (type === 'error') {
                alertBodyRed.current.style.backgroundColor = 'lightcoral';
                alertBodyRed.current.style.border = '1px solid red';
                setIconModal("error");
            }
            if (type === 'alerta') {
                alertBodyRed.current.style.backgroundColor = 'lightyellow';
                alertBodyRed.current.style.border = '1px solid yellow';
                setIconModal("alerta");
            }
            if (type === 'exito') {
                alertBodyRed.current.style.backgroundColor = 'lightgreen';
                alertBodyRed.current.style.border = '1px solid green';
                setIconModal("exito");
            }
        }
    }, [type]);

    return (
        <>
            <div ref={containerAlert} className='container-alert'>
                <div ref={alertBodyRed} className='alert__body'>

                    <button onClick={() => { setShowModal(false) }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <div className={`icon-modal ${type}`}>
                        {(iconModal === 'error') ? (
                            <i className="fa-solid fa-triangle-exclamation icon "></i>
                        ) : null}
                        {(iconModal === 'alerta') ? (
                            <i className="fa-solid fa-circle-exclamation icon"></i>
                        ) : null}
                        {(iconModal === 'exito') ? (
                            <i className="fa-solid fa-circle-check icon"></i>
                        ) : null}
                    </div>

                    <div className='text-alert'>
                        <div className='body-title'>
                            <h2>{title}</h2>
                        </div>

                        <div className='body-content'>
                            <p>{message}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    setShowModal: PropTypes.func.isRequired
};