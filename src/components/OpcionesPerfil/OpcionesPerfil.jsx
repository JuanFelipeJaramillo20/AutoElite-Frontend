import { NavLink } from 'react-router-dom';
import './OpcionesPerfil.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEmail, getNombre, getNroTel } from '../../redux/usuario/selectors';
import { IconoPerfil } from '../IconoPerfil/IconoPerfil';
import { logOut } from '../../redux/usuario/thunk';
export const OpcionesPerfil = () => {
  const nombre = useSelector(getNombre);
  const tel = useSelector(getNroTel);
  const correo = useSelector(getEmail);
  const dispatch = useDispatch();
  const handleCloseMenu = () => {
    dispatch(logOut());
  };
  return (
    <div className='app-configuracion__sideBar'>
      <IconoPerfil srcImagenPerfil='/src/assets/img/perfil/usuario.png' />
      <div className='app-configuracion__personalInfo'>
        <p>{nombre}</p>
        <p>{tel}</p>
        <p>{correo}</p>
      </div>
      <li className='app-configuracion__lstOp'>
        <NavLink to='/miPerfil'>
          <span>
            <i className='fa-solid fa-gear'></i>
          </span>{' '}
          Configuración
        </NavLink>
        <NavLink to='/misPublicaciones'>
          <span>
            <i className='fa-solid fa-car-side'></i>
          </span>{' '}
          publicaciones
        </NavLink>

        <NavLink to='/favoritos'>
          <span>
            <i className='fa-solid fa-heart-circle-plus'></i>
          </span>{' '}
          Favoritos
        </NavLink>

        <NavLink to='/misReseñas'>
          <span>
            <i className='fa-solid fa-star painted'></i>
          </span>{' '}
          Reseñas
        </NavLink>

        <NavLink onClick={handleCloseMenu}>
          <span>
            <i className='fa-solid fa-right-from-bracket'></i>
          </span>{' '}
          Cerrar sesión
        </NavLink>
      </li>
    </div>
  );
};
