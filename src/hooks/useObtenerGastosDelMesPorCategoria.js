import {useEffect, useState} from 'react';
import useObtenerGastosDelMes from './useObtenerGastosDelMes';

const useObtenerGastosDelMesPorCategoria = () => {
    const [gastosPorCategoria, cambiarGastosPorCategoria] = useState([]);
    const gastos = useObtenerGastosDelMes();

    useEffect(() => {
        // reduce nos va a devolver un objeto que va a contener la suma de cada categoria.
        // reduce recibe dos parametros, el primero es la funcion y el segundo es el valor inicial.
        const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {
            const categoriaActual = objetoActual.categoria;
            const cantidadActual = objetoActual.cantidad;
            
            // objetoResultante es el objeto final que vamos a obtener.
            // De este objeto queremos acceder a su caategoria actual y le vamos a sumar la cantidad actual.
            objetoResultante[categoriaActual] += cantidadActual;
            // Devolvemos el objeto final.
            return objetoResultante;
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0,
        });
        // console.log(sumaDeGastos)
        // Vamos a obtener un arreglo de gastos por categoria.
        // Object.keys nos va a permitir obtener un array de todas las propiedades enumerables (claves) de un objeto
        // en este caso de las categorias.
        cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
            return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
        }));
    }, [gastos, cambiarGastosPorCategoria]);
    
    return gastosPorCategoria;   
}
 
export default useObtenerGastosDelMesPorCategoria;