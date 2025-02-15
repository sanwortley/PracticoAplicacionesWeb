// Importar la función para renderizar la lista de materias desde el archivo 'funciones.js'.
import { renderizarListadoMaterias } from './funciones.js';

// Importar la función para realizar solicitudes HTTP desde el archivo de utilidades.
import { obtenerRegistros } from '../../../recursos/js/utilidades.js';

// Realizar una solicitud asíncrona para obtener los datos de las materias desde la ruta de la API.
const respuesta = await obtenerRegistros('/api/v2/materias');

// Llamar a la función para renderizar la lista de materias en la interfaz de usuario utilizando la respuesta obtenida.
renderizarListadoMaterias(respuesta);
