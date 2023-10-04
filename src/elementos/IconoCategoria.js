import React from 'react';
import {ReactComponent as IconoComida} from './../imagenes/cat_comida.svg'
import {ReactComponent as IconoCompras} from './../imagenes/cat_compras.svg'
import {ReactComponent as IconoCunetasYPagos} from './../imagenes/cat_cuentas-y-pagos.svg'
import {ReactComponent as IconoDiversion} from './../imagenes/cat_diversion.svg'
import {ReactComponent as IconoHogar} from './../imagenes/cat_hogar.svg'
import {ReactComponent as IconoRopa} from './../imagenes/cat_ropa.svg'
import {ReactComponent as IconoSaludEHigiene} from './../imagenes/cat_salud-e-higiene.svg'
import {ReactComponent as IconoTransporte} from './../imagenes/cat_transporte.svg'

const IconoCategoria = ({id}) => {
    switch(id){
        // Pasamos el mismo nombre que tenemos en el id de categorias
        case 'comida':
            return <IconoComida />
        case 'compras':
            return <IconoCompras />
        case 'cuentas y pagos':
            return <IconoCunetasYPagos />
        case 'diversion':
            return <IconoDiversion />
        case 'hogar':
            return <IconoHogar />
        case 'ropa':
            return <IconoRopa />
        case 'salud e higiene':
            return <IconoSaludEHigiene />
        case 'transporte':
            return <IconoTransporte />
        default:
            break;
    }
}
 
export default IconoCategoria;