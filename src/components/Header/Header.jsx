import { NavLink } from 'react-router-dom';
import './Header.css';
import { Login } from '../Login/Login';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/usuario/selectors';
import { IconoPerfil } from '../IconoPerfil/IconoPerfil';
import { Boton } from '../Boton/Boton';
export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isLoggedIn = useSelector(getAuth);
  return (
    <header className='app-header'>
      <div className='app-header__navigation'>
        <h1 className='app-header__title'>autoElite</h1>
        <nav>
          <NavLink className='app-navlink' to='/'>
            Inicio
          </NavLink>
          <NavLink className='app-navlink' to='/catalogo'>
            Catálogo
          </NavLink>
          <NavLink className='app-navlink' to='/contacto'>
            Contáctanos
          </NavLink>
        </nav>
      </div>
      {isLoggedIn ? (
        <div className='app-header__logged-in'>
          <IconoPerfil srcImagenPerfil='/src/assets/img/perfil/perfil-ejemplo.jpg' />
          <Boton
            classIcon='fa-solid fa-plus'
            texto='Nueva publicación'
            tipo='btn'
          />
          <i
            className='fa-solid fa-heart'
            onClick={() => console.log('estás acá')}
          ></i>
        </div>
      ) : (
        <div className='app-header__sign-in' onClick={() => setShowLogin(true)}>
          <i className='fa-solid fa-user'></i>
          <span>Sign in</span>
        </div>
      )}
      {showLogin && <Login handleShowLogin={() => setShowLogin(false)} />}
    </header>
  );
};
