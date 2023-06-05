import { useState } from 'react';
import './PreguntasFrecuentes.css';

export const PreguntasFrecuentes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActive = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className='preguntasFrecuentes'>
        <h2 className='preguntasFrecuentes_title'>FAQs</h2>
        <section className='preguntasFrecuentes__preguntas'>
          <div
            className={`preguntasFrecuentes__faq ${
              activeIndex === 0 ? 'active' : ''
            }`}
            onClick={() => toggleActive(0)}
          >
            <div className='preguntasFrecuentes__question'>
              <h3>Question???????</h3>
              <svg width={15} height={10} viewBox='0 0 42 25'>
                <path
                  d='M3 3L21 21L39 3'
                  stroke='white'
                  strokeWidth='7'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <div className='preguntasFrecuentes__answer'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique voluptatibus, fuga quod recusandae ipsa inventore
                ducimus optio illum! Ad sint illum error eos quos. Facere
                voluptates rerum nostrum minima eaque!
              </p>
            </div>
          </div>
        </section>
        <section className='preguntasFrecuentes__preguntas'>
          <div
            className={`preguntasFrecuentes__faq ${
              activeIndex === 1 ? 'active' : ''
            }`}
            onClick={() => toggleActive(1)}
          >
            <div className='preguntasFrecuentes__question'>
              <h3>Question???????</h3>
              <svg width={15} height={10} viewBox='0 0 42 25'>
                <path
                  d='M3 3L21 21L39 3'
                  stroke='white'
                  strokeWidth='7'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <div className='preguntasFrecuentes__answer'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique voluptatibus, fuga quod recusandae ipsa inventore
                ducimus optio illum! Ad sint illum error eos quos. Facere
                voluptates rerum nostrum minima eaque!
              </p>
            </div>
          </div>
        </section>
        <section className='preguntasFrecuentes__preguntas'>
          <div
            className={`preguntasFrecuentes__faq ${
              activeIndex === 2 ? 'active' : ''
            }`}
            onClick={() => toggleActive(2)}
          >
            <div className='preguntasFrecuentes__question'>
              <h3>Question???????</h3>
              <svg width={15} height={10} viewBox='0 0 42 25'>
                <path
                  d='M3 3L21 21L39 3'
                  stroke='white'
                  strokeWidth='7'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <div className='preguntasFrecuentes__answer'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique voluptatibus, fuga quod recusandae ipsa inventore
                ducimus optio illum! Ad sint illum error eos quos. Facere
                voluptates rerum nostrum minima eaque!
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
