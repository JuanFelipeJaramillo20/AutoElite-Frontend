import { useSelector } from 'react-redux';
import { OpcionesPerfil } from '../../../../components/OpcionesPerfil/OpcionesPerfil';
import { getListaGuardados } from '../../../../redux/usuario/selectors';
import { CardCar } from '../../../../components/CardCar/CardCar';
import './Favoritos.css';
export const Favoritos = () => {
  const favoritos = useSelector(getListaGuardados);
  return (
    <div className='app-configuracion'>
      <OpcionesPerfil />
      <div className='app-configuracion__guardados'>
        {favoritos.length !== 0 ? (
          favoritos.map((publicacion) => {
            return (
              <CardCar
                key={publicacion.id}
                idPublicacion={publicacion.id}
                srcImageCar='https://i.imgur.com/xyiSDoE.jpeg'
                yearCarro={publicacion.yearCarro}
                modeloCarro={publicacion.modeloCarro}
                marcaCarro={publicacion.marcaCarro}
                precio={publicacion.precio}
                ciudadVenta={publicacion.ciudadVenta}
                kilometraje={publicacion.kilometraje}
                tipoTransmision={publicacion.tipoTransmision}
                tipoCombustible={publicacion.tipoCombustible}
                estado={publicacion.estado}
              ></CardCar>
            );
          })
        ) : (
          <p>No has dado favorito a ninguna publicación</p>
        )}
      </div>
    </div>
  );
};
