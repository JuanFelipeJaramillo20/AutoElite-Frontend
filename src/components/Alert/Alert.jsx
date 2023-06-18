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
    const alertColorRef = useRef();
    const alertBodyRed = useRef();

    const [iconModal, setIconModal] = useState('');
    const [containerAlertWidth, setContainerAlertWidth] = useState(0);

    useEffect(() => {
        const areDefined = alertColorRef.current
        if (areDefined) {
            if (type === 'error') {
                alertColorRef.current.style.backgroundColor = 'red';
                //alertColorRef.current.classList.add('error');
                setIconModal("error");
            }
            if (type === 'alerta') {
                //alertColorRef.current.classList.add('alerta');
                alertColorRef.current.style.backgroundColor = 'yellow';
                setIconModal("alerta");
            }
            if (type === 'exito') {
                //alertColorRef.current.classList.add('exito');
                alertColorRef.current.style.backgroundColor = 'green';
                setIconModal("exito");
            }
        }
    }, [type]);

    useEffect(() => {
        const handleResize = () => {
            const areDefined = containerAlert.current && alertColorRef.current && alertBodyRed.current;
            if (areDefined) {
                setContainerAlertWidth(window.innerWidth * 0.98);
                containerAlert.current.style.width = containerAlertWidth + 'px';
                const widthNew = alertBodyRed.current.offsetWidth;
                alertColorRef.current.style.width = `${widthNew + 20}px`;
            }
        };
        handleResize();
    }, [containerAlertWidth]);

    useEffect(() => {
        const handleResize = () => {
            const areDefined = containerAlert.current && alertColorRef.current && alertBodyRed.current;
            if (areDefined) {
                setContainerAlertWidth(window.innerWidth * 0.98);
                containerAlert.current.style.width = containerAlertWidth + 'px';
                const widthNew = alertBodyRed.current.offsetWidth;
                alertColorRef.current.style.width = `${widthNew + 20}px`;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, [containerAlertWidth]);

    return (
        <>
            <div ref={containerAlert} className='container-alert'>
                <div ref={alertBodyRed} className='alert__body'>

                    <div ref={alertColorRef} className='line'>
                        <button onClick={() => { setShowModal(false) }}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className='icon-modal'>
                        {(iconModal === 'error') ? (
                            <i className="fa-solid fa-triangle-exclamation icon-error "></i>
                        ) : null}
                        {(iconModal === 'alerta') ? (
                            <i className="fa-solid fa-circle-exclamation icon-alerta"></i>
                        ) : null}
                        {(iconModal === 'exito') ? (
                            <i className="fa-solid fa-circle-check icon-exito"></i>
                        ) : null}
                    </div>

                    <div className='body-title'>
                        <h2>{title}</h2>
                    </div>

                    <div className='body-content'>
                        <p>{message}</p>
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