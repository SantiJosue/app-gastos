import React from 'react';
import {ReactComponent as IconoCerrarSesion} from './../imagenes/log-out.svg';
import Boton from '../elementos/Boton';
import {auth} from './../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const BotonCerrrarSesion = () => {
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        try{
            // signOut recibe como parametro el auth para poder cerrar la sesion.
            await signOut(auth);
            // Reedirigimos a iniciar sesion.
            navigate("/iniciar-sesion");

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Boton $iconoGrande as="button" onClick={cerrarSesion}>
            <IconoCerrarSesion />
        </Boton>
    );
}
 
export default BotonCerrrarSesion;