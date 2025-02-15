/*
   Conecta la capa de datos con la respuesta para el cliente
*/
import * as modelo from './modelo.alumnos.mjs';

/**
 * Obtiene la lista de todos los alumnos de la base de datos.
 * Devuelve los datos en formato JSON si se encuentran registros.
 * Responde con un código 404 si no se encuentran alumnos.
 * Responde con un código 500 en caso de error interno.
 * 
 * @param {Object} req - El objeto de solicitud Express.
 * @param {Object} res - El objeto de respuesta Express.
 */
async function obtenerAlumnos(req, res) {
    try {
        const resultado = await modelo.obtenerAlumnos();
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Alumnos no encontrados' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Obtiene un alumno específico de la base de datos por su identificador.
 * Responde con los datos del alumno si se encuentra en la base de datos.
 * Devuelve un código 404 si no se encuentra el alumno.
 * Devuelve un código 500 en caso de error interno.
 * 
 * @param {Object} req - El objeto de solicitud Express.
 * @param {Object} res - El objeto de respuesta Express.
 */
async function obtenerAlumno(req, res) {
    try {
        const { id } = req.params; // Extraer el parámetro 'id' de la ruta.
        const resultado = await modelo.obtenerAlumno(id);
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Crea un nuevo alumno en la base de datos.
 * Valida que los datos del formulario no estén vacíos antes de enviarlos.
 * Devuelve un mensaje de éxito si el alumno es creado correctamente.
 * Devuelve un código 400 si los datos están incompletos.
 * Devuelve un código 500 en caso de error interno.
 */
async function crearAlumno(req, res) {
    try {
        const { dni, nombre, apellido, email } = req.body; // Extraer los datos del cuerpo de la solicitud.
        if (!dni || !nombre || !apellido || !email) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const resultado = await modelo.crearAlumno({
            dni,
            nombre,
            apellido,
            email,
        });
        const { dni: dniCreado } = resultado.rows[0];
        res.json({ mensaje: `Alumno ${dniCreado} dado de alta` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Modifica los datos de un alumno existente en la base de datos.
 * Valida que los datos de la solicitud no estén vacíos.
 * Devuelve un mensaje de éxito si el alumno es modificado correctamente.
 * Devuelve un código 400 si los datos están incompletos.
 * Devuelve un código 500 en caso de error interno.
 */
async function modificarAlumno(req, res) {
    try {
        const { id } = req.params; // Extraer el identificador del alumno de la ruta.
        const { dni, nombre, apellido, email } = req.body; // Extraer los datos del cuerpo de la solicitud.
        if (!id || !dni || !nombre || !apellido || !email) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const resultado = await modelo.modificarAlumno({
            id,
            dni,
            nombre,
            apellido,
            email,
        });
        const { dni: dniModificado } = resultado.rows[0];
        res.json({ mensaje: `Alumno ${dniModificado} modificado` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Elimina un alumno de la base de datos por su identificador.
 * Responde con un mensaje de éxito si se elimina el registro correctamente.
 * Devuelve un código 404 si el alumno no se encuentra en la base de datos.
 * Devuelve un código 500 en caso de error interno.
 */
async function eliminarAlumno(req, res) {
    try {
        const { id } = req.params; // Extraer el identificador del alumno de la ruta.
        const resultado = await modelo.eliminarAlumno(id);
        if (resultado.rows.length > 0) {
            const { dni: dniEliminado } = resultado.rows[0];
            res.status(200).json({ mensaje: `Alumno dni: ${dniEliminado} eliminado` });
        } else {
            res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

// Exportar las funciones para que puedan ser usadas en las rutas de Express.
export { obtenerAlumnos, obtenerAlumno, crearAlumno, modificarAlumno, eliminarAlumno };
