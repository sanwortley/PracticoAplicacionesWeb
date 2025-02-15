/*
   Configuración de rutas para la gestión de alumnos
*/

import express from 'express';
import * as controlador from './controlador.alumnos.mjs';

// Crear un router para las rutas relacionadas con alumnos
const rutasAlumnos = express.Router();

// Configurar express para que interprete automáticamente datos en formato JSON
rutasAlumnos.use(express.json());

/**
 * Ruta para obtener la lista completa de alumnos.
 * Realiza una solicitud GET en la ruta `/api/v1/alumnos`.
 * Invoca la función `obtenerAlumnos` desde el controlador.
 */
rutasAlumnos.get('/api/v1/alumnos', controlador.obtenerAlumnos);

/**
 * Ruta para obtener un alumno específico por su identificador.
 * Realiza una solicitud GET en la ruta `/api/v1/alumnos/:id`.
 * Invoca la función `obtenerAlumno` desde el controlador.
 * 
 * @param {string} id - Identificador del alumno a recuperar.
 */
rutasAlumnos.get('/api/v1/alumnos/:id', controlador.obtenerAlumno);

/**
 * Ruta para crear un nuevo alumno.
 * Realiza una solicitud POST en la ruta `/api/v1/alumnos`.
 * Invoca la función `crearAlumno` desde el controlador.
 */
rutasAlumnos.post('/api/v1/alumnos', controlador.crearAlumno);

/**
 * Ruta para actualizar la información de un alumno existente.
 * Realiza una solicitud PUT en la ruta `/api/v1/alumnos/:id`.
 * Invoca la función `modificarAlumno` desde el controlador.
 */
rutasAlumnos.put('/api/v1/alumnos/:id', controlador.modificarAlumno);

/**
 * Ruta para eliminar un alumno de la base de datos.
 * Realiza una solicitud DELETE en la ruta `/api/v1/alumnos/:id`.
 * Invoca la función `eliminarAlumno` desde el controlador.
 * 
 * @param {string} id - Identificador del alumno a eliminar.
 */
rutasAlumnos.delete('/api/v1/alumnos/:id', controlador.eliminarAlumno);

// Exportar las rutas configuradas para su uso en otros módulos
export default rutasAlumnos;

