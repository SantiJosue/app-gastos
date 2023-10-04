import {db} from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const agregarGasto = ({categoria, inputDescripcion, cantidad, fecha, uidUsuario}) => {
    // Accedemos a la base de datos, luego accedemos a la coleccion, y le pasamos la funcion
    // esta recibe como parametro un objeto que contiene las propiedades que queremos agregar.
   return addDoc(collection(db, 'gastos'), {
        categoria: categoria,
        descripcion: inputDescripcion,
        cantidad: cantidad,
        fecha: fecha,
        uidUsuario: uidUsuario
    });
}

export default agregarGasto;