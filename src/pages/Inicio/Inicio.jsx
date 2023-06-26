import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//import homeCar from '../../assets/img/inicio/homeCar.png';
import jdcar from '../../assets/img/inicio/finished-transformed.png';
import backgroundLine from '../../assets/img/inicio/backgroundLine.png';
import carRoad from '../../assets/img/inicio/carRoad.png';
import roadLine from '../../assets/img/inicio/roadLine.png';
import carroJuandaInicioUno from '../../assets/img/inicio/carroJuanda.jpeg';
import carroJuandaInicioDos from '../../assets/img/inicio/elMejor.jpeg';
import carroJuandaInicioTres from '../../assets/img/inicio/si.jpeg';

import { CardCar } from '../../components/CardCar/CardCar';

import { cargarPublicaciones } from '../../redux/publicaciones/thunk';
import { getPublicaciones } from '../../redux/publicaciones/selectors';
import { getRol } from '../../redux/usuario/selectors';

import './inicio.css';

export const Inicio = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const publicaciones = useSelector(getPublicaciones);
  const userRole = useSelector(getRol);

  useEffect(() => {
    if (publicaciones.length === 0) {
      dispatch(cargarPublicaciones());
    }
  }, []);

  const razones = [
    {
      id: 1,
      razon_titulo: 'Un catálogo completo.',
      texto:
        'Nuestro extenso catálogo te permitirá explorar diferentes  características y precios para que encuentres el carro que se adapte perfectamente a tus preferencias y necesidades.',
    },
    {
      id: 2,
      razon_titulo: 'Publica tu carro',
      texto:
        'Si estás buscando vender tu carro, nuestra página es el lugar ideal para publicarlo. Puedes crear anuncios detallados con imágenes, descripciones y datos relevantes.',
    },
    {
      id: 3,
      razon_titulo: 'Información de vendedores',
      texto:
        'Proporcionamos detalles de los vendedores, incluyendo su reputación, opiniones de otros compradores e información de contacto.',
    },
    {
      id: 4,
      razon_titulo: 'Fácil filtrado.',
      texto:
        'Con una interfaz intuitiva y herramientas de búsqueda avanzadas, podrás explorar y filtrar los carros según tus preferencias, como marca, modelo, año, precio y más.',
    },
    {
      id: 5,
      razon_titulo: 'Guarda tus favoritos.',
      texto:
        'Agrega publicaciones a tu lista de favoritos y recupéralas fácilmente más tarde. Nunca pierdas de vista los carros que te interesan y ten acceso rápido a ellos cuando lo desees.',
    },
    {
      id: 6,
      razon_titulo: 'Seguridad de datos garantizada',
      texto:
        'Nos comprometemos a proteger tus datos personales de forma segura. Puedes confiar en que tus datos estarán protegidos y que nos tomamos en serio la privacidad de nuestros usuarios. ',
    },
  ];

  const carrosJuanda = [
    carroJuandaInicioUno,
    carroJuandaInicioDos,
    carroJuandaInicioTres,
  ];

  useEffect(() => {
    if (userRole === 'ADMIN') {
      navigate('/inicioAdmin');
    }
  }, [navigate, userRole]);

  useEffect(() => {
    const reasonCar = document.getElementById('little-car__movement');
    const aboutSection = document.querySelector('.about-section');
    const offerSection = document.querySelector('.offer-section');
    const homeCar = document.getElementById('home-car');

    const areDefinedElements =
      reasonCar && aboutSection && homeCar && offerSection ? true : false;

    function handleScrollEvent() {
      const scroll = scrollY + window.innerHeight;
      const simpleScroll = scrollY;

      if (areDefinedElements) {
        const isVisibleAboutSection = scroll > aboutSection.offsetTop;
        const isInHomeSection = simpleScroll < offerSection.offsetTop;

        if (isInHomeSection) {
          const increment = simpleScroll * 0.0001;
          homeCar.style.transform = `scale(${0.8 + increment})`;
        }

        if (isVisibleAboutSection) {
          const movement = scroll - aboutSection.offsetTop;
          reasonCar.style.transform = `translateY(${-50 + movement * 0.12}px)`;
        }
      }
    }
    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <>
      <main className='home'>
        <section className='intro-section'>
          <div className='intro-section__background-line'>
            <img src={backgroundLine} alt='background line for home section' />
          </div>
          <div className='intro-section__table'>
            <header>
              <h2>
                <b>Descubre carros en un solo lugar</b>
              </h2>
            </header>

            <article>
              <p>
                Explora nuestra página y encuentra una amplia variedad de carros
                o crea tu propia publicación para dar visibilidad a tu carro.
                ¡Sumérgete en una experiencia única y descubre el vehículo de
                tus sueños hoy mismo!
              </p>
            </article>
          </div>

          <div className='intro-section__image'>
            <img
              id='home-car'
              src={jdcar}
              alt='Home car'
              width={780}
              height={596}
            />
          </div>
        </section>

        <section className='offer-section'>
          <header className='offer-section__header'>
            <h2>últimas ofertas</h2>
            <p
              className='app-inicio__verMas'
              onClick={() => navigate('/catalogo')}
            >
              Ver más
            </p>
          </header>
          <article className='offer-section__content'>
            <div className='offer-car__container'>
              {publicaciones?.map((publicacion, id) => {
                return id < 3 ? (
                  <CardCar
                    key={publicacion.idPublicacion}
                    ciudadVenta={publicacion.carroPublicacion.ciudad}
                    idPublicacion={publicacion.idPublicacion}
                    kilometraje={publicacion.carroPublicacion.kilometraje}
                    marcaCarro={publicacion.carroPublicacion.marca}
                    modeloCarro={publicacion.carroPublicacion.tipo}
                    precio={publicacion.carroPublicacion.precio}
                    tipoCombustible={publicacion.carroPublicacion.combustible}
                    tipoTransmision={publicacion.carroPublicacion.transmision}
                    yearCarro={publicacion.carroPublicacion.year}
                    srcImageCar={carrosJuanda[id]}
                    estado={publicacion.carroPublicacion.estado}
                  />
                ) : null;
              })}
            </div>
          </article>
        </section>

        <section className='about-section'>
          <header className='about-section__title'>
            <h2>¿Por qué nosotros?</h2>
          </header>
          <article>
            <table className='about-section__table-reason'>
              <tbody>
                {razones.map((razon) => {
                  if (razon.id <= 3) {
                    return (
                      <tr key={razon.id}>
                        <td className='table-reason__left-side'>
                          <h3>{razon.razon_titulo}</h3>
                          <p>{razon.texto}</p>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
              <tbody id='middle-side'>
                <tr>
                  <td className='table-reason__middle-side'>
                    <div>
                      <img
                        id='little-car__movement'
                        src={carRoad}
                        alt='Little car'
                      />
                    </div>
                    <div>
                      <img src={roadLine} alt='road line for the little car' />
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody>
                {razones.map((razon) => {
                  if (razon.id > 3) {
                    return (
                      <tr key={razon.id}>
                        <td className='table-reason__rigth-side'>
                          <h3>{razon.razon_titulo}</h3>
                          <p>{razon.texto}</p>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </article>
        </section>
      </main>
    </>
  );
};
