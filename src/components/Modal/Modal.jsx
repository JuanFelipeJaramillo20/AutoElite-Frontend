import PropTypes from 'prop-types';

import './Modal.css';

export const Modal = (props) => {
  const { width, heigth, children, handleModal } = props;

  return (
    <>
      <div className='modal-container'>
        <div
          className='modal'
          style={{ width: `${width}px`, height: `${heigth}px` }}
        >
          <div className='modal__close-bton'>
            <button onClick={handleModal}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  width: PropTypes.number,
  heigth: PropTypes.number,
  children: PropTypes.object.isRequired,
  handleModal: PropTypes.func,
};
