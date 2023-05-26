import PropTypes from 'prop-types';
import './Input.css';

export const Input = (props) => {
  const {
    className,
    labelText,
    type,
    id,
    register,
    validators,
    ...otherProps
  } = props;
  return (
    <>
      {type === 'textarea' ? (
        <label className='app-label'>
          {labelText}
          <textarea
            className='app-textarea'
            id={id}
            name={id}
            {...otherProps}
            {...(register && register(id))}
          ></textarea>
        </label>
      ) : (
        <label className='app-label'>
          {labelText} :
          <input
            type={type}
            id={id}
            className={`app-input ${className ? className : ''}`}
            {...(register && register(id, validators))}
            {...otherProps}
          />
        </label>
      )}
    </>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  register: PropTypes.func,
  validators: PropTypes.object,
};
