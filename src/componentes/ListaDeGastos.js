import React from 'react';
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';
import {Lista, ElementoLista, Categoria, Descripcion, Valor, Fecha,ContenedorBotones,
        BotonAccion, BotonCargarMas, ContenedorBotonCentral, ContenedorSubtitulo,
        Subtitulo} from './../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria';
import convertitAMoneda from './../funciones/convertirAMoneda';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import { Link } from 'react-router-dom';
import Boton from '../elementos/Boton';
import {format, fromUnixTime} from 'date-fns';
import { es } from 'date-fns/locale';
import borrarGasto from '../firebase/borrarGasto';

const ListaDeGastos = () => {
    const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();

    // fromUnixTime transforma los segundo que recibimos de la base de datos y devvuelve una fecha.
    // format recibe la fecha a trasnformar y le pasamos un formato.
    // Ademas le agregamos el lenguage español.
    const formatearFecha = (fecha) => {
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es});
    }

    const fechaEsIgual = (gastos, index, gasto) => {
        // Comprobamos que el indice no sea cero(es decir que no sea el primer elemento).
        // Si no es cero entonces ejecutamos la comprobacion.
        if(index !== 0){
            // Transformamos las fechas.
            // Obtenemos el gasto actual.
            const fechaActual = formatearFecha(gasto.fecha);
            // Obtenemos la fecha del gasto anterior, [index] devuelve es gasto actual por eso ponemos el -1.
            const fechaGastoAnterior = formatearFecha(gastos[index -1].fecha);

            // Comprobamos que las fechas sean iguales.
            if(fechaActual === fechaGastoAnterior){
                return true;
            } else {
                return false;
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>
    
            <Header>
                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>
            </Header>

            <Lista>
                {gastos.map((gasto, index) => {
                    return(
                        <div key={gasto.id}>
                            {/* Si la fecha no es igual a la del elemento anterior entonces no vamos a devolver la fecha. */}
                            {!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}                           
                            <ElementoLista key={gasto.id}>
                                <Categoria>
                                    <IconoCategoria id={gasto.categoria} />
                                    {gasto.categoria}
                                </Categoria>

                                <Descripcion >
                                    {gasto.descripcion}
                                </Descripcion>
                                {/* Convertimos el valor a monedo cuando nuestro hook. */}
                                <Valor>{convertitAMoneda(gasto.cantidad)}</Valor>

                                <ContenedorBotones>
                                    {/* Le especificamos que el boton se comporte como un link. */}
                                    {/* y le agregamos la ruta para editar el gasto mediante el id. */}
                                    <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                                        <IconoEditar />
                                    </BotonAccion>
                                    <BotonAccion onClick={() => borrarGasto(gasto.id)} >
                                        <IconoBorrar />
                                    </BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    );
                })}

                {hayMasPorCargar && 
                    <ContenedorBotonCentral>
                        <BotonCargarMas onClick={() => obtenerMasGastos()}>Cargar Más</BotonCargarMas>
                    </ContenedorBotonCentral>
                }

                {gastos.length === 0 && 
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos por mostrar.</Subtitulo>
                        <Boton as={Link} to={"/"}>Agregar Gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>

            <BarraTotalGastado />
      </>
    );
}
 
export default ListaDeGastos;