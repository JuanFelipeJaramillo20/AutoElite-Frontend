import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/usuario/selectors';
import { IconoPerfil } from '../IconoPerfil/IconoPerfil';
import { Boton } from '../Boton/Boton';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Login } from '../Login/Login';
export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [toPage, setToPage] = useState('login');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const navRef = useRef();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getAuth);
  const showNavbar = () => {
    setShowModal(false);
    navRef.current.classList.toggle('app-header__responsive-navigation');
  };
  const resizeCalc = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeCalc);
    return () => {
      window.removeEventListener('resize', resizeCalc);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 920 && showModal) {
      navigate('/');
    } else if (windowWidth < 920 && showModal) {
      if (toPage === 'registro') {
        navigate('/registro');
      } else {
        navigate('/login');
      }
    }
  }, [windowWidth, showModal, toPage]);
  return (
    <>
      <header className='app-header'>
        <h1 className='app-header__title'>autoElite</h1>
        <div ref={navRef} className='app-header__navigation'>
          <nav>
            <NavLink onClick={showNavbar} className='app-navlink' to='/'>
              Inicio
            </NavLink>
            <NavLink
              onClick={showNavbar}
              className='app-navlink'
              to='/catalogo'
            >
              Catálogo
            </NavLink>
            <NavLink
              onClick={showNavbar}
              className='app-navlink'
              to='/contacto'
            >
              Contáctanos
            </NavLink>
            <button className='app-navBtn app-closeBtn'>
              <FaTimes onClick={showNavbar} />
            </button>
          </nav>
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
            <div
              className='app-header__sign-in'
              onClick={() => {
                showNavbar();
                setToPage('login');
                setShowModal(true);
              }}
            >
              <i className='fa-solid fa-user'></i>
              <span>Sign in</span>
            </div>
          )}
        </div>
        <button className='app-navBtn'>
          <FaBars onClick={showNavbar} />
        </button>
        {showModal && windowWidth > 920 ? (
          <Login
            handleShowModal={() => setShowModal(false)}
            pageToShow={toPage}
            changePageToShow={(page) => setToPage(page)}
          />
        ) : null}
      </header>
    </>
  );
};
