import { useEffect, useState } from 'react';
import { Mensaje } from '../../../../components/Mensaje/Mensaje';
import { OpcionesPerfil } from '../../../../components/OpcionesPerfil/OpcionesPerfil';
import './Mensajes.css';
import { useSelector } from 'react-redux';
import { getId, getToken } from '../../../../redux/usuario/selectors';
export const Mensajes = () => {
  const [mensajesRecibidos, setMensajesRecibidos] = useState([]);
  const id = useSelector(getId);
  const token = useSelector(getToken);
  const getMensajes = async (idUsuario) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/mensajeVendedor/${idUsuario}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      const result = await response.json();
      if (response.ok && !result.Error) {
        setMensajesRecibidos(result);
      } else {
        console.log('No se pudo obtener los mensajes');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMensajes(id);
  }, []);

  useEffect(() => {
    console.log(mensajesRecibidos);
  }, [mensajesRecibidos]);
  return (
    <div className='app-configuracion'>
      <OpcionesPerfil />
      <div className='app-configuracion__mensajes'>
        <p>Acá encontrarás los mensajes que te han enviado.</p>
        <div className='app-configuracion__mensajes-layout'>
          {mensajesRecibidos ? (
            mensajesRecibidos.map((mensaje) => {
              return (
                <Mensaje
                  key={mensaje.id}
                  infoSender={{
                    nombre: mensaje.sender.nombres,
                    email: mensaje.sender.email,
                    tel: mensaje.sender.telefono,
                  }}
                  mensaje={{
                    asunto: mensaje.asunto,
                    fecha: mensaje.fecha,
                    mensaje: mensaje.mensaje,
                  }}
                />
              );
            })
          ) : (
            <p>No hay mensajes</p>
          )}
        </div>
      </div>
    </div>
  );
};
