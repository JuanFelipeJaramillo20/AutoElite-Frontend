import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '../Input/Input';
import { Boton } from '../Boton/Boton';
import './Form.css';
export const Form = (props) => {
  const { idForm, inputs, btnText, onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitForm = (data) => {
    onSubmit(data, reset);
  };
  return (
    <form
      className='app-form'
      id={idForm}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      {inputs.map((input) => {
        return (
          <div className='app-form__input' key={input.id}>
            {input.value ? (
              <Input
                labelText={input.label}
                type={input.type}
                id={input.id}
                register={register}
                validators={input.validacion}
                placeholder={input.placeHolder}
                value={input.value}
                opciones={input.options}
              />
            ) : (
              <Input
                labelText={input.label}
                type={input.type}
                id={input.id}
                register={register}
                validators={input.validacion}
                placeholder={input.placeHolder}
                opciones={input.options}
              />
            )}
            {errors[input.id] && (
              <p className='error-message'>
                {input.error && input.error[errors[input.id].type]}
              </p>
            )}
          </div>
        );
      })}
      <Boton texto={btnText} tipo='submit' />
    </form>
  );
};

Form.propTypes = {
  idForm: PropTypes.string,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  btnText: PropTypes.string,
  onSubmit: PropTypes.func,
};
