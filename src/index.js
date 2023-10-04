import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from "webfontloader";
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InicioSesion from './componentes/InicioSesion';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import EditarGasto from './componentes/EditarGasto';
import ListaDeGastos from './componentes/ListaDeGastos';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './contextos/TotalGastadoEnElMesContext';

WebFont.load({
  google: {
    // Work+Sans:wght@400;500;700
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type='image/x-icon'/>
      </Helmet>

      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Routes>
                <Route path='/iniciar-sesion' element={<InicioSesion />} />
                <Route path='/crear-cuenta' element={<RegistroUsuarios />} />

                <Route path='/categorias' element={
                  <RutaPrivada>
                      <GastosPorCategoria />
                  </RutaPrivada>
                }/>

                <Route path='/lista' element={
                  <RutaPrivada>
                      <ListaDeGastos />
                  </RutaPrivada>
                }/>

                <Route path='/editar/:id' element={
                  <RutaPrivada>
                      <EditarGasto />
                  </RutaPrivada>
                }/>

                <Route path='/' element={
                  <RutaPrivada>
                      <App />
                  </RutaPrivada>
                }/>
                
              </Routes>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>

      <Fondo />
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Index />);