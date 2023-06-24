import { useSelector } from 'react-redux';
import { OpcionesPerfil } from '../../../../components/OpcionesPerfil/OpcionesPerfil';
import { getEmail } from '../../../../redux/usuario/selectors';
import { Publicaciones } from '../../../../components/Publicaciones/Publicaciones';
import './MisPublicaciones.css';

export const MisPublicaciones = () => {
  const correo = useSelector(getEmail);
  return (
    <div className='app-configuracion'>
      <OpcionesPerfil />
      <div className='app-configuracion__misPublicaciones'>
        <p className='app-misPublicaciones__info'>
          Acá encontrarás las publicaciones que has realizado. <br />
          Editalas o eliminelas.
        </p>
        <Publicaciones userEmail={correo} showOpt={true} />
      </div>
    </div>
  );
};
