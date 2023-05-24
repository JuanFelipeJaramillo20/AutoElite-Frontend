import PropTypes from 'prop-types';
import { useState } from 'react';

import './Modal.css';

export const Modal = (props) => {
    const {
        width,
        heigth,
        children,
    } = props;

    const [isCloseModal, setCloseModal] = useState(true);

    function handleCloseModal() {
        const modalContainer = document.querySelector('.modal-container');
        if (isCloseModal) {
            modalContainer.style.display = 'none';
            setCloseModal(true);
        }
    }

    return (
        <>
            <div className="modal-container">
                <div className="modal" style={{ width: `${width}px`, height: `${heigth}px` }}>
                    <div className='modal__close-bton'>
                        <button onClick={handleCloseModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
};

Modal.propTypes = {
    width: PropTypes.number,
    heigth: PropTypes.number,
    children: PropTypes.object.isRequired,
};
