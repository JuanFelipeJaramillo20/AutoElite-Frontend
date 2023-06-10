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

  const headerContainerRef = useRef();
  const profileRef = useRef();
  const windowInformationRef = useRef();
  const headerMobileAnimationRef = useRef();
  const firstLineBurgerBtnRef = useRef();
  const secondLineBurgerBtnRef = useRef();
  const thirdLineBurgerBtnRef = useRef();
  const headerOptionsRef = useRef();

  const [showInformationProfile, setShowInformationProfile] = useState(false);
  const [isADefinedObjet, setIsADefinedObject] = useState(false);

  const [isScrolling, setScrolling] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const showNavbar = () => {
    setShowModal(false);
    navRef.current.classList.toggle('app-header__responsive-navigation');
  };

  useEffect(() => {
    const resizeCalc = () => {
      setWindowWidth(window.innerWidth);
      if (headerContainerRef.current) {
        if (windowWidth > 920) {
          headerOptionsRef.current.style.display = 'contents';
          headerOptionsRef.current.style.opacity = '1';
          document.body.style.overflow = 'visible';
        } else {
          headerOptionsRef.current.style.display = 'none';
          headerOptionsRef.current.style.opacity = '0';
          document.body.style.overflow = 'visible';
        }
      }
    };
    resizeCalc();
    window.addEventListener('resize', resizeCalc);

    return () => {
      window.removeEventListener('resize', resizeCalc);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth >= 920 && showModal) {
      if (
        window.location.pathname === '/login' ||
        window.location.pathname === '/registro'
      ) {
        navigate('/');
      }
    } else if (windowWidth < 920 && showModal) {
      if (toPage === 'registro') {
        navigate('/registro');
      } else {
        navigate('/login');
      }
    }
  }, [windowWidth, showModal, toPage]);

  useEffect(() => {
    function handleScroll() {
      const scroll = window.scrollY;
      if (headerContainerRef.current) {
        const noScrolling = headerContainerRef.current.getClientRects()[0].height
        if (scroll > noScrolling) {
          headerContainerRef.current.style.transform = `translateY(-100%)`;
          clearTimeout(isScrolling);

          setShowInformationProfile(false);
          setIsADefinedObject(false);

          setScrolling(() => {
            setTimeout(() => {
              setScrolling(false);
              headerContainerRef.current.style.transform = `translateY(0%)`;
            }, 500);
          });
        } else {
          headerContainerRef.current.style.transform = `translateY(0%)`;
        }
      }
    }
    handleScroll();
    //window.addEventListener('scroll', handleScroll);

    /*return () => {
      window.removeEventListener('scroll', handleScroll);
    };*/
  }, []);

  useEffect(() => {
    const divContainerProfile = document.querySelector('.app-header__logged-in');
    profileRef.current = divContainerProfile?.querySelector('.app-iconoPerfil');

    const handleShowInfoWindow = () => {
      setIsADefinedObject(true);
      setShowInformationProfile(true);
    };
    const handleHideInfoWindow = () => {
      setIsADefinedObject(false);
      setShowInformationProfile(false);
    };

    if (profileRef.current) {
      profileRef.current.addEventListener('mouseenter', handleShowInfoWindow);
      divContainerProfile.addEventListener('mouseleave', handleHideInfoWindow);
      if (isADefinedObjet) {
        windowInformationRef.current.addEventListener('mouseleave', handleHideInfoWindow)
      }
    }

    return () => {
      if (profileRef.current) {
        profileRef.current.removeEventListener('mouseenter', handleShowInfoWindow);
        divContainerProfile.removeEventListener('mouseleave', handleHideInfoWindow);
      }
    };
  }, [isADefinedObjet]);

  function handleMenuBton(isOpen) {
    const isDefined = firstLineBurgerBtnRef && secondLineBurgerBtnRef && thirdLineBurgerBtnRef;
    if (isDefined) {
      if (isOpen) {
        firstLineBurgerBtnRef.current.style.transform = 'translateY(10px) rotate(45deg)';
        secondLineBurgerBtnRef.current.style.opacity = '0';
        thirdLineBurgerBtnRef.current.style.transform = 'translateY(-10px) rotate(-45deg)';
        document.body.style.overflow = 'hidden';
      } else {
        firstLineBurgerBtnRef.current.style.transform = 'translateY(0px) rotate(0deg)';
        secondLineBurgerBtnRef.current.style.opacity = '1';
        thirdLineBurgerBtnRef.current.style.transform = 'translateY(-0px) rotate(-0deg)';
        document.body.style.overflow = 'visible';
      }
    }
  }


  function handleMenu() {
    if (windowWidth <= 920) {
      const isDefined = headerMobileAnimationRef.current;
      if (isDefined) {
        if (!isOpen) {
          headerMobileAnimationRef.current.style.animation = 'showMenuContainer 0.3s linear forwards';
          headerOptionsRef.current.style.display = 'block';
          setTimeout(() => {
            headerOptionsRef.current.style.opacity = '1';
          }, 300);
          handleMenuBton(!isOpen);
          setIsOpen(!isOpen);
        } else {
          headerMobileAnimationRef.current.style.animation = 'hideMenuContainer 0.3s linear forwards';
          setTimeout(() => {
            headerOptionsRef.current.style.display = 'none';
          }, 300);
          headerOptionsRef.current.style.opacity = '0';
          handleMenuBton(!isOpen);
          setIsOpen(!isOpen);
        }
      }
    }

  }

  function handleCloseMenu() {
    if (windowWidth <= 920) {
      const isDefined = headerMobileAnimationRef.current
      if (isDefined) {
        headerMobileAnimationRef.current.style.animation = 'hideMenuContainer 0.3s linear forwards';
        setTimeout(() => {
          headerOptionsRef.current.style.display = 'none';
        }, 300);
        headerOptionsRef.current.style.opacity = '0';
        handleMenuBton(!isOpen);
        setIsOpen(!isOpen);
      }
    }
  }

  return (
    <>
      <div ref={headerContainerRef} className='header-app__container'>
        {windowWidth ? (
          <>
            <div ref={headerMobileAnimationRef} className='header-animation'></div>
            <div className='header-animation__header'>
              <button onClick={handleMenu}>
                <span ref={firstLineBurgerBtnRef}></span>
                <span ref={secondLineBurgerBtnRef}></span>
                <span ref={thirdLineBurgerBtnRef}></span>
              </button>
            </div>
          </>
        ) : null}
        <header className='app-header'>
          <h1 className='app-header__title'>autoElite</h1>
          <div ref={headerOptionsRef} className='header__options'>
            <div ref={navRef} className='app-header__navigation'>
              <nav className='nav-normal'>
                <NavLink onClick={() => {
                  showNavbar();
                  handleCloseMenu();
                }} className='app-navlink' to='/'>
                  Inicio
                </NavLink>
                <NavLink
                  onClick={() => {
                    showNavbar();
                    handleCloseMenu();
                  }}
                  className='app-navlink'
                  to='/catalogo'
                >
                  Catálogo
                </NavLink>
                <NavLink
                  onClick={() => {
                    showNavbar();
                    handleCloseMenu();
                  }}
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
                    onClick={() => {
                      navigate('/publicacion/nueva');
                      handleCloseMenu();
                    }}
                  />
                  {showInformationProfile ? (
                    <>
                      <div ref={windowInformationRef} className='information-profile__header'>
                        <ol>
                          <li>
                            <NavLink
                              to='/configuracion'
                              onClick={handleCloseMenu}
                            >
                              <span><i className="fa-solid fa-gear"></i></span> Configuración
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to='/publicaciones'
                              onClick={handleCloseMenu}
                            >
                              <span><i className="fa-solid fa-car-side"></i></span> publicaciones
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to='/Favoritos'
                              onClick={handleCloseMenu}
                            >
                              <span><i className="fa-solid fa-heart-circle-plus"></i></span> Favoritos
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to='/Reseñas'
                              onClick={handleCloseMenu}
                            >
                              <span><i className="fa-solid fa-star painted"></i></span> Reseñas
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to='/cerrarSesio'
                              onClick={handleCloseMenu}
                            >
                              <span><i className="fa-solid fa-right-from-bracket"></i></span> Cerrar sesión
                            </NavLink>
                          </li>
                        </ol>
                      </div>
                    </>
                  ) : null}
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
                  <span onClick={handleMenu}>
                    Sign in
                  </span>
                </div>
              )}
            </div>
            <button className='app-navBtn' onClick={handleMenu}>
              <FaBars onClick={showNavbar} />
            </button>
            {showModal && windowWidth > 920 ? (
              <Login
                handleShowModal={() => setShowModal(false)}
                pageToShow={toPage}
                changePageToShow={(page) => setToPage(page)}
              />
            ) : null}
          </div>
        </header>
      </div>
    </>
  );
};
