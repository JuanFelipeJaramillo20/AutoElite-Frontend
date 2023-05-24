import PropTypes from 'prop-types';
import './Boton.css';
export const Boton = (props) => {
  const { imageSrc, descripcionImg, texto, tipo, onClick } = props;
  return (
    <button className='app-btn' type={tipo} onClick={onClick}>
      {texto}
      {imageSrc && <img src={imageSrc} alt={descripcionImg}></img>}
    </button>
  );
};

Boton.propTypes = {
  imageSrc: PropTypes.string,
  descripcionImg: PropTypes.string,
  texto: PropTypes.string,
  tipo: PropTypes.string,
  onClick: PropTypes.func,
};