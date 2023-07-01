import PropTypes from 'prop-types';
import './Boton.css';
export const Boton = (props) => {
  const { classIcon, texto, tipo, onClick, isDisabled } = props;
  return (
    <button
      className='app-btn'
      type={tipo}
      onClick={onClick}
      disabled={isDisabled}
    >
      {classIcon && <i className={classIcon}> </i>}
      {texto}
    </button>
  );
};

Boton.propTypes = {
  classIcon: PropTypes.string,
  texto: PropTypes.string,
  tipo: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};
