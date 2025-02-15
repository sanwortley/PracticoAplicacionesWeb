/*
Configuración principal del servidor Express con PostgreSQL
*/

import pg from 'pg';
// Importar configuraciones globales de entorno
import './config/config.mjs';
// Importar Express
import express from 'express';
// Importar módulos de rutas específicos para la aplicación
import modulosAp1 from './modulos/modulos.mjs';

// Configurar el puerto principal del servidor
const PORT = process.env.PORT || 3333;
const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;

// Crear instancia de Pool de conexiones para PostgreSQL
const { Pool } = pg;
const pool = new Pool({
    host: 'localhost', // Host de la base de datos PostgreSQL
    user: PG_USER, // Usuario de la base de datos
    database: 'academia', // Nombre de la base de datos
    port: 5432, // Puerto por defecto de PostgreSQL
    password: PG_PASSWORD, // Contraseña de acceso
    max: 20, // Máximo número de conexiones
    idleTimeoutMillis: 30000, // Tiempo máximo para mantener conexiones inactivas
    connectionTimeoutMillis: 2000, // Tiempo máximo para intentar conectar
});

// Configurar la variable de entorno para el servidor
const PUERTO = process.env.PUERTO;

// Instanciar la aplicación Express
const app = express();

// Configurar los módulos en las rutas de la aplicación
app.use(modulosAp1);

// Configurar la carpeta estática para el front-end administrativo
app.use(express.static('admin'));

// Iniciar el servidor en el puerto configurado
app.listen(PUERTO);

// Atrapamos todas las rutas y métodos no configurados para devolver un error 404
app.all('*', (req, res) => {
    res.status(404).json({ mensaje: 'No encontrado' });
});
