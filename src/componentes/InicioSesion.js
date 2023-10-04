import React, {useState} from 'react';
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import Boton from './../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import {ReactComponent as SvgLogin} from './../imagenes/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {auth} from './../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import Alerta from './../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 200px */
    margin-bottom: 1.25rem; /* 20px */

    @media (max-width: 60rem){
        width: 100%;
        max-height: 10rem; 
        margin-bottom: 1.25rem; 
    }
`;

const InicioSesion = () => {
    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === "email"){
            establecerCorreo(e.target.value);
        } else if(e.target.name === "password"){
            establecerPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Establecemos el estado de la alerta y la alerta como oculta.
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        // Comprobamos del lado del cliente que el correo sea valido.
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if( !expresionRegular.test(correo)){
            // Establecemos la alerta.
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Por favor ingresa un correo electrónico valido."
            });
            // Salimos de la funcion para dejar de ejecutar el codigo.
            return;
        }
        
        // Comprobamos que los campos no esten vacios
        if(correo === "" || password === ""){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Por favor rellena todos los campos"
            });
            // Salimos de la funcion para dejar de ejecutar el codigo.
            return;
        }

        try{
            // Iniciamos la sesion con el correo y contraseña.
            await signInWithEmailAndPassword(auth, correo, password);
            navigate("/");

            // Atrapamos el error en caso de fallo.
        } catch(error) {
            cambiarEstadoAlerta(true);

            let mensaje;
            // obtenemos el código de error asociado con una instancia de error generada por una operación en Firebase.
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = "La contraseña no es correcta.";
                break;
                case 'auth/user-not-found':
                    mensaje = "No se encontro ninguna cuenta con este correo electrónico."
                break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				break;
            }
            
            cambiarAlerta({
                tipo: "error",
                mensaje: mensaje
            });
        }

    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to="/crear-cuenta" style={{textAlign:'center'}}>Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input 
                    type='email'
                    name='email'
                    placeholder='Correo Electrónico'
                    value={correo}
                    onChange={handleChange}
                /> 
                <Input 
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={handleChange}
                /> 
                <ContenedorBoton>
                    {/* Le decimos mediante la propiedad as, el tipo de elemento html que queres que sea */}
                    <Boton as="button" $primario type='submit'>Iniciar Sesion</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta 
            // Le pasamos el tipo y la alerta que recibe del estado.
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </>
    );
}
 
export default InicioSesion;