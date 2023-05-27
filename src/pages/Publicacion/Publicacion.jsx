import './Publicacion.css'

export const Publicacion = () => {
  return (
    <div className='contenedor'>
      <main className='contenidoCarro'>
        <a href="/catalogo">
        <button className='botonDevolver'>Devolverse</button>
        </a>
        <div className='FotosCarro'>
          <h1>Nombre del vehículo</h1>
          <div className='imagenes'>
            <div className='imagen-principal'></div>
            <div className='imagen-secundaria'>
              <div className='imagenPequeña inicio'></div>
              <div className='imagenPequeña'></div>
              <div className='imagenPequeña'></div>
              <div className='imagenPequeña'></div>
              <div className='imagenPequeña final'></div>
            </div>
          </div>
        </div>
        <div className='especificaciones'>
          <div className='tituloEspecificaciones'>

          <h2>Especificaciones</h2>
          </div>
          <div className='especificacionesLista'>
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
          <div className='especificacionesLista'>
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
                <span>Puertas: </span>
                x
              </p>
          </div>
        </div>
        <div className='descripcion'>
          <h2>Descripcion</h2>
          <p>Lorem tincidunt lectus vitae id vulputate diam quam. Imperdiet non 
            scelerisque turpis sed etiam ultrices. Blandit mollis dignissim egestas
            consectetur porttitor. Vulputate dolor pretium, dignissim eu augue sit
            ut convallis. Lectus est, magna urna feugiat sed ultricies sed in lacinia.
            Fusce potenti sit id pharetra vel ornare. Vestibulum sed tellus ullamcorper
            arcu.
            Asperiores eos molestias, aspernatur assumenda vel corporis ex, magni 
            excepturi totam exercitationem quia inventore quod amet labore impedit
            quae distinctio? Officiis blanditiis consequatur alias, atque, sed est
            incidunt accusamus repudiandae tempora repellendus obcaecati delectus 
            ducimus inventore tempore harum numquam autem eligendi culpa.</p>
        </div>
        <div className='datosPublicacion'>
           <p className='dato'>
              <span>Publicado: </span>
              fecha
            </p>
            <p className='dato'>
              <span>Publicacion: </span>
              #nro
            </p>
        </div>
      </main>
      <aside className='sideBar'>
        <div className='boton'>
          <p>Nuevo</p>
        </div>
        <div className='infoPublicacion'>
          <p className='precio'>$XX,XX</p>
          <p className='ciudad'>Ciudad</p>
          <div className='infoVendedor'>
            <div className='infoVendedor-datos'>
              <div className='fotoVendedor'></div>
              <p className='NombreVendedor'>Nombre vendedor</p>
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
        </div>
        <div className='infoPublicacion'></div>
        <div className='contactoVendedor'></div>
      </aside>
    </div>
  );
};
