import { useState } from 'react';
import { CargarFotos } from '../../../../components/CargarFotos/CargarFotos';
import './PersonalInfo.css';
import { Boton } from '../../../../components/Boton/Boton';
import { useDispatch, useSelector } from 'react-redux';
import { guardarImagen } from '../../../../redux/usuario/thunk';
import { getId } from '../../../../redux/usuario/selectors';
const PersonalInfo = () => {
  const id = useSelector(getId);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const guardarCambios = () => {
    if (files.length !== 0) {
      if (files.length > 1) {
        console.log('Solo puedes elegir una foto de perfil');
      } else {
        dispatch(guardarImagen(id, files[0]));
      }
    } else {
      console.log('Selecciona una imagen');
    }
  };
  return (
    <div className='app-configuracion__infoUsuario'>
      <h2>Información personal</h2>
      <CargarFotos setFiles={(filesSelected) => setFiles(filesSelected)} />
      <Boton
        texto='Guardar cambios'
        tipo='btn'
        onClick={() => guardarCambios()}
      />
    </div>
  );
};

export default PersonalInfo;
