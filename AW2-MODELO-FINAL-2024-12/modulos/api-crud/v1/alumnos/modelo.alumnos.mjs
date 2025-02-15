/*
   Acceso a la capa de datos
*/

import pool from '../../../../conexion/conexion.bd.mjs';

/**
 * Obtiene la lista completa de alumnos desde la base de datos.
 * Realiza una consulta para recuperar todos los registros de la tabla "alumnos".
 * Devuelve los resultados si la consulta es exitosa.
 * Devuelve un error en caso de fallo.
 */
async function obtenerAlumnos() {
    try {
        const resultado = await pool.query('SELECT * FROM alumnos');
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Obtiene un alumno específico de la base de datos utilizando su identificador (id).
 * Realiza una consulta con un parámetro dinámico para recuperar el alumno correspondiente.
 * Devuelve los resultados si la consulta es exitosa.
 * Devuelve un error en caso de fallo.
 */
async function obtenerAlumno(id) {
    try {
        const resultado = await pool.query(
            'SELECT * FROM alumnos WHERE id=$1',
            [id]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Crea un nuevo alumno en la base de datos.
 * Inserta un nuevo registro en la tabla "alumnos" con los datos proporcionados.
 * Devuelve los detalles creados del alumno si la operación es exitosa.
 * Devuelve un error en caso de fallo.
 */
async function crearAlumno(alumno) {
    try {
        const { dni, nombre, apellido, email } = alumno;
        const resultado = await pool.query(
            `
            INSERT INTO alumnos
                (dni, nombre, apellido, email)
            VALUES
                ($1,$2,$3,$4)
            RETURNING id, dni
        `,
            [dni, nombre, apellido, email]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Modifica un alumno en la base de datos.
 * Actualiza los campos del alumno correspondiente al identificador proporcionado.
 * Devuelve los detalles actualizados si la operación es exitosa.
 * Devuelve un error en caso de fallo.
 */
async function modificarAlumno(alumno) {
    try {
        const { id, dni, nombre, apellido, email } = alumno;
        const resultado = await pool.query(
            `UPDATE alumnos 
                SET 
                    dni=$1,
                    nombre=$2,
                    apellido=$3,
                    email=$4 
                    WHERE id=$5
                RETURNING id, dni
            `,
            [dni, nombre, apellido, email, id]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Elimina un alumno de la base de datos utilizando su identificador (id).
 * Devuelve los detalles del alumno eliminado si la operación es exitosa.
 * Devuelve un error en caso de fallo.
 */
async function eliminarAlumno(id) {
    try {
        const resultado = await pool.query(
            `DELETE FROM alumnos 
                WHERE id=$1
                RETURNING id, dni
            `,
            [id]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Exportar las funciones para ser usadas por la capa de acceso a la lógica de negocio u otros módulos.
export {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    modificarAlumno,
    eliminarAlumno,
};
