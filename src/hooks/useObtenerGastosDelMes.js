import { useEffect, useState } from "react";
import { db } from './../firebase/firebaseConfig';
import { collection, onSnapshot, query, orderBy, where} from 'firebase/firestore';
import { startOfMonth, endOfMonth, getUnixTime} from "date-fns";
import {useAuth} from './../contextos/AuthContext';

const useObtenerGastosDelMes = () => {
    const [gastos, establecerGastos] = useState([]);
    const {usuario} = useAuth();
    
    useEffect(() => {
        const inicioDeMes = getUnixTime(startOfMonth(new Date()));
        const FinDeMes = getUnixTime(endOfMonth(new Date()));

        if(usuario){
            const consulta = query(
                collection(db, "gastos"),
                orderBy("fecha", "desc"),
                // Obtenemos todas las fechas desde el comienzo hasta el fin del mes.
                where("fecha", ">=", inicioDeMes),
                where("fecha", "<=", FinDeMes),
                // Obtenemos solo los gastos del usuario.
                where("uidUsuario", "==", usuario.uid)
            );

            // Establecemos los gastos.
            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                establecerGastos(snapshot.docs.map((documento) => {
                    return {...documento.data(), id: documento.id};
                }))
            }, (error) => {console.log(error)});

            // Use Effect tiene que retornar una funcion que se va a ejecutar cuando se desmonte el componente.
            // En este caso queremos que ejecute el unsucribe a la coleccion de firestore.
            return unsuscribe; // Finalizamos la conexion.
        }

    }, [usuario]);

    return gastos;
}
 
export default useObtenerGastosDelMes;