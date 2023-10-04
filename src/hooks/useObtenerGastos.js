import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit, startAfter } from 'firebase/firestore';

const useObtenerGastos = () => {
	const {usuario} = useAuth();
	const [gastos, cambiarGastos] = useState([]);
	// Es este estado vamos a guardar el ultimo gasto que cargamos.
	const [ultimoGasto, cambiarUltimoGasto] = useState(null);
	// En este estado guardamos true/false si tenemos mas elementos por cargar.
	const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

	const obtenerMasGastos = () => {
		// Creamos la consulta.
		const consulta = query(
			collection(db, 'gastos'),
			where('uidUsuario', '==', usuario.uid),
			orderBy('fecha', 'desc'),	
			limit(10),
			// Este codigo se ejecuta despues del ultimo gasto que cargamos.
			startAfter(ultimoGasto),
		);
		// Esta funcion se va a ejecutar para juntar los gastos que teniamos mas los que vamos a cargar.
		// Recibe la consulta y luego el snapshot con la funcion a ejecutar.
		onSnapshot(consulta, (snapshot) => {
			// Si el arreglo de documentos o gastos es mayor a 0 ejecutamos el siguiente codigo.
			if(snapshot.docs.length > 0){
				// Obtenemos los ultimos gastos
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
				// A estos ultimos gastos vamos a concatenarle los gastos que ya teniamos.
				// Establecemos cambiarGastos para aplicar los cambios.
				cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
					// Obtenemos toda la info de los gastos y agregamos el id del gasto
					return {...gasto.data(), id: gasto.id}
				})))
			} else {
				cambiarHayMasPorCargar(false);
			}
		}, error => {console.log(error)});
		
	}

	useEffect(() => {
		// query nos permite hacer la consulta y agregar los filtros.
		const consulta = query(
			// Accedemos a la base de datos y a la coleccion de gastos.
			collection(db, 'gastos'),
			// Donde el uidUsuario se a igual al uid del usuario.
			where('uidUsuario', '==', usuario.uid),
			// Ordenamos por fechas en formato descendente.
			orderBy('fecha', 'desc'),
			// Establecemos el limite de la carga de gastos.
			limit(10)
		);
		// onSnapshot se va a ejecutar cada vez que detecte un cambio en la base de datos.
		// le pasamos como parametro nuestra consulta mas el snapshot que representa todos 
		// los elementos que teniamos que han cambiado.
		const unsuscribe = onSnapshot(consulta, (snapshot) => {
			// Si la cantidad de docs es mayor a 0 entonces significa que tenmos gastos por cargar.
			if(snapshot.docs.length > 0){
				// Obtenemos el ultimo gasto.
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
				cambiarHayMasPorCargar(true);
			} else {
				// De lo contraria ya no devolvemos los gastos.
				cambiarHayMasPorCargar(false);
			}
			// Iteramos sobre la coleccion de gastos
			cambiarGastos(snapshot.docs.map((gasto) => {
				// Obtenemos toda la info de los gastos y agregamos el id del gasto.
				return {...gasto.data(), id: gasto.id}
			}));
		});
		// Nos desuscribimos para poder agregar los gastos cuando se desmonte el componente.
		return unsuscribe; // Se ejecuta cuando desmontamos el componente.
	}, [usuario]); // Este codigo se ejecuta cuando carga la pag por primera vez o cuando el usuario cambie.

	return [gastos,obtenerMasGastos, hayMasPorCargar];
}
export default useObtenerGastos;