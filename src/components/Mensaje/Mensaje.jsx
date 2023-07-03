import PropTypes from 'prop-types';
import { formatearFecha } from '../../helpers/formatoFecha';
import { IconoPerfil } from '../IconoPerfil/IconoPerfil';
import './Mensaje.css';
export const Mensaje = ({ infoSender, mensaje, fotoSender }) => {
  return (
    <div className='app-mensaje'>
      <IconoPerfil srcImagenPerfil={fotoSender} />
      <p>
        <span className='mensaje--resaltado'>De:</span>
        {infoSender.nombre}
      </p>
      <p>
        <i className='fa-solid fa-inbox'></i>
        {infoSender.email}
      </p>
      <div className='app-mensaje__info'>
        <p>
          <span className='mensaje--resaltado'>Asunto:</span>
          {mensaje.asunto}
        </p>
        <p>
          <span className='mensaje--resaltado'>Mensaje:</span>
          {mensaje.mensaje}
        </p>
      </div>
      <p>
        <span className='mensaje--resaltado'>Telefono:</span>
        {infoSender.tel}
      </p>
      <p>{formatearFecha(mensaje.fecha)}</p>
    </div>
  );
};

Mensaje.propTypes = {
  infoSender: PropTypes.object,
  mensaje: PropTypes.object,
  fotoSender: PropTypes.string,
};
