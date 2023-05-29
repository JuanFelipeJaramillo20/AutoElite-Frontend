import PropTypes from 'prop-types';
import './Input.css';

export const Input = (props) => {
  const {
    className,
    labelText,
    type,
    id,
    opciones,
    register,
    validators,
    ...otherProps
  } = props;
  if (type === 'textarea') {
    return (
      <label className='app-label'>
        {labelText}
        <textarea
          className='app-textarea'
          id={id}
          name={id}
          {...otherProps}
          {...(register && register(id, validators))}
        ></textarea>
      </label>
    );
  } else if (type === 'selection') {
    return (
      <label className='app-label'>
        {labelText}
        <select
          className='app-selection'
          {...(register &&
            register(id, {
              validate: {
                notDefaultOpt: (opt) => {
                  return opt !== 'Elige una opción';
                },
              },
            }))}
        >
          <option>Elige una opción</option>
          {opciones.map((opcion, index) => {
            return <option key={index}>{opcion}</option>;
          })}
        </select>
      </label>
    );
  } else {
    return (
      <label className='app-label'>
        {labelText}
        <input
          type={type}
          id={id}
          name={id}
          className={`app-input ${className ? className : ''}`}
          {...(register && register(id, validators))}
          {...otherProps}
        />
      </label>
    );
  }
};

Input.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  opciones: PropTypes.arrayOf(PropTypes.string),
  register: PropTypes.func,
  validators: PropTypes.object,
};
