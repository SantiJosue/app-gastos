import React from 'react';
import { StyleSheetManager } from 'styled-components';
import { Helmet } from 'react-helmet';
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './elementos/Header';
import Boton from './elementos/Boton';
import BotonCerrrarSesion from './componentes/BotonCerrarSesion';
import FormularioGasto from './componentes/FormularioGasto';
import BarraTotalGastado from './componentes/BarraTotalGastado';

const App = () => {
  return (
    <>
        <Helmet>
          <title>Agregar gasto</title>
        </Helmet>

        {/* Para evitar conflictos con las props de styled-components: */}
        <StyleSheetManager shouldForwardProp={(props) => !props.startsWith("tipo")}> 
          <Header>
            <ContenedorHeader>
              <Titulo>Agregar Gasto</Titulo>
                <ContenedorBotones>
                  <Boton to="categorias">Categorias</Boton>
                  <Boton to="lista">Lista de Gastos</Boton>
                  <BotonCerrrarSesion />
                </ContenedorBotones>
            </ContenedorHeader>
          </Header>
          
          <FormularioGasto />

          <BarraTotalGastado />
        </StyleSheetManager>
    </>
  );
}
 
export default App;