import PropTypes from 'prop-types';
import './IconoPerfil.css';
export const IconoPerfil = ({ srcImagenPerfil }) => {
  return (
    <div className='app-iconoPerfil'>
      <img src={srcImagenPerfil} alt='Foto de perfil' />
    </div>
  );
};

IconoPerfil.propTypes = {
  srcImagenPerfil: PropTypes.string.isRequired,
};
