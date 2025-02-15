/**
 * Función asíncrona para renderizar el formulario de una materia con los datos obtenidos.
 */
export async function renderizarFormularioMaterias(registros, formulario) {
    try {
        // Parsear los datos JSON de la respuesta.
        const datos = await registros.json();
        
        if (registros.ok) {
            // Llenar los campos del formulario con la información obtenida del servidor.
            formulario.nombre.value = datos[0].nombre;
            formulario.modulos_por_semana.value = datos[0].modulos_por_semana;
        } else {
            console.log('Materia no encontrada');
        }
    } catch (error) {
        // Manejo de errores en caso de fallo en el proceso de solicitud o parseo.
        console.log(error);
        throw error;
    }
}

/**
 * Función asíncrona para renderizar una lista de materias en una tabla HTML.
 */
export async function renderizarListadoMaterias(respuesta) {
    try {
        // Parsear los datos JSON de la respuesta.
        const datosMaterias = await respuesta.json();

        if (respuesta.ok) {
            // Seleccionar el contenedor HTML donde se mostrarán los datos de las materias.
            const contenedorMaterias = document.getElementById('contenedor-materias');
            let filas = '';

            // Crear dinámicamente las filas para cada materia en la lista.
            datosMaterias.forEach((materia) => {
                filas += `
                    <tr>
                        <td>${materia.nombre}</td>
                        <td>${materia.modulos_por_semana}</td>
                        <td><a href="./editar.html?id=${materia.id}">Editar</a></td>
                    </tr>
                `;
            });

            // Actualizar el contenido del contenedor con las filas generadas.
            contenedorMaterias.innerHTML = filas;
        } else {
            console.log(datosMaterias.mensaje);
        }
    } catch (error) {
        // Manejo de errores en caso de fallo en el proceso de solicitud o parseo.
        console.log(error);
    }
}
