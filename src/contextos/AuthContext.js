import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

// Creamos el contexto.
const AuthContext = React.createContext();

// Hook para acceder al contexto.
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();

    // Creamos un state para saber cuando termine de cargar la comprobacion de onAuthStateChanged.
    const [cargando, cambiarCargando] = useState(true);

    // Efecto para ejecutar la comprobacion una vez.
    useEffect(() => {
        // Comprobamos si hay un usuario.
        // onAuthStateChanged va a hacer una comprobacion de cuando el estado de autenticacion cambia.
        // Cuando cerramos sesion, vamos a cancelar la suscripcion.
        // Esto es un observador de estado.
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });
        // Ejecutamos cancelarSuscripcion cuando desmontamos el componente(cerramos sesion).
        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {/* Solamente retornamos los elementos hijo cuando no  este cargando. 
            de esta forma nos aseguramos de no cargar el resto de la app hasta que el usuario haya sido establecido. */}
            {/* Si no hacemos esto al refrescar la pagina el componente children intentara cargar inmediatamente,
            antes de haber comprobado que existe el usuario. */}
            {!cargando && children}
        </AuthContext.Provider>
    );
}
 
export {AuthProvider, AuthContext, useAuth};