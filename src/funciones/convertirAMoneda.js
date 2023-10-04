const formatearCantidad = (cantidad) => {
    // Intl nos permite trabajar con internacionalización y localización.
    // Nos proporciona funcionalidades para formatear números, fechas, monedas.
    return new Intl.NumberFormat(
        // Formato de moneda de Estados Unidos.
        "en-US",
        // Estilo del formato de moneda.
        {style: "currency", currency: "USD", minimumFractionDigits: 2}
    // Formateamos la cantidad con los nuevos valores.
    ).format(cantidad);
}
 
export default formatearCantidad;