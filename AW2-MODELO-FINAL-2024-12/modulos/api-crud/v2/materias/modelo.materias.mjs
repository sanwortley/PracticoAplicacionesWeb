/*
Acceso a la capa de datos
*/
import pool from '../../../../conexion/conexion.bd.mjs';

/**
 * Obtiene todas las materias de la base de datos.
 * @returns {Promise} Promesa que resuelve con el resultado de la consulta.
 */
async function obtenerMaterias() {
    try {
        const resultado = await pool.query('SELECT * FROM materias');
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Obtiene una materia específica por su ID.
 * @param {number} id - ID de la materia a obtener.
 * @returns {Promise} Promesa que resuelve con el resultado de la consulta.
 */
async function obtenerMateria(id) {
    try {
        const resultado = await pool.query(
            'SELECT * FROM materias WHERE id=$1',
            [id]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Agrega una nueva materia a la base de datos.
 * @param {Object} materia - Objeto con los datos de la materia.
 * @param {string} materia.nombre - Nombre de la materia.
 * @param {number} materia.modulos_por_semana - Cantidad de módulos por semana.
 * @returns {Promise} Promesa que resuelve con el resultado de la inserción.
 */
async function agregarMateria(materia) {
    try {
        const { nombre, modulos_por_semana } = materia;
        const resultado = await pool.query(
            `
            INSERT INTO materias
                (nombre, modulos_por_semana)
            VALUES
                ($1,$2)
            RETURNING id, nombre
        `,
            [nombre, modulos_por_semana]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Modifica una materia existente en la base de datos.
 * @param {Object} materia - Objeto con los datos actualizados de la materia.
 * @param {number} materia.id - ID de la materia a modificar.
 * @param {string} materia.nombre - Nombre actualizado de la materia.
 * @param {number} materia.modulos_por_semana - Cantidad actualizada de módulos por semana.
 * @returns {Promise} Promesa que resuelve con el resultado de la actualización.
 */
async function modificarMateria(materia) {
    try {
        const { id, nombre, modulos_por_semana } = materia;
        const resultado = await pool.query(
            `
            UPDATE materias 
                SET 
                    nombre=$1,
                    modulos_por_semana=$2
                    WHERE id=$3
                RETURNING id, nombre
            `,
            [nombre, modulos_por_semana, id]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Elimina una materia específica de la base de datos por su ID.
 * @param {number} id - ID de la materia a eliminar.
 * @returns {Promise} Promesa que resuelve con el resultado de la eliminación.
 */
async function eliminarMateria(id) {
    try {
        const resultado = await pool.query(
            `DELETE FROM materias 
                WHERE id=$1
                RETURNING id, nombre
            `,
            [id]
        );
        return resultado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    obtenerMaterias,
    obtenerMateria,
    modificarMateria,
    eliminarMateria,
    agregarMateria
};
