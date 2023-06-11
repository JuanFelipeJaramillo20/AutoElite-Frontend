import { NavLink } from 'react-router-dom';
import './OpcionesPerfil.css';
export const OpcionesPerfil = () => {
  const handleCloseMenu = () => {};
  return (
    <div className='app-configuracion__sideBar'>
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
