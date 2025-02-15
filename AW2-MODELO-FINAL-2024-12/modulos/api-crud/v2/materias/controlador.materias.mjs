/*
Conecta capa de datos a respuesta clientes
*/
import * as modelo from './modelo.materias.mjs';

/**
 * Obtiene todas las materias disponibles.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
async function obtenerMaterias(req, res) {
    try {
        const resultado = await modelo.obtenerMaterias();
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Materias no encontradas' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Obtiene una materia específica por su ID.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
async function obtenerMateria(req, res) {
    try {
        // Asignación desestructurante 
        const { id } = req.params;
        const resultado = await modelo.obtenerMateria(id);
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Materia no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Agrega una nueva materia.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
async function agregarMateria(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { nombre, modulos_por_semana } = req.body;
        const resultado = await modelo.agregarMateria({
            nombre,
            modulos_por_semana,
        });
        // Ámbito SP4/H3 p.263 TID AW1
        const { nombre: materiaAgregada } = resultado.rows[0];
        res.json({ mensaje: `Materia ${materiaAgregada} dada de alta` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Modifica una materia existente.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
async function modificarMateria(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const { nombre, modulos_por_semana } = req.body;
        if (!nombre || !modulos_por_semana) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const resultado = await modelo.modificarMateria({
            id,
            nombre,
            modulos_por_semana,
        });
        // Ámbito SP4/H3 p.263 TID AW1
        const { nombre: materiaModificada } = resultado.rows[0];
        res.json({ mensaje: `Materia ${materiaModificada} modificada` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/**
 * Elimina una materia específica por su ID.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
async function eliminarMateria(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const resultado = await modelo.eliminarMateria(id);
        if (resultado.rows.length > 0) {
            const { nombre: materiaEliminada } = resultado.rows[0];
            res.status(200).json({ mensaje: `Materia: ${materiaEliminada} eliminada` });
        } else {
            res.status(404).json({ mensaje: 'Materia no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

export { obtenerMaterias, obtenerMateria, agregarMateria, modificarMateria, eliminarMateria };