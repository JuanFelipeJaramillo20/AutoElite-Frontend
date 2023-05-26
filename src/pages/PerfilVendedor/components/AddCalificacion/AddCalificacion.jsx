import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import { Start } from "./components/Star";

import testImg from '../../../../assets/img/inicio/carRoad.png';

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
                if (review.StarRate === 5) {
                    setFourStars(() => fourStars++);
                }
                if (review.StarRate === 5) {
                    setThreeStars(() => threeStars++);
                }
                if (review.StarRate === 5) {
                    setTwoStars(() => twoStars++);
                }
                if (review.StarRate === 5) {
                    setOneStars(() => oneStars++);
                }
            });
        }
        getStars(totalReviewsVendor);
    }, [])

    return (
        <>
            <section className="reviews-section">
                <header className="reviews-section__title">
                    <h2>
                        Reviews del vendedor ({totalReviewsVendor.length})
                    </h2>
                    <div>
                        <Start
                            five={fiveStars}
                            four={fourStars}
                            three={threeStars}
                            two={twoStars}
                            one={oneStars}
                        />
                    </div>
                </header>
                <article>
                    {totalReviewsVendor.map((review) => {
                        return (
                            <>
                                <div key={review.IdReview} className="user-review">
                                    <div className="user-review__profile">
                                        <div className="profile-username">
                                            <img src={testImg} alt="person" width={'50px'} height={'50px'} />
                                            <p>
                                                <b>{review.DocumentoIdentidad}</b>
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
                                            Elementum ut quam tincidunt egestas vitae elit, hendrerit. Ullamcorper nulla amet lobortis elit, nibh condimentum enim. Aliquam felis nisl tellus sodales lectus dictum tristique proin vitae. Odio fermentum viverra tortor quis.
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