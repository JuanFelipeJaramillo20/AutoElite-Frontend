import { OpcionesPerfil } from '../../components/OpcionesPerfil/OpcionesPerfil';
import PersonalInfo from './Components/PersonalInfo/PersonalInfo';
import './PerfilUsuario.css';
export const PerfilUsuario = () => {
  return (
    <div className='app-configuracion'>
      <OpcionesPerfil />
      <PersonalInfo />
    </div>
  );
};
