import './PreguntasFrecuentes.css'
import React, { useState } from 'react';

export const PreguntasFrecuentes = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleActive = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <>
            <div className="container">
                <h2 className="title">FAQs</h2>
                <section className='section'>
                    <div className={`faq ${activeIndex === 0 ? 'active' : ''}`} onClick={() => toggleActive(0)}>
                        <div className="question">
                            <h3>Question???????</h3>
                            <svg width={15} height={10} viewBox="0 0 42 25">
                                <path
                                    d="M3 3L21 21L39 3"
                                    stroke="white"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="answer">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptatibus,
                                fuga quod recusandae ipsa inventore ducimus optio illum! Ad sint illum error eos
                                quos. Facere voluptates rerum nostrum minima eaque!
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={`faq ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleActive(1)}>
                        <div className="question">
                            <h3>Question???????</h3>
                            <svg width={15} height={10} viewBox="0 0 42 25">
                                <path
                                    d="M3 3L21 21L39 3"
                                    stroke="white"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="answer">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptatibus,
                                fuga quod recusandae ipsa inventore ducimus optio illum! Ad sint illum error eos
                                quos. Facere voluptates rerum nostrum minima eaque!
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={`faq ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleActive(2)}>
                        <div className="question">
                            <h3>Question???????</h3>
                            <svg width={15} height={10} viewBox="0 0 42 25">
                                <path
                                    d="M3 3L21 21L39 3"
                                    stroke="white"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="answer">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptatibus,
                                fuga quod recusandae ipsa inventore ducimus optio illum! Ad sint illum error eos
                                quos. Facere voluptates rerum nostrum minima eaque!
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* otra version
            <div className='faq'>
                <h2 className='title'>FAQs</h2>
                <details>
                    <summary>
                        ¿Cómo puedo cambiar mi contraseña?
                    </summary>
                    <div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet in animi enim dicta aliquid fuga quisquam quaerat eum sint, nihil voluptas, iusto non illum minus laboriosam? Similique accusantium accusamus illo!</p>
                    </div>
                </details>

                <details>
                    <summary>
                        ¿Cómo puedo cambiar mi contraseña?
                    </summary>
                    <div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet in animi enim dicta aliquid fuga quisquam quaerat eum sint, nihil voluptas, iusto non illum minus laboriosam? Similique accusantium accusamus illo!</p>
                    </div>
                </details>

                <details>
                    <summary>
                        ¿Cómo puedo cambiar mi contraseña?
                    </summary>
                    <div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet in animi enim dicta aliquid fuga quisquam quaerat eum sint, nihil voluptas, iusto non illum minus laboriosam? Similique accusantium accusamus illo!</p>
                    </div>
                </details>
            </div> */}
        </>
    )
}