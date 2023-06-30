import { useEffect, useState } from 'react';
import { CargarFotos } from '../../../../components/CargarFotos/CargarFotos';
import './PersonalInfo.css';
import { Boton } from '../../../../components/Boton/Boton';
import { useDispatch, useSelector } from 'react-redux';
import { guardarCambios, guardarImagen } from '../../../../redux/usuario/thunk';
import {
  getExito,
  getId,
  getNombre,
  getNroTel,
} from '../../../../redux/usuario/selectors';
import { Input } from '../../../../components/Input/Input';
import { Alert } from '../../../../components/Alert/Alert';
import { resetExito } from '../../../../redux/usuario/actions';
const PersonalInfo = () => {
  const dispatch = useDispatch();
  const id = useSelector(getId);
  const exito = useSelector(getExito);
  const [nombre, setNombre] = useState(useSelector(getNombre));
  const [tel, setTel] = useState(useSelector(getNroTel));
  const [contra, setContra] = useState('');
  const [classNombre, setClassNombre] = useState('hide-input');
  const [classTel, setClassTel] = useState('hide-input');
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');
  const realizarCambios = () => {
    const nuevosDatos = {
      nombres: nombre,
      telefono: tel,
    };
    if (files.length !== 0) {
      if (files.length > 1) {
        console.log('Solo puedes elegir una foto de perfil');
      } else {
        dispatch(guardarImagen(id, files[0]));
      }
    }

    if (contra !== '') {
      nuevosDatos['contrasena'] = contra;
      dispatch(guardarCambios(id, nuevosDatos));
    }
    dispatch(guardarCambios(id, nuevosDatos));
  };

  const toggleClassName = (className, setClassName) => {
    if (className === 'hide-input') {
      setClassName('show-input');
    } else {
      setClassName('hide-input');
    }
  };
  useEffect(() => {
    if (exito) {
      setShowAlert(true);
      setAlertMessage(exito);
      setAlertTitle('Operación realizada.');
      setAlertType('exito');
      setContra('');
    }
  }, [exito]);

  useEffect(() => {
    if (!showAlert) {
      dispatch(resetExito());
    }
  }, [showAlert]);
  return (
    <div className='app-configuracion__infoUsuario'>
      {showAlert ? (
        <Alert
          title={alertTitle}
          message={alertMessage}
          type={alertType}
          setShowModal={setShowAlert}
        />
      ) : null}
      <h2>Información personal</h2>
      <div className='app-configuracion__editarInfo'>
        <div className='app-configuracion__nombre'>
          <div>
            <p>Nombre completo</p>
            <p>{nombre || 'No especificado'}</p>
          </div>
          <i
            onClick={() => toggleClassName(classNombre, setClassNombre)}
            className='fa-regular fa-pen-to-square'
          ></i>
        </div>
        <Input
          className={classNombre}
          type='text'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <hr />
        <div className='app-configuracion__tel'>
          <div>
            <p>Télefono</p>
            <p>{tel || 'No especificado'}</p>
          </div>
          <i
            onClick={() => toggleClassName(classTel, setClassTel)}
            className='fa-regular fa-pen-to-square'
          ></i>
        </div>
        <Input
          className={classTel}
          type='number'
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <hr />
        <div className='app-configuracion__contra'>
          <p>Cambiar contraseña:</p>
        </div>
        <Input
          type='password'
          value={contra}
          onChange={(e) => setContra(e.target.value)}
        />
      </div>
      <CargarFotos setFiles={(filesSelected) => setFiles(filesSelected)} />
      <Boton
        texto='Guardar cambios'
        tipo='btn'
        onClick={() => realizarCambios()}
      />
    </div>
  );
};

export default PersonalInfo;
