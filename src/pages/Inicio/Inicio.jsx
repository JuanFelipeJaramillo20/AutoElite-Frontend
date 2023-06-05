import { useEffect } from 'react';
//import homeCar from '../../assets/img/inicio/homeCar.png';
import jdcar from '../../assets/img/inicio/finished-transformed.png';
import backgroundLine from '../../assets/img/inicio/backgroundLine.png';
import carRoad from '../../assets/img/inicio/carRoad.png';
import roadLine from '../../assets/img/inicio/roadLine.png';
import carroJuandaInicioUno from '../../assets/img/inicio/carroJuanda.jpeg';
import carroJuandaInicioDos from '../../assets/img/inicio/elMejor.jpeg';
import carroJuandaInicioTres from '../../assets/img/inicio/si.jpeg';

import { CardCar } from '../../components/CardCar/CardCar';

import { PUBLICACION, CARROS } from '../../../constants';

import './inicio.css';

export const Inicio = () => {
  const razones = [
    {
      id: 1,
      razon_titulo: 'Razon 1',
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
      id: 2,
      razon_titulo: 'Razon 2',
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
      id: 3,
      razon_titulo: 'Razon 3',
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
      id: 4,
      razon_titulo: 'Razon 4',
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
      id: 5,
      razon_titulo: 'Razon 5',
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
      id: 6,
      razon_titulo: 'Razon 6',
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
  ];
  const carrosJuanda = [
    carroJuandaInicioUno,
    carroJuandaInicioDos,
    carroJuandaInicioTres,
  ];

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
                <b>Texto épico para encontrar carro</b>
              </h2>
            </header>

            <article>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
            <p>Ver más</p>
          </header>
          <article className='offer-section__content'>
            <div className='offer-car__container'>
              {PUBLICACION.map((el, id) => {
                return id < 3 ? (
                  <CardCar
                    key={el.IDCarro}
                    ciudadVenta={el.Ciudad}
                    idPublicacion={el.IDPublicación}
                    kilometraje={CARROS[id].Kilómetros}
                    marcaCarro={CARROS[id].Marca}
                    modeloCarro={CARROS[id].Modelo}
                    precio={CARROS[id].Precio}
                    tipoCombustible={CARROS[id].Combustible}
                    tipoTransmision={CARROS[id].Transmisión}
                    yearCarro={CARROS[id].Año}
                    srcImageCar={carrosJuanda[id]}
                    usado={CARROS[id].Usado}
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
