/*
Gestión de formulario para la edición de alumnos
*/

import {
    renderizarFormularioAlumnos, // Función para renderizar datos en el formulario
} from './funciones.js';
import {
    procesarFormulario, // Función para procesar datos del formulario
    obtenerParametroId, // Función para obtener el parámetro ID de la URL
    altaRegistro, // Función para enviar solicitudes POST/PUT al servidor
    obtenerRegistros, // Función para obtener registros desde el servidor
    eliminarRegistro, // Función para enviar solicitudes DELETE al servidor
} from '../../../recursos/js/utilidades.js';

// ---------------------------------------------------------
// Obtención de elementos clave
const id = obtenerParametroId(); // Obtener el ID del alumno desde la URL
const formulario = document.getElementById('form-editar'); // Referencia al formulario de edición
const botonEliminar = document.getElementById('eliminar-registro'); // Referencia al botón de eliminar
const mensajes = document.getElementById('mensajes'); // Contenedor para mostrar mensajes al usuario

// ---------------------------------------------------------
// Configurar el evento de eliminación de registro
botonEliminar.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

    if (confirm('Eliminar registro?')) { // Confirmar con el usuario antes de eliminar
        try {
            const respuesta = await eliminarRegistro(
                '/api/v1/alumnos/' + id
            );

            // Parsear la respuesta del servidor
            const { mensaje } = await respuesta.json();
            if (respuesta.ok) {
                formulario.style.display = 'none'; // Ocultar el formulario si la eliminación es exitosa
            } else {
                console.log(mensaje); // Mostrar en consola el mensaje de error
            }

            mensajes.innerHTML = mensaje; // Mostrar el mensaje al usuario
            setTimeout(() => {
                location.href = './'; // Redirigir al usuario después de 2 segundos
            }, 2000);
        } catch (error) {
            console.log(error);
            mensajes.innerHTML = 'No se pudo eliminar el registro';
        }
    } else {
        return false; // Si el usuario cancela la confirmación, no hacer nada
    }
});

// ---------------------------------------------------------
// Configurar el evento de envío del formulario
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Prevenir la acción por defecto del formulario

    // Obtener los datos del formulario
    const datosFormulario = procesarFormulario(formulario);

    try {
        const respuesta = await altaRegistro(
            '/api/v1/alumnos/' + id,
            'PUT',
            datosFormulario
        );

        // Parsear la respuesta JSON
        const { mensaje } = await respuesta.json();
        mensajes.innerHTML = mensaje; // Mostrar el mensaje al usuario
    } catch (error) {
        console.log(error);
        mensajes.innerHTML = 'No se pudo enviar la información';
    }
});

// ---------------------------------------------------------
// Cargar los datos existentes para prellenar el formulario
const resultado = await obtenerRegistros('/api/v1/alumnos/' + id);
renderizarFormularioAlumnos(resultado, formulario); // Renderizar datos en el formulario
