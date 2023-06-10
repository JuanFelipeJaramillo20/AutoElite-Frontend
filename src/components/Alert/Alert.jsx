import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import './Alert.css';
import { useState } from 'react';

export const Alert = (props) => {
    const {
        title,
        message,
    } = props;

    const containerAlert = useRef();
    const [containerAlertWidth, setContainerAlertWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const isDefined = containerAlert.current;
            if (isDefined) {
                setContainerAlertWidth(window.innerWidth * 0.98);
                containerAlert.current.style.width = containerAlertWidth + 'px';
            }
        };
        handleResize();
    }, [containerAlertWidth]);

    useEffect(() => {
        const handleResize = () => {
            const isDefined = containerAlert.current;
            if (isDefined) {
                setContainerAlertWidth(window.innerWidth * 0.98);
                containerAlert.current.style.width = containerAlertWidth + 'px';
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
                <div className='alert__body'>
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
    title: PropTypes.string,
    message: PropTypes.string,
};