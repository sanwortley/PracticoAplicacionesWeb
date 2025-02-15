// Importamos funciones necesarias
import { renderizarFormularioMaterias } from './funciones.js';
import {
    procesarFormulario,
    obtenerParametroId,
    altaRegistro,
    obtenerRegistros,
    eliminarRegistro,
} from '../../../recursos/js/utilidades.js';

// ---------------------------------------------------------
// Recuperamos el ID de la materia a editar desde la URL
const id = obtenerParametroId();
// Referenciamos el formulario de edición, el botón de eliminación y el contenedor de mensajes
const formulario = document.getElementById('form-editar');
const botonEliminar = document.getElementById('eliminar-registro');
const mensajes = document.getElementById('mensajes');

// ---------------------------------------------------------
// Asignar un escuchador al evento click del botón de eliminar
botonEliminar.addEventListener('click', async (evento) => {
    evento.preventDefault();
    if (confirm('Eliminar registro?')) { // Confirmación previa para evitar acciones accidentales

        // Realizamos la solicitud al servidor para eliminar la materia
        const respuesta = await eliminarRegistro('/api/v2/materias/' + id);

        // Procesamos la respuesta
        const { mensaje } = await respuesta.json();
        if (respuesta.ok) {
            formulario.style.display = 'none'; // Ocultamos el formulario en caso de éxito
        } else {
            console.log(mensaje); // Log de error en caso de fallo
        }

        // Mostramos el mensaje en la interfaz
        mensajes.innerHTML = mensaje;

        // Redirigir después de un breve tiempo para evitar un bucle
        setTimeout(() => {
            location.href = './';
        }, 2000);
    } else {
        return false; // Cancela la operación si el usuario lo decide
    }
});

// ---------------------------------------------------------
// Asignar un escuchador al evento submit para enviar los datos editados
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Prevenir comportamiento por defecto del formulario

    // Procesar los datos del formulario antes de enviarlos
    const datosFormulario = procesarFormulario(formulario);

    // Realizar la solicitud PUT para enviar la información editada al servidor
    const respuesta = await altaRegistro(
        '/api/v2/materias/' + id, 
        'PUT', 
        datosFormulario
    );

    // Procesar la respuesta
    const { mensaje } = await respuesta.json();
    mensajes.innerHTML = mensaje; // Mostrar el mensaje de éxito/error al usuario
});

// ---------------------------------------------------------
// Renderizar datos en el formulario para su edición
const resultado = await obtenerRegistros('/api/v2/materias/' + id);
renderizarFormularioMaterias(resultado, formulario);
