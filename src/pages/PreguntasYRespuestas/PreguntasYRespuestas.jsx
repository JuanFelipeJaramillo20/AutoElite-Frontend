import './PreguntasYRespuestas.css'

export const PreguntasYRespuestas = () => {
    return (
        <>
        <section className='container'>
            <h2 className='title'>Preguntas y Respuestas</h2>

            <div className='box'>
                <textarea type="text" placeholder="Escribe tu pregunta..." className="box-input"></textarea>
                <input type="submit" value="Preguntar" className="button" />
            </div>
        </section>
        </>
    )
}