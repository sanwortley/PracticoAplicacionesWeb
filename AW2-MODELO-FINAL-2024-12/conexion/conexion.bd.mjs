// Importar el módulo 'pg' para interactuar con PostgreSQL.
import pg from 'pg';

// Definir las variables de configuración de la base de datos utilizando variables de entorno.
const BD_HOST = process.env.BD_HOST; // Dirección del servidor de la base de datos.
const BD_PUERTO = process.env.BD_PUERTO; // Puerto utilizado para la conexión con la base de datos.
const BD_USUARIO = process.env.BD_USUARIO; // Nombre de usuario para la conexión.
const BD_PASSWORD = process.env.BD_PASSWORD; // Contraseña para la conexión.
const BD_NOMBRE = process.env.BD_NOMBRE; // Nombre de la base de datos.

// Crear una instancia de la conexión con la base de datos utilizando un pool de conexiones.
const pool = new pg.Pool({
    host: BD_HOST,       // Dirección del servidor.
    database: BD_NOMBRE, // Nombre de la base de datos.
    port: BD_PUERTO,     // Puerto de la base de datos.
    user: BD_USUARIO,    // Usuario para la conexión.
    password: BD_PASSWORD, // Contraseña para la conexión.
});

// Exportar la instancia del pool de conexiones para que pueda ser utilizada en otras partes de la aplicación.
export default pool;
