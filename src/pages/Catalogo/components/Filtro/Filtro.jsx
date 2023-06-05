import PropTypes from 'prop-types';
import './Filtro.css';
export const Filtro = ({ tagsActivados }) => {
  return (
    <div className='filtros-activos'>
      <ul>
        {Object.keys(tagsActivados).map((propiedad) =>
          propiedad === 'Usado' ? (
            tagsActivados[propiedad] ? (
              <li key={propiedad}>Usado</li>
            ) : (
              <li key={propiedad}>Nuevo</li>
            )
          ) : (
            <li key={propiedad}>{tagsActivados[propiedad]}</li>
          )
        )}
      </ul>
    </div>
  );
};

Filtro.propTypes = {
  tagsActivados: PropTypes.object,
};
