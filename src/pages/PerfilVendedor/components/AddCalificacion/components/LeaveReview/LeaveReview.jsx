import PropTypes from "prop-types";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Boton } from '../../../../../../components/Boton/Boton';
//import { Alert } from '../../../../../../components/Alert/Alert';

import { getId, getToken } from "../../../../../../redux/usuario/selectors";
import { addReview } from "../../../../../../redux/usuario/thunk";

import './LeaveReview.css';

export const LeaveReview = (props) => {
    const { usuarioId } = useParams();

    const {
        handleCloseModal,
        wasReviewed,
    } = props;

    const currentUserID = useSelector(getId);
    const currentUserTOKEN = useSelector(getToken);

    const { register, handleSubmit, setValue } = useForm();

    let [stars, setStars] = useState(0);
    let [dateReview, setDateReview] = useState();
    /*const [showAlert, setShowAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');*/

    const onSubmit = async (data) => {
        const review = {
            "receiver": parseInt(usuarioId),
            "sender": currentUserID,
            "comentarios": data.Descripcion,
            "numEstrellas": data.StarRate
        };
        const res = await addReview(review, currentUserTOKEN);
        if (!res) {
            /*setShowAlert(true);
            setMessageAlert('Creada con exito');
            setTitleAlert('Éxito!');
            setTypeAlert('exito');*/
            wasReviewed((prevValue) => !prevValue);
            handleCloseModal();
        } else {
            /*setShowAlert(true);
            setMessageAlert('Algo salió mal');
            setTitleAlert('Error!');
            setTypeAlert('error');*/
        }
    };

    function handleStarRate(id) {
        const selectedStar = document.getElementById(id);
        const dataReview = document.getElementById('date-review');

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const areDefinedElements = selectedStar && dataReview;

        if (areDefinedElements) {
            let starAmount = parseInt(id) + 1;
            setStars(starAmount);
            setDateReview(formattedDate);
            setValue('StarRate', starAmount);
            setValue('fechaReview', formattedDate);
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
            {/*showAlert ? (
                <Alert type={typeAlert} message={messageAlert} title={titleAlert} setShowModal={setShowAlert} />
            ) : null*/}
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
                    <input
                        type='text'
                        id='date-review'
                        name='fechaReview'
                        value={dateReview}
                        {...register('fechaReview', { required: true })}
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
};

LeaveReview.propTypes = {
    handleCloseModal: PropTypes.func,
    wasReviewed: PropTypes.func
}
