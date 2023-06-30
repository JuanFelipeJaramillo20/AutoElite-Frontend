import PropTypes from 'prop-types';
import './IconoPerfil.css';

export const IconoPerfil = ({ srcImagenPerfil }) => {
  return (
    <div className='app-iconoPerfil'>
      {srcImagenPerfil ? (
        <img src={srcImagenPerfil} alt='Foto de perfil' />
      ) : (
        <img src='/src/assets/img/perfil/usuario.png' alt='Foto de perfil' />
      )}
    </div>
  );
};

IconoPerfil.propTypes = {
  srcImagenPerfil: PropTypes.string,
};
