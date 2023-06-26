import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import './Star.css';

export const Star = (props) => {
  const { five, four, three, two, one, wasReviewed } = props;

  function removeDecimals(value) {
    return Math.round(value);
  }

  const [fiveProgressBar, setFiveProgressBar] = useState(0);
  const [fourProgressBar, setFourProgressBar] = useState(0);
  const [threeProgressBar, setThreeProgressBar] = useState(0);
  const [twoProgressBar, setTwoProgressBar] = useState(0);
  const [oneProgressBar, setOneProgressBar] = useState(0);

  useEffect(() => {
    //%
    const totalReviews = five + four + three + two + one;
    if (totalReviews > 0) {
      setFiveProgressBar((five / totalReviews) * 100);
      setFourProgressBar((four / totalReviews) * 100);
      setThreeProgressBar((three / totalReviews) * 100);
      setTwoProgressBar((two / totalReviews) * 100);
      setOneProgressBar((one / totalReviews) * 100);
    }
    //elements
    const fiveStars = document.querySelector('.five');
    const fourStars = document.querySelector('.four');
    const threeStars = document.querySelector('.three');
    const twoStars = document.querySelector('.two');
    const oneStars = document.querySelector('.one');

    const areDefinedElements =
      fiveStars && fourStars && threeStars && twoStars && oneStars;

    if (areDefinedElements) {
      fiveStars.style.width = `${fiveProgressBar}%`;
      fourStars.style.width = `${fourProgressBar}%`;
      threeStars.style.width = `${threeProgressBar}%`;
      twoStars.style.width = `${twoProgressBar}%`;
      oneStars.style.width = `${oneProgressBar}%`;
    }
  }, [
    five,
    fiveProgressBar,
    four,
    fourProgressBar,
    one,
    oneProgressBar,
    three,
    threeProgressBar,
    two,
    twoProgressBar,
    wasReviewed,
  ]);

  return (
    <>
      <div className='rate-bar'>
        <div>
          <div>
            {Array(5)
              .fill()
              .map((el, id) => {
                return <i key={id} className='fa-solid fa-star'></i>;
              })}
          </div>
          <div className='progress-bar'>
            <div className='progress five'></div>
            <p>{removeDecimals(fiveProgressBar)}%</p>
          </div>
        </div>
        <div>
          <div>
            {Array(5)
              .fill()
              .map((el, id) => {
                return id < 4 ? (
                  <i key={id} className='fa-solid fa-star'></i>
                ) : (
                  <i key={id} className='fa-regular fa-star'></i>
                );
              })}
          </div>
          <div className='progress-bar'>
            <div className='progress four'></div>
            <p>{removeDecimals(fourProgressBar)}%</p>
          </div>
        </div>
        <div>
          <div>
            {Array(5)
              .fill()
              .map((el, id) => {
                return id < 3 ? (
                  <i key={id} className='fa-solid fa-star'></i>
                ) : (
                  <i key={id} className='fa-regular fa-star'></i>
                );
              })}
          </div>
          <div className='progress-bar'>
            <div className='progress three'></div>
            <p>{removeDecimals(threeProgressBar)}%</p>
          </div>
        </div>
        <div>
          <div>
            {Array(5)
              .fill()
              .map((el, id) => {
                return id < 2 ? (
                  <i key={id} className='fa-solid fa-star'></i>
                ) : (
                  <i key={id} className='fa-regular fa-star'></i>
                );
              })}
          </div>
          <div className='progress-bar'>
            <div className='progress two'></div>
            <p>{removeDecimals(twoProgressBar)}%</p>
          </div>
        </div>
        <div>
          <div>
            {Array(5)
              .fill()
              .map((el, id) => {
                return id < 1 ? (
                  <i key={id} className='fa-solid fa-star'></i>
                ) : (
                  <i key={id} className='fa-regular fa-star'></i>
                );
              })}
          </div>
          <div className='progress-bar'>
            <div className='progress one'></div>
            <p>{removeDecimals(oneProgressBar)}%</p>
          </div>
        </div>
      </div>
    </>
  );
};
Star.propTypes = {
  five: PropTypes.number,
  four: PropTypes.number,
  three: PropTypes.number,
  two: PropTypes.number,
  one: PropTypes.number,
  wasReviewed: PropTypes.func,
};
