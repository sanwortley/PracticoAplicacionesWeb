// Importamos funciones para procesar el formulario y enviar solicitudes al servidor
import {
    procesarFormulario,
    altaRegistro,
} from '../../../recursos/js/utilidades.js';

// Referenciar el formulario de edición de materia y el contenedor de mensajes
const formularioMateria = document.getElementById('form-editar');
const mensajes = document.getElementById('mensajes');

// Asignar un escuchador al evento submit del formulario
formularioMateria.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
        // Procesar los datos del formulario para obtenerlos en formato adecuado
        const datosFormulario = procesarFormulario(formularioMateria);

        // Enviar una solicitud POST al servidor con la información del formulario
        const respuesta = await altaRegistro(
            '/api/v2/materias/', // Endpoint para el alta de materias
            'POST', // Método HTTP
            datosFormulario // Datos procesados
        );

        // Parsear la respuesta JSON para obtener la información
        const datos = await respuesta.json();
        const { mensaje } = datos; // Extraer el mensaje de la respuesta

        // Mostrar el mensaje de éxito o error en la interfaz
        mensajes.innerHTML = mensaje;
    } catch (error) {
        // Capturar cualquier error en el proceso de envío
        console.log(error);
        mensajes.innerHTML = 'No se pudo dar de alta la materia';
    }
});
