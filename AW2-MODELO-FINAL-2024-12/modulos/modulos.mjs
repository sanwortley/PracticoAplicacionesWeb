// Importar el módulo 'express' para crear el servidor y definir rutas.
import express from 'express';

// Importar las rutas de la versión 1 para la gestión de alumnos.
import rutasAlumnosV1 from './api-crud/v1/alumnos/rutas.alumnos.mjs';

// Importar las rutas de la versión 2 para la gestión de materias.
import rutasMateriasV2 from './api-crud/v2/materias/rutas.materias.mjs';

// Crear un enrutador para manejar las rutas de la API.
const modulosApi = express.Router();

// Configurar las rutas para la versión 1 (alumnos).
modulosApi.use(rutasAlumnosV1);

// Configurar las rutas para la versión 2 (materias).
modulosApi.use(rutasMateriasV2);

// Exportar el enrutador para que pueda ser utilizado en la configuración principal de la aplicación Express.
export default modulosApi;
