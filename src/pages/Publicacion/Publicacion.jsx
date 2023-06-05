import { Form } from '../../components/Form/Form';
import './Publicacion.css';

export const Publicacion = () => {
  return (
    <div className='app-publicacion'>
      <button className='botonDevolver'>Devolverse</button>
      <main className='app-publicacion__carro-detalles'>
        <div className='FotosCarro'>
          <h1>Nombre del vehículo</h1>
          <div className='imagenes'>
            <div className='imagen-principal'></div>
            <div className='imagen-secundaria'>
              <div className='imagenPequeña '></div>
              <div className='imagenPequeña'></div>
              <div className='imagenPequeña'></div>
              <div className='imagenPequeña'></div>
              <div className='imagenPequeña '></div>
            </div>
          </div>
        </div>
        <div className='app-publicacion__especificaciones'>
          <div className='app-publicacion__tituloEspecificaciones'>
            <h2>Especificaciones</h2>
          </div>
          <div className='app-publicacion__especificacionesLista'>
            <p className='item'>
              <span>Marca: </span>
              marca
            </p>
            <p className='item'>
              <span>Modelo: </span>
              modelo
            </p>
            <p className='item'>
              <span>Color: </span>
              color
            </p>
            <p className='item'>
              <span>Tipo combustible: </span>
              tipo
            </p>
            <p className='item'>
              <span>Año: </span>
              año
            </p>
          </div>
          <div className='app-publicacion__especificacionesLista'>
            <p className='item'>
              <span>Precio negociable: </span>
              si/no
            </p>
            <p className='item'>
              <span>Transmision: </span>
              transmision
            </p>
            <p className='item'>
              <span>Kilometros: </span>
              xxx km
            </p>
            <p className='item'>
              <span>Motor: </span>
              motor
            </p>
            <p className='item'>
              <span>Puertas: </span>x
            </p>
          </div>
        </div>
        <div className='app-publicacion__descripcion'>
          <h2>Descripcion</h2>
          <p>
            Lorem tincidunt lectus vitae id vulputate diam quam. Imperdiet non
            scelerisque turpis sed etiam ultrices. Blandit mollis dignissim
            egestas consectetur porttitor. Vulputate dolor pretium, dignissim eu
            augue sit ut convallis. Lectus est, magna urna feugiat sed ultricies
            sed in lacinia. Fusce potenti sit id pharetra vel ornare. Vestibulum
            sed tellus ullamcorper arcu. Asperiores eos molestias, aspernatur
            assumenda vel corporis ex, magni excepturi totam exercitationem quia
            inventore quod amet labore impedit quae distinctio? Officiis
            blanditiis consequatur alias, atque, sed est incidunt accusamus
            repudiandae tempora repellendus obcaecati delectus ducimus inventore
            tempore harum numquam autem eligendi culpa.
          </p>
        </div>
        <div className='app-publicacion__datosPublicacion'>
          <p className='app-publicacion__dato'>
            <span>Publicado: </span>
            fecha
          </p>
          <p className='app-publicacion__dato'>
            <span>Publicacion: </span>
            #nro
          </p>
        </div>
      </main>
      <div className='app-publicacion__infoPublicacion'>
        <div className='app-publicacion__info-uso'>
          <p>Nuevo</p>
        </div>
        <p className='app-publicacion__precio'>$XX,XX</p>
        <p className='app-publicacion__ciudad'>Ciudad</p>
      </div>
      <aside className='app-publicacion__sideBar'>
        <div className='app-publicacion__infoVendedor'>
          <div className='app-publicacion__infoVendedor-datos'>
            <div className='app-publicacion__fotoVendedor'></div>
            <p className='app-publicacion__NombreVendedor'>Nombre vendedor</p>
          </div>
          <div className='estrellas'>
            <div className='estrella'></div>
            <div className='estrella'></div>
            <div className='estrella'></div>
            <div className='estrella'></div>
            <div className='estrella'></div>
          </div>
          <div className='reviews'>
            <p>(x reviews)</p>
          </div>
        </div>
        <div className='app-publicacion__contactoVendedor'>
          <h2>Contacta al vendedor</h2>
          <Form
            inputs={[
              {
                type: 'text',
                id: 'nombre',
                placeHolder: 'Asunto*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
              {
                type: 'text',
                id: 'email',
                placeHolder: 'Email*',
                validacion: {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                },
                error: {
                  required: 'Campo obligatorio',
                  pattern: 'Email no válido.',
                },
              },
              {
                type: 'number',
                id: 'telefono',
                placeHolder: 'Teléfono',
              },
              {
                type: 'text',
                id: 'mensaje',
                placeHolder: 'Escribe un mensaje*',
                validacion: { required: true },
                error: {
                  required: 'Campo obligatorio',
                },
              },
            ]}
            btnText='Enviar mensaje'
          />
        </div>
      </aside>
    </div>
  );
};
