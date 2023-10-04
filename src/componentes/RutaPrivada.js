import React from 'react';
import { useAuth } from '../contextos/AuthContext';
import { Navigate} from 'react-router-dom';

// accedemos a los elementos que esten dentro de nuestro componenete con la palabra "children".
const RutaPrivada = ({children}) => {
    // Obtenemos el usuario con su sesion.
    const {usuario} = useAuth();

    if(usuario){
        // Si el usuario tiene una sesion, entonces devolvemos el componente.
        return children;
    } else {
        // de lo contrario redireccionamos a la pagina de iniciar sesion.
        return <Navigate replace to="/Iniciar-sesion" />
    }
}
 
export default RutaPrivada;