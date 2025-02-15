/**
 * Función para procesar los datos de un formulario HTML y convertirlos en un objeto.
 * 

 */
export function procesarFormulario(formulario) {
    // Crear un objeto FormData con los datos del formulario.
    const datosFormulario = new FormData(formulario);
    // Convertir FormData en un objeto JavaScript normal y devolverlo.
    return Object.fromEntries(datosFormulario);
}

/**
 * Función para obtener el parámetro 'id' de la URL actual.
 * 
 */
export function obtenerParametroId() {
    // Crear un objeto URLSearchParams con los parámetros de la URL actual.
    const params = new URL(location.href).searchParams;
    // Obtener el valor del parámetro 'id' de la URL.
    return params.get('id');
}

/**
 * Función asíncrona para realizar una solicitud HTTP (alta de un registro) con un método específico y datos proporcionados.
 * 

 */
export async function altaRegistro(ruta, metodo, datos) {
    try {
        // Realizar la solicitud HTTP con la información proporcionada.
        const respuesta = await fetch(ruta, {
            headers: {
                'Content-Type': 'application/json', // Indicar que los datos se envían en formato JSON.
            },
            method: metodo, // Método HTTP para la solicitud.
            body: JSON.stringify(datos), // Convertir los datos en formato JSON.
        });
        // Devuelve la respuesta de la solicitud.
        return respuesta;
    } catch (error) {
        // Capturar cualquier error en la solicitud y mostrarlo en consola.
        console.log(error);
        throw error;
    }
}

/**
 * Función asíncrona para realizar una solicitud HTTP para eliminar un registro de la base de datos.
 */
export async function eliminarRegistro(ruta) {
    try {
        // Realizar la solicitud DELETE en la ruta proporcionada.
        const respuesta = await fetch(ruta, {
            method: 'DELETE', // Método HTTP DELETE para eliminar el recurso.
        });
        // Devuelve la respuesta de la solicitud.
        return respuesta;
    } catch (error) {
        // Capturar cualquier error en la solicitud y mostrarlo en consola.
        console.log(error);
        throw error;
    }
}

/**
 * Función asíncrona para obtener registros de una ruta específica.
 */
export async function obtenerRegistros(ruta) {
    try {
        // Realizar la solicitud para obtener los registros de la ruta dada.
        return await fetch(ruta);
    } catch (error) {
        // Capturar cualquier error en la solicitud y mostrarlo en consola.
        console.log(error);
        throw error;
    }
}
