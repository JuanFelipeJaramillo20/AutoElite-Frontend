import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Boton } from '../../../../../../components/Boton/Boton';

import './LeaveReview.css';

export const LeaveReview = () => {

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    let [stars, setStars] = useState(0);

    function handleStarRate(id) {
        const selectedStar = document.getElementById(id);

        if (selectedStar) {
            let starAmount = parseInt(id) + 1;
            setStars(starAmount);
            setValue('StarRate', starAmount);
        }
    }

    useEffect(() => {
        const commentTextArea = document.getElementById('comment');
        const modal = document.querySelector('.modal');
        if (commentTextArea && modal) {
            commentTextArea.style.height = `${(modal.offsetHeight) / 2.5}px`;
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='review-form'>
                <div className='review-valoration'>
                    <label htmlFor="star-input">
                        Valoración
                    </label>
                    <div>
                        {Array(5).fill().map((el, id) => {
                            return id < stars ?
                                (<i key={id} className="fa-solid fa-star stars" id={id} onClick={() => { handleStarRate(id) }}></i>) :
                                (<i key={id} className="fa-regular fa-star stars" id={id} onClick={() => { handleStarRate(id) }}></i>)
                        })}
                    </div>
                    <input
                        type="number"
                        id='star-input'
                        name='StarRate'
                        value={stars}
                        {...register('StarRate', { required: true })}
                    />
                </div>

                <div className='review-comment'>
                    <label htmlFor="comment">Comentario</label>
                    <textarea
                        name="Descripcion"
                        id="comment"
                        placeholder="Muy buen vendedor!!"
                        {...register('Descripcion', { required: false })}
                    >
                    </textarea>
                </div>
                <div className='review-send'>
                    <Boton texto={'Enviar'} tipo='submit' />
                </div>
            </form>
        </>
    );
}
