// Importar la función para renderizar la lista de alumnos desde el módulo 'funciones.js'.
import { renderizarListadoAlumnos } from './funciones.js';

// Importar la función para realizar solicitudes de datos desde el módulo de utilidades.
import { obtenerRegistros } from '../../../recursos/js/utilidades.js';

// Realizar una solicitud asíncrona para obtener los datos de los alumnos desde la ruta de la API.
const respuesta = await obtenerRegistros('/api/v1/alumnos');

// Llamar a la función para renderizar la lista de alumnos en la interfaz de usuario con los datos obtenidos.
renderizarListadoAlumnos(respuesta);