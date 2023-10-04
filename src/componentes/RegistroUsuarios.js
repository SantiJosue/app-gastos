import React, {useState} from 'react';
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import Boton from './../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import {ReactComponent as SvgLogin} from './../imagenes/registro.svg';
import styled from 'styled-components';
import {auth} from './../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {
    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [password2, establecerPassword2] = useState('');
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        switch(e.target.name){
            case 'email':
                establecerCorreo(e.target.value);
            break;
            case 'password':
                establecerPassword(e.target.value);
            break;
            case 'password2':
                establecerPassword2(e.target.value);
            break;
            default:
                break;
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
        if(correo === "" || password === "" || password2 === ""){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Por favor rellena todos los campos"
            });
            // Salimos de la funcion para dejar de ejecutar el codigo.
            return;
        }

        // Comprobamos que las contraseñas sean iguales.
        if(password !== password2){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Las contraseñas no coinciden."
            });
            // Salimos de la funcion para dejar de ejecutar el codigo.
            return;
        }

        try{
            // Registramos el usuario con correo y contraseña.
            await createUserWithEmailAndPassword(auth, correo, password);
            navigate("/");

            // Atrapamos el error en caso de fallo.
        } catch(error) {
            cambiarEstadoAlerta(true);
            let mensaje;
            // obtenemos el código de error asociado con una instancia de error generada por una operación en Firebase.
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = "La contraseña debe tener al menos 6 caracteres."
                break;
                case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
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
                <title>Crear Cuenta</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
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
                <Input 
                    type='password'
                    name='password2'
                    placeholder='Repetir la Contraseña'
                    value={password2}
                    onChange={handleChange}
                /> 
                <ContenedorBoton>
                    {/* Le decimos mediante la propiedad as, el tipo de elemento html que queres que sea */}
                    <Boton as="button" $primario type='submit'>Crear Cuenta</Boton>
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
 
export default RegistroUsuarios;