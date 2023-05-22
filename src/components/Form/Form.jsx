import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '../Input/Input';
import { Boton } from '../Boton/Boton';
import './Form.css';
export const Form = (props) => {
  const {
    inputsIds,
    labelTextInputs,
    placeHolders,
    typesInputs,
    validacionesEnInputs,
    btnText,
    onSubmit,
  } = props;

  const { register, handleSubmit } = useForm();
  return (
    <form className='app-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='app-form__inputs'>
        {inputsIds.map((input, index) => {
          return (
            <Input
              key={input}
              labelText={labelTextInputs[index]}
              type={typesInputs[index]}
              id={input}
              register={register}
              validators={validacionesEnInputs[index]}
              placeholder={placeHolders[index]}
              name={input}
            />
          );
        })}
      </div>
      <Boton texto={btnText} tipo='submit' />
    </form>
  );
};

Form.propTypes = {
  inputsIds: PropTypes.arrayOf(PropTypes.string),
  labelTextInputs: PropTypes.arrayOf(PropTypes.string),
  placeHolders: PropTypes.arrayOf(PropTypes.string),
  typesInputs: PropTypes.arrayOf(PropTypes.string),
  validacionesEnInputs: PropTypes.arrayOf(PropTypes.object),
  btnText: PropTypes.string,
  onSubmit: PropTypes.func,
};
