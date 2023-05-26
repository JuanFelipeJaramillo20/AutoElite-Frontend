import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import { Star } from "./components/Star/Star";
import { Modal } from "../../../../components/Modal/Modal";
import { LeaveReview } from "./components/LeaveReview/LeaveReview";
import { Boton } from "../../../../components/Boton/Boton";

import testImg from '../../../../assets/img/perfil/perfil-ejemplo.jpg';

import './AddCalificacion.css';

export const AddCalificacion = (props) => {
    const {
        totalReviewsVendor,
    } = props;

    let [fiveStars, setFiveStars] = useState(0);
    let [fourStars, setFourStars] = useState(0);
    let [threeStars, setThreeStars] = useState(0);
    let [twoStars, setTwoStars] = useState(0);
    let [oneStars, setOneStars] = useState(0);

    useEffect(() => {
        function getStars(reviews) {
            reviews.forEach((review) => {
                if (review.StarRate === 5) {
                    // eslint-disable-next-line no-const-assign
                    setFiveStars(() => fiveStars++);
                }
                if (review.StarRate === 4) {
                    setFourStars(() => fourStars++);
                }
                if (review.StarRate === 3) {
                    setThreeStars(() => threeStars++);
                }
                if (review.StarRate === 2) {
                    setTwoStars(() => twoStars++);
                }
                if (review.StarRate === 1) {
                    setOneStars(() => oneStars++);
                }
            });
        }
        getStars(totalReviewsVendor);
    }, []);

    let [ShowLeaveReview, setShowLeaveReview] = useState(false);

    function handleShowLeaveReview() {
        setShowLeaveReview(!ShowLeaveReview);
    }

    return (
        <>
            <section className="reviews-section">
                <header className="reviews-section__title">
                    <h2>
                        Reviews del vendedor ({totalReviewsVendor.length})
                    </h2>
                    <div>
                        <Star
                            five={fiveStars}
                            four={fourStars}
                            three={threeStars}
                            two={twoStars}
                            one={oneStars}
                        />
                    </div>
                </header>
                <div className="reviews-leave">
                    <Boton texto={'Dejar calificación'} onClick={handleShowLeaveReview} />
                </div>

                {ShowLeaveReview ? (
                    <>
                        <Modal
                            handleModal={handleShowLeaveReview}
                            width={400}
                            heigth={300}
                        >
                            <LeaveReview handleCloseModal={handleShowLeaveReview} />
                        </Modal>
                    </>
                ) : null}

                <article>
                    {totalReviewsVendor.map((review) => {
                        return (
                            <>
                                <div key={review.IdReview} className="user-review">
                                    <div className="user-review__profile">
                                        <div className="profile-username">
                                            <img src={testImg} alt="person" width={'50px'} height={'50px'} />
                                            <p>
                                                <b>{review.Nombre}</b>
                                            </p>
                                            <p>
                                                {review.fechaReview.split('-').join('/')}
                                            </p>
                                        </div>
                                        {Array(5).fill().map((el, id) => {
                                            return id < review.StarRate ?
                                                (<i key={id} className="fa-solid fa-star"></i>) :
                                                (<i key={id} className="fa-regular fa-star"></i>)
                                        })}
                                    </div>
                                    <div className="user-review__description">
                                        <p>
                                           {review.Descripcion}
                                        </p>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </article>
            </section>
        </>
    );
};

AddCalificacion.propTypes = {
    totalReviewsVendor: PropTypes.arrayOf(PropTypes.object),
    /*totoalVendor: PropTypes.number,
    five: PropTypes.number,
    four: PropTypes.number,
    three: PropTypes.number,
    two: PropTypes.number,
    one: PropTypes.number,*/
}