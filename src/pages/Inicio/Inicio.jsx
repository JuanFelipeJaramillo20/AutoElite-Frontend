import { useState, useEffect } from 'react';

import homeCar from '../../assets/img/inicio/homeCar.png';
import backgroundLine from '../../assets/img/inicio/backgroundLine.png';
import carRoad from '../../assets/img/inicio/carRoad.png';
import roadLine from '../../assets/img/inicio/roadLine.png';

import './inicio.css';

import { Login } from '../../components/Login/Login';

export const Inicio = () => {

  const [razonesAmmount] = useState(Array.from({ length: 3 }));

  useEffect(() => {
    const reasonCar = document.getElementById('little-car__movement');
    const aboutSection = document.querySelector('.about-section');
    const offerSection = document.querySelector('.offer-section');
    const homeCar = document.getElementById('home-car');

    const areDefinedElements = (reasonCar && aboutSection && homeCar && offerSection) ? true : false;

    function handleScrollEvent() {
      const scroll = scrollY + (window.innerHeight);
      const simpleScroll = scrollY;

      if (areDefinedElements) {
        const isVisibleAboutSection = scroll > aboutSection.offsetTop;
        const isInHomeSection = simpleScroll < offerSection.offsetTop;

        if (isInHomeSection) {
          const increment = simpleScroll * 0.0001
          homeCar.style.transform = `scale(${0.8 + increment})`;
        }

        if (isVisibleAboutSection) {
          const movement = scroll - aboutSection.offsetTop;
          reasonCar.style.transform = `translateY(${-50 + (movement * 0.12)}px)`;
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
      <Login />
      <main className='home'>
        <section className='intro-section'>
          <div className='intro-section__background-line'>
            <img src={backgroundLine} alt="background line for home section" />
          </div>
          <div className='intro-section__table'>
            <header>
              <h2>
                <b>Texto épico para encontrar carro</b>
              </h2>
            </header>

            <article>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </article>
          </div>

          <div className='intro-section__image'>
            <img id='home-car' src={homeCar} alt="Home car" width={780} height={596} />
          </div>

        </section>

        <section className='offer-section'>
          <header className='offer-section__header'>
            <h2>
              últimas ofertas
            </h2>
            <p>
              Ver más
            </p>
          </header>
          <article className='offer-section__content'>
            <div></div>
          </article>
        </section>

        <section className='about-section'>
          <header className='about-section__title'>
            <h2>
              ¿Por qué nosotros?
            </h2>
          </header>
          <article>
            <table className='about-section__table-reason'>
              <tbody>
                {razonesAmmount.map((el, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className='table-reason__left-side'>
                          <h3>Razon {index + 1}</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
              <tbody id='middle-side'>
                <tr>
                  <td className='table-reason__middle-side'>
                    <div>
                      <img id='little-car__movement' src={carRoad} alt="Little car" />
                    </div>
                    <div>
                      <img src={roadLine} alt="road line for the little car" />
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody>
                {razonesAmmount.map((el, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className='table-reason__rigth-side'>
                          <h3>Razon {index + 1}</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </article>
        </section>
      </main>
    </>
  );
};
