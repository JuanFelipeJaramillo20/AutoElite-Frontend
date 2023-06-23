import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Star } from './components/Star/Star';
import { Modal } from '../../../../components/Modal/Modal';
import { LeaveReview } from './components/LeaveReview/LeaveReview';

import { getId } from '../../../../redux/usuario/selectors';

import testImg from '../../../../assets/img/perfil/perfil-ejemplo.jpg';
import Lottie from 'lottie-react'
import noReview from '../../../../assets/animations/noReviws.json';

import './AddCalificacion.css';

export const AddCalificacion = (props) => {
  const { totalReviewsVendor, wasReviewed, vendorID } = props;

  let [fiveStars, setFiveStars] = useState(0);
  let [fourStars, setFourStars] = useState(0);
  let [threeStars, setThreeStars] = useState(0);
  let [twoStars, setTwoStars] = useState(0);
  let [oneStars, setOneStars] = useState(0);

  let [ShowLeaveReview, setShowLeaveReview] = useState(false);
  const [wasReviewedByCurrentUser, setWasReviewedByCurrentUser] = useState(false);

  const currentUserID = useSelector(getId);

  useEffect(() => {
    function getStars(reviews) {
      setFiveStars(0);
      setFourStars(0);
      setThreeStars(0);
      setTwoStars(0);
      setOneStars(0);
      reviews.forEach((review) => {
        if (review.numEstrellas === 5) {
          setFiveStars((prevValue) => prevValue + 1);
        }
        if (review.numEstrellas === 4) {
          setFourStars((prevValue) => prevValue + 1);
        }
        if (review.numEstrellas === 3) {
          setThreeStars((prevValue) => prevValue + 1);
        }
        if (review.numEstrellas === 2) {
          setTwoStars((prevValue) => prevValue + 1);
        }
        if (review.numEstrellas === 1) {
          setOneStars((prevValue) => prevValue + 1);
        }
      });
    }
    getStars(totalReviewsVendor);
  }, [totalReviewsVendor]);

  useEffect(() => {
    const findCurrentUserReview = () => {
      totalReviewsVendor.forEach((review) => {
        if (review.sender.id === currentUserID) {
          setWasReviewedByCurrentUser(true);
        }
      });
    };

    findCurrentUserReview();
  }, [currentUserID, totalReviewsVendor]);

  function handleShowLeaveReview() {
    setShowLeaveReview(!ShowLeaveReview);
  }

  return (
    <>
      <section className='reviews-section'>
        <header className='reviews-section__title'>
          <h2>Reviews del vendedor ({totalReviewsVendor.length})</h2>
          <div className='star-vendor__rate'>
            <Star
              five={fiveStars}
              four={fourStars}
              three={threeStars}
              two={twoStars}
              one={oneStars}
              wasReviewed={wasReviewed}
            />
          </div>
        </header>
        <div className='reviews-leave'>
          <button
            className='app-btn'
            onClick={handleShowLeaveReview}
            disabled={
              currentUserID === parseInt(vendorID) ||
              wasReviewedByCurrentUser ? true : false
            }
          >
            Dejar calificación
          </button>
        </div>

        {ShowLeaveReview ? (
          <>
            <Modal handleModal={handleShowLeaveReview} width={400} heigth={300}>
              <LeaveReview handleCloseModal={handleShowLeaveReview} wasReviewed={wasReviewed} />
            </Modal>
          </>
        ) : null}

        <article>
          {totalReviewsVendor.length === 0 ? (
            <Lottie className='noreviews-data' animationData={noReview} />
          ) : null}
          {totalReviewsVendor.map((review) => {
            return (
              <div key={review.IdReview} className='user-review'>
                <div className='user-review__profile'>
                  <div className='profile-username'>
                    <img
                      src={testImg}
                      alt='person'
                      width={'50px'}
                      height={'50px'}
                    />
                    <p>
                      <b>{review.sender.nombres}</b>
                    </p>
                    <p>{review.fecha.split('T')[0].split('-').join('/')}</p>
                  </div>
                  {Array(5)
                    .fill()
                    .map((el, id) => {
                      return id < review.numEstrellas ? (
                        <i key={id} className='fa-solid fa-star'></i>
                      ) : (
                        <i key={id} className='fa-regular fa-star'></i>
                      );
                    })}
                </div>
                <div className='user-review__description'>
                  <p>{review.comentarios}</p>
                </div>
              </div>
            );
          })}
        </article>
      </section>
    </>
  );
};

AddCalificacion.propTypes = {
  totalReviewsVendor: PropTypes.arrayOf(PropTypes.object),
  wasReviewed: PropTypes.func,
  vendorID: PropTypes.number
};
