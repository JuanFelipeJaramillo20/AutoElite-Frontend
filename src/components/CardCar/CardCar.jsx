import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/usuario/selectors';
import './CardCar.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  estado,
  showOpt,
  deletePublicacion,
}) => {
  const isLoggedIn = useSelector(getAuth);
  const [ShowFillHeart, setShowFillHeart] = useState(false);
  const [showLstOp, setShowLstOp] = useState(false);
  const navigate = useNavigate();
  return (
    <div className='app-cardCar'>
      {showOpt && (
        <div
          className='app-cardCar__opciones'
          onClick={() => setShowLstOp(!showLstOp)}
        >
          <div className='app-cardCar__opciones-icon'>
            <i className='fa-solid fa-ellipsis-vertical'></i>
          </div>
          <div
            className={
              showLstOp
                ? 'app-cardCar__lstOp app-cardCar__lstOp--show'
                : 'app-cardCar__lstOp'
            }
          >
            <ul>
              <li>
                <NavLink>
                  <span>
                    <i className='fa-solid fa-pen-to-square'></i>
                  </span>{' '}
                  Editar
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => deletePublicacion(idPublicacion)}>
                  <span>
                    <i className='fa-solid fa-trash'></i>
                  </span>{' '}
                  Eliminar
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
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
      <div className='app-carCard_estado'>{estado}</div>
    </div>
  );
};

CardCar.propTypes = {
  idPublicacion: PropTypes.string.isRequired,
  srcImageCar: PropTypes.string.isRequired,
  yearCarro: PropTypes.string.isRequired,
  modeloCarro: PropTypes.string.isRequired,
  marcaCarro: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  ciudadVenta: PropTypes.string.isRequired,
  kilometraje: PropTypes.number.isRequired,
  tipoTransmision: PropTypes.string.isRequired,
  tipoCombustible: PropTypes.string.isRequired,
  estado: PropTypes.string.isRequired,
  showOpt: PropTypes.bool,
  deletePublicacion: PropTypes.func,
};
