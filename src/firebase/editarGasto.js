import {db} from './firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

const editarGasto = async({id, categoria, inputDescripcion, cantidad, fecha}) => {
    // Actualizamos los gastos.
    const documento = doc(db, 'gastos', id);
    return await updateDoc(documento, {
        categoria: categoria,
        descripcion: inputDescripcion,
        cantidad: cantidad,
        fecha: fecha,
    });
}

export default editarGasto;