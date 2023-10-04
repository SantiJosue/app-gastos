import { db } from "./firebaseConfig";
// doc nos permite especificar con que documento vamos a trabajar.
// deleteDoc nos permite borrar documentos.
import {doc, deleteDoc} from 'firebase/firestore';

const borrarGasto = async (id) => {
    await deleteDoc(doc(db, "gastos", id));
}
 
export default borrarGasto;