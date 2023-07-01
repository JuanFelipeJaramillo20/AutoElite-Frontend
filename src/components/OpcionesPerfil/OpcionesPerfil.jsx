import { NavLink } from 'react-router-dom';
import './OpcionesPerfil.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmail,
  getImagen,
  getNombre,
  getNroTel,
  getRol,
} from '../../redux/usuario/selectors';
import { IconoPerfil } from '../IconoPerfil/IconoPerfil';
import { logOut } from '../../redux/usuario/thunk';
import React from 'react';
export const OpcionesPerfil = () => {
  const nombre = useSelector(getNombre);
  const tel = useSelector(getNroTel);
  const correo = useSelector(getEmail);
  const imgPerfil = useSelector(getImagen);
  const rol = useSelector(getRol);
  const dispatch = useDispatch();
  const handleCloseMenu = () => {
    dispatch(logOut());
  };
  return (
    <div className='app-configuracion__sideBar'>
      <IconoPerfil srcImagenPerfil={imgPerfil} />
      <div className='app-configuracion__personalInfo'>
        <p>{nombre}</p>
        <p>{tel}</p>
        <p>{correo}</p>
      </div>
      <ul className='app-configuracion__lstOp'>
        <li>
          <NavLink to='/miPerfil'>
            <span>
              <i className='fa-solid fa-gear'></i>
            </span>{' '}
            Configuración
          </NavLink>
        </li>
        <li>
          <NavLink to='/misPublicaciones'>
            <span>
              <i className='fa-solid fa-car-side'></i>
            </span>{' '}
            publicaciones
          </NavLink>
        </li>
        {rol === 'USER' && (
          <React.Fragment>
            <li>
              <NavLink to='/favoritos'>
                <span>
                  <i className='fa-solid fa-heart-circle-plus'></i>
                </span>{' '}
                Favoritos
              </NavLink>
            </li>
            <li>
              <NavLink to='/misReseñas'>
                <span>
                  <i className='fa-solid fa-star painted'></i>
                </span>{' '}
                Reseñas
              </NavLink>
            </li>
          </React.Fragment>
        )}
        <li>
          <NavLink onClick={handleCloseMenu}>
            <span>
              <i className='fa-solid fa-right-from-bracket'></i>
            </span>{' '}
            Cerrar sesión
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
