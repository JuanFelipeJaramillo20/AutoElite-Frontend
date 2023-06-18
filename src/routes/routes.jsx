import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Inicio } from '../pages/Inicio/Inicio';
import { Catalogo } from '../pages/Catalogo/Catalogo';
import { Contacto } from '../pages/Contacto/Contacto';
import { Publicacion } from '../pages/Publicacion/Publicacion';
import { PerfilUsuario } from '../pages/PerfilUsuario/PerfilUsuario';
import { PerfilVendedor } from '../pages/perfilVendedor/perfilVendedor';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { PrivateRouter } from './PrivateRouter';
import { CrearPublicacion } from '../pages/CrearPublicacion/CrearPublicacion';
import { EditarPublicacion } from '../pages/EditarPublicacion/EditarPublicacion';
import { Favoritos } from '../pages/PerfilUsuario/Components/Favoritos/Favoritos';
import { PreguntasFrecuentes } from '../pages/PreguntasFrecuentes/PreguntasFrecuentes';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { useSelector } from 'react-redux';
import { getAuth } from '../redux/usuario/selectors';
import { MisPublicaciones } from '../pages/PerfilUsuario/Components/MisPublicaciones/MisPublicaciones';
import { MisReseñas } from '../pages/PerfilUsuario/Components/MisReseñas/MisReseñas';
import { NoEncontrado } from '../pages/NoEncontrado/NoEncontrado';

export const RoutesConfiguration = () => {
  const isLoggedIn = useSelector(getAuth);
  return (
    <Router>
      <Header />
      <Routes>
      <Route path='*' element={<NoEncontrado />} />
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registro' element={<RegisterPage />} />
        <Route path='/catalogo' element={<Catalogo />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/publicacion/:publicacionId' element={<Publicacion />} />
        <Route path='/perfil/:usuarioId' element={<PerfilVendedor />} />
        <Route element={<PrivateRouter isAuth={isLoggedIn} />}>
          <Route path='/perfil' element={<PerfilUsuario />} />
          <Route path='/publicacion/nueva' element={<CrearPublicacion />} />
          <Route
            path='/publicacion/editar/:publicacionId'
            element={<EditarPublicacion />}
          />
          <Route path='/favoritos' element={<Favoritos />} />

          <Route path='/miPerfil' element={<PerfilUsuario />} />

          <Route path='/misPublicaciones' element={<MisPublicaciones />} />

          <Route path='/misReseñas' element={<MisReseñas />} />
        </Route>
        <Route path='/preguntasFrecuentes' element={<PreguntasFrecuentes />} />
      </Routes>
      <Footer />
    </Router>
  );
};
