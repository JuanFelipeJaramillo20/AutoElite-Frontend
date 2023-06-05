import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/usuario/selectors';
import './CardCar.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// se agrega idPublicacion como props porque nos sirve para cuando se dé click a una card, al dirigirse uno a más información del vehículo el id de la publicación ayuda a recuperar el resto de información.
export const CardCar = ({
  idPublicacion,
  srcImageCar,
  yearCarro,
  modeloCarro,
  marcaCarro,
  precio,
  ciudadVenta,
  kilometraje,
  tipoTransmision,
  tipoCombustible,
}) => {
  const isLoggedIn = useSelector(getAuth);
  const [ShowFillHeart, setShowFillHeart] = useState(false);
  const navigate = useNavigate();
  return (
    <div className='app-cardCar'>
      <div
        className='app-cardCar__container-img'
        onClick={() => navigate(`/publicacion/${idPublicacion}`)}
      >
        <img src={srcImageCar} alt='The image of the referenced car' />
      </div>
      {isLoggedIn ? (
        <div className='app-cardCar--logVersion'>
          <div className='app-cardCar_general-info'>
            <p className='app-cardCar--text-style1'>{yearCarro}</p>
            <p>
              {marcaCarro} {modeloCarro}
            </p>
            <p>${precio}</p>
            <p className='app-cardCar--text-style1'>{ciudadVenta}</p>
          </div>
          {ShowFillHeart ? (
            <i
              className='fa-solid fa-heart'
              onClick={() => setShowFillHeart(false)}
            ></i>
          ) : (
            <i
              className='fa-regular fa-heart'
              onClick={() => setShowFillHeart(true)}
            ></i>
          )}
        </div>
      ) : (
        <div className='app-cardCar_general-info'>
          <p className='app-cardCar--text-style1'>{yearCarro}</p>
          <p>
            {marcaCarro} {modeloCarro}
          </p>
          <p>${precio}</p>
          <p className='app-cardCar--text-style1'>{ciudadVenta}</p>
        </div>
      )}
      <hr />
      <div className='app-cardCar_other-info'>
        <div className='app-cardCar_item'>
          <i className='fas fa-tachometer-alt'></i>
          <p>{kilometraje}km</p>
        </div>
        <div className='app-cardCar_item'>
          <i className='fa-solid fa-gear'></i>
          <p>{tipoTransmision}</p>
        </div>
        <div className='app-cardCar_item'>
          <i className='fa-solid fa-gas-pump'></i>
          <p>{tipoCombustible}</p>
        </div>
      </div>
    </div>
  );
};

CardCar.propTypes = {
  idPublicacion: PropTypes.string.isRequired,
  srcImageCar: PropTypes.string.isRequired,
  yearCarro: PropTypes.number.isRequired,
  modeloCarro: PropTypes.string.isRequired,
  marcaCarro: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  ciudadVenta: PropTypes.string.isRequired,
  kilometraje: PropTypes.number.isRequired,
  tipoTransmision: PropTypes.string.isRequired,
  tipoCombustible: PropTypes.string.isRequired,
};
