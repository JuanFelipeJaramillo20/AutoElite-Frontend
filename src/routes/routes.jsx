import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Inicio } from '../pages/Inicio/Inicio';
import { Catalogo } from '../pages/Catalogo/Catalogo';
import { Contacto } from '../pages/Contacto/Contacto';
import { Publicacion } from '../pages/Publicacion/Publicacion';
import { PerfilUsuario } from '../pages/PerfilUsuario/PerfilUsuario';
import { PerfilVendedor } from '../pages/perfilVendedor/perfilVendedor';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

export const RoutesConfiguration = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/catalogo' element={<Catalogo />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/publicacion/:publicacionId' element={<Publicacion />} />
        <Route path='/perfil' element={<PerfilUsuario />} />
        <Route path='/perfil/:usuarioId' element={<PerfilVendedor />} />
      </Routes>
      <Footer />
    </Router>
  );
};
