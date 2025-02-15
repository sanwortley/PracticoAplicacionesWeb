import express from 'express';
import * as controlador from './controlador.materias.mjs';

/**
 * Configuración de las rutas para la gestión de materias.
 * Se utiliza un router de Express para definir rutas RESTful
 * relacionadas con las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
 */
const rutasMaterias = express.Router();

// Middleware para analizar datos en formato JSON en el cuerpo de las solicitudes
rutasMaterias.use(express.json());

/**
 * Ruta para obtener todas las materias.
 * Método HTTP: GET
 * URL: /api/v2/materias
 * Descripción: Recupera la lista completa de materias desde la base de datos.
 */
rutasMaterias.get('/api/v2/materias', controlador.obtenerMaterias);

/**
 * Ruta para obtener una materia específica por su ID.
 * Método HTTP: GET
 * URL: /api/v2/materias/:id
 * Descripción: Recupera una materia por su identificador único (ID).
 */
rutasMaterias.get('/api/v2/materias/:id', controlador.obtenerMateria);

/**
 * Ruta para agregar una nueva materia.
 * Método HTTP: POST
 * URL: /api/v2/materias
 * Descripción: Crea una nueva materia en la base de datos.
 */
rutasMaterias.post('/api/v2/materias', controlador.agregarMateria);

/**
 * Ruta para actualizar una materia existente.
 * Método HTTP: PUT
 * URL: /api/v2/materias/:id
 * Descripción: Actualiza la información de una materia específica en la base de datos.
 */
rutasMaterias.put('/api/v2/materias/:id', controlador.modificarMateria);

/**
 * Ruta para eliminar una materia.
 * Método HTTP: DELETE
 * URL: /api/v2/materias/:id
 * Descripción: Elimina una materia de la base de datos por su identificador (ID).
 */
rutasMaterias.delete('/api/v2/materias/:id', controlador.eliminarMateria);

/**
 * Exporta las rutas configuradas para ser utilizadas en la aplicación principal.
 * Estas rutas son importadas en el archivo principal de la aplicación Express.
 */
export default rutasMaterias;

