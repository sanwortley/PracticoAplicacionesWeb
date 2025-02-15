/*
Función para renderizar el formulario de edición de alumnos
*/

export async function renderizarFormularioAlumnos(registros, formulario) {
    try {
        // Parsear los datos JSON de la respuesta.
        const datos = await registros.json();

        if (registros.ok) {
            // Llenar los campos del formulario con la información obtenida del servidor.
            formulario.dni.value = datos[0].dni; // Asignar el valor al campo de DNI
            formulario.nombre.value = datos[0].nombre; // Asignar el valor al campo de nombre
            formulario.apellido.value = datos[0].apellido; // Asignar el valor al campo de apellido
            formulario.email.value = datos[0].email; // Asignar el valor al campo de email
        } else {
            // Mensaje de error si el servidor devuelve un estado que no es "ok"
            console.log('Alumno no encontrado');
        }
    } catch (error) {
        // Capturar y lanzar el error para su manejo en otro nivel
        console.log(error);
        throw error;
    }
}

/*
Función para renderizar la lista de alumnos en la página
*/

export async function renderizarListadoAlumnos(respuesta) {
    try {
        // Parsear los datos JSON de la respuesta.
        const datosAlumnos = await respuesta.json();

        if (respuesta.ok) {
            // Seleccionar el contenedor HTML donde se mostrarán los datos de los alumnos.
            const contenedorAlumnos = document.getElementById('contenedor-alumnos');
            let filas = ''; // Variable para construir las filas dinámicamente

            // Crear filas dinámicamente para cada alumno en la lista.
            datosAlumnos.forEach((alumno) => {
                filas += `
                    <tr>
                        <td>${alumno.dni}</td>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.apellido}</td>
                        <td>${alumno.email}</td>
                        <td><a href="./editar.html?id=${alumno.id}">Editar</a></td>
                    </tr>
                `;
            });

            // Actualizar el HTML con las filas generadas.
            contenedorAlumnos.innerHTML = filas;
        } else {
            // Mensaje en caso de error en la respuesta
            console.log(datosAlumnos.mensaje);
        }
    } catch (error) {
        // Capturar cualquier error que ocurra en el proceso
        console.log(error);
    }
}
