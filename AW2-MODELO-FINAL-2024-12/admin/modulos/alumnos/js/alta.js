/*
Gestión de envío de formulario para la creación de alumnos
*/

import {
    procesarFormulario, // Función para procesar datos de formulario
    altaRegistro, // Función para enviar los datos al servidor
} from '../../../recursos/js/utilidades.js';

// ----------------------------------------------
// Referenciamos elementos del DOM
const formulario = document.getElementById('form-editar'); // Referencia al formulario de edición
const mensajes = document.getElementById('mensajes'); // Referencia al contenedor de mensajes para retroalimentación al usuario

// ----------------------------------------------
// Asignar un escuchador de evento al formulario
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recarga de página)

    // Obtener los datos del formulario usando la función `procesarFormulario`
    const datosFormulario = procesarFormulario(formulario);

    try {
        // Enviar los datos al servidor utilizando la función `altaRegistro`
        const respuesta = await altaRegistro(
            '/api/v1/alumnos/',
            'POST',
            datosFormulario
        );

        // Parsear la respuesta JSON
        const datos = await respuesta.json();
        const { mensaje } = datos; // Extraer el mensaje de la respuesta

        // Mostrar el mensaje al usuario
        mensajes.innerHTML = mensaje;
    } catch (error) {
        // Capturar y manejar errores en caso de fallo en la solicitud
        console.log(error);
        mensajes.innerHTML = 'No se pudo dar de alta el registro';
    }
});
