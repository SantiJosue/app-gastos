import { useEffect, useState } from "react";
import { db } from "./../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc} from 'firebase/firestore';

const useObtenerGasto = (id) => {
    // En este estado vamos a guardar el gasto.
    const navigate = useNavigate();
    const [gasto, establecerGasto] = useState("");

    useEffect(() => {
        const obtenerGasto = async() => {
            // getDoc va a recibir el documento que queremos obtener.
            // doc recibe la base de datos, la coleccion y por ultimo el id.
            const documento = await getDoc(doc(db, "gastos", id));

            // Comprobamos que el documento exista.
            if(documento.exists){
                establecerGasto(documento);
            } else {
                navigate("/lista");
            }
        }     

        obtenerGasto(); // Llamamos la funcion.
    }, [navigate, id]); // Le pasamos las dependencias.

    return [gasto];
}
 
export default useObtenerGasto;