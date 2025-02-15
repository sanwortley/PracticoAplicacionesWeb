-- Conectar a la base de datos
\c academia;


--CREATE DATABASE academia;

-- Crear la tabla 'alumnos'
CREATE TABLE alumnos (
    id SERIAL PRIMARY KEY,
    dni INTEGER NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Crear la tabla 'materias'
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    modulos_por_semana INT NOT NULL
);

-- Insertar alumnos
INSERT INTO alumnos (dni, nombre, apellido, email) VALUES
(12345678, 'Juan', 'Pérez', 'juan.perez@example.com'),
(23456789, 'Ana', 'Gómez', 'ana.gomez@example.com'),
(34567890, 'Carlos', 'Martínez', 'carlos.martinez@example.com'),
(45678901, 'Lucía', 'Ramírez', 'lucia.ramirez@example.com'),
(56789012, 'Diego', 'Fernández', 'diego.fernandez@example.com'),
(67890123, 'María', 'López', 'maria.lopez@example.com'),
(78901234, 'Martín', 'Díaz', 'martin.diaz@example.com'),
(89012345, 'Laura', 'Sánchez', 'laura.sanchez@example.com'),
(90123456, 'Andrés', 'Rojas', 'andres.rojas@example.com'),
(11234567, 'Sofía', 'Molina', 'sofia.molina@example.com');

-- Insertar materias
INSERT INTO materias (nombre, modulos_por_semana)
VALUES
    ('Matemáticas', 5),
    ('Lengua y Literatura', 4),
    ('Ciencias Naturales', 3),
    ('Historia', 2),
    ('Geografía', 3),
    ('Educación Física', 2),
    ('Inglés', 4),
    ('Tecnología', 2);

