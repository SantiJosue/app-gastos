import React, {useState} from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import styled from 'styled-components';
import theme from '../theme';

// format recibe la fecha y el valor que queremos obtener de esa fecha. 
// Por ultimo le pasamos un objeto con la propiedad locale que nos va a permitir traducir la fecha al español. 
// Como parametros vamos a recibir la fecha pero en caso de que no haya una fecha va a ser igual a new Date()
// de esta forma obtendremos la fecha actual.
const formatFecha = (fecha = new Date()) => {
    return format(fecha,`dd 'de' MMMM 'de' yyyy `, {locale: es});
} 

const DatePicker = ({fecha, cambiarFecha}) => {
    const [visible, cambiarVisible] = useState(false);

    return (
        <ContenedorInput>
            <input 
                type='text'
                readOnly
                value={formatFecha(fecha)}
                onClick={() => cambiarVisible(!visible)}
            />
            {visible && <DayPicker 
                mode='single'
                // selected es la fecha seleccionada actualmente.
                selected={fecha}
                // onSelect nos va a permitir cambiar la fecha.
                onSelect={cambiarFecha}
                locale={es}
            />}
        </ContenedorInput>
    );
}

const ContenedorInput = styled.div`
    position: relative;
    width: 340px;

    @media (max-width: 950px) {
        width: 100%;
        z-index: 100;
        font-size: 16px;
    }
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;

        @media (max-width: 950px) {
        font-size: 16px;     
        }
    }

/*  CALENDARIO DATEPICKER  */
    .rdp {
        position: absolute;
        
        @media (max-width: 950px) {
        width: 85%;     
        }
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
        border-radius: 10px;
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

export default DatePicker;