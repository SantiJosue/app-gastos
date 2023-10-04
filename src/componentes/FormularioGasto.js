import React, {useState, useEffect} from 'react';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from './../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import agregarGasto from '../firebase/agregarGasto';
import {useAuth} from './../contextos/AuthContext';
import Alerta from './../elementos/Alerta';
import { useNavigate } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {
    const [inputDescripcion, cambiarInputDescripcion] = useState("");
    const [inputCantidad, cambiarInputCantidad] = useState("");
    const [categoria, cambiarCategoria] = useState("hogar");
    // con new Date() vamos a obtener la fecha actual, el dia, el mes, el año, etc.
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    // Extraemos el usuario.
    const {usuario} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Comprobamos si hay algun dato.
        // De ser asi establecemos todo el state con los valores del gasto.   
        if(gasto){
            // Comprobamos que el gasto sea del usuario actual.
            // Para eso comprobamos el uid guardado en el gasto con el uid del usurio.
            if(gasto.data().uidUsuario === usuario.uid){
                cambiarCategoria(gasto.data().categoria);
                cambiarFecha(fromUnixTime(gasto.data().fecha));
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);             
            } else {
                navigate('/lista');
            }
        }
    }, [gasto, usuario, navigate]);

    const handleChange = (e) => {
        if(e.target.name === "descripcion"){
            cambiarInputDescripcion(e.target.value);
        } else if(e.target.name === "cantidad"){
            // Agregamos una expresión decimal para reemplazar las letras por un espacio vacio.
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    // Esta funcion se ejecuta al enviar el formulario.
    const handleSubmit = (e) => {
        e.preventDefault();

        // Transformamos la cantidad en numero y le pasamos 2 decimales.
        // parseFloat nos va a permitir extraer decimales.
        // toFixed nos va a permitir agregar los decimales.
        let cantidad = parseFloat(inputCantidad).toFixed(2);

        // Comprobamos que haya una descripcion y valor.
        if(inputDescripcion !== "" && inputCantidad !== ""){
            if(cantidad){
                // Si tenemos un gasto entonces ejecutar la funcion para editarlo.
                if(gasto){
                    editarGasto({
                        id: gasto.id,
                        categoria: categoria,
                        inputDescripcion:inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() => {
                        navigate('/lista');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    // Agregamos un objeto con los estados.
                    agregarGasto({
                        categoria: categoria,
                        inputDescripcion:inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        // Agregamos el uid(universal id) del usuario.
                        uidUsuario: usuario.uid
                    })
                    // Accedemos a la promesa cuando todos los valores sean correctos.
                    .then(() => {
                        // Reiniciamos todos los valores del formulario.
                        cambiarCategoria("hogar");
                        cambiarInputDescripcion("");
                        cambiarInputCantidad("");
                        cambiarFecha(new Date());
    
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({
                            tipo: "exito",
                            mensaje: "El gasto fue agregado correctamente."
                        });
                    })
                    // En caso de error ejecutamos la siguiente funcion.
                    .catch((error) => {
                        cambiarAlerta(true);
                        cambiarAlerta({
                            tipo: "error",
                            mensaje: "Hubo un problema al intentar agregar el gasto."
                        });
                    });
                }
            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: "error",
                    mensaje: "El valor que ingresaste no es correcto."
                });
            }

        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Por favor rellena todos los campos."
            });
        }

    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias 
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                <DatePicker 
                    fecha={fecha}
                    cambiarFecha={cambiarFecha}
                />
            </ContenedorFiltros>
            <div>
                <Input 
                    type='text'
                    name='descripcion'            
                    placeholder='Descripción'
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande
                    type='number'
                    name='cantidad'
                    placeholder='$0.00'
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>
            <ContenedorBoton>
                <Boton as="button" $primario $conIcono type='submit'>
                    {/* Si tenemos un gasto entonces mostramos "Editar Gasto" de lo contrario mostramos "Agregar Gasto" */}
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'}
                    <IconoPlus />
                </Boton>
            </ContenedorBoton>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
    );
}
 
export default FormularioGasto;