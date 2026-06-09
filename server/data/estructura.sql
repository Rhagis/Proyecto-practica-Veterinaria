-- 0. Limpieza de tablas pre-existentes 
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS clientes;

-- 1. Creación de tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- 2. Crear la tabla de Usuarios con la relación (Foreign Key)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
	usuario VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 3. Carga de los Roles del Sistema requeridos
INSERT INTO roles (nombre, descripcion) VALUES 
('Administrador', 'Acceso total al sistema, gestión de usuarios y visualización de estadísticas de negocio.'),
('Veterinario', 'Gestión de historias clínicas de pacientes, consultas médicas y asignación/control de turnos.'),
('Administrativo/Vendedor', 'Control de inventario (stock), registro de ventas, facturación y atención en mostrador.');

-- 4. Carga de Usuarios de Prueba (Hashes simulados)
INSERT INTO usuarios (nombre, usuario, email, password_hash, id_rol) VALUES 
('Carlos Gómez', 'CarlitosVet', 'admin@veterinaria.com', '$2y$10$EIXzaYVK1ndmZfN.A0vXpOx2Oa9.V3aG...', (SELECT id FROM roles WHERE nombre = 'Administrador')),
('Dra. Laura Martínez', 'LauritaVet', 'laura.vet@veterinaria.com', '$2y$10$S9bB7X4mF8gH2jK1l3m4n5o6p7q8r9s...', (SELECT id FROM roles WHERE nombre = 'Veterinario')),
('Matias Silva', 'MatiVet', 'ventas@veterinaria.com', '$2y$10$U7vW8x9y0z1a2b3c4d5e6f7g8h9i0j...', (SELECT id FROM roles WHERE nombre = 'Administrativo/Vendedor'));

-- 5. Tabla de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,      -- Para identificarlo formalmente
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Insertamos clientes ficticios (prueba)
INSERT INTO clientes (nombre, apellido, dni, telefono, direccion) VALUES 
('Juan', 'Pérez', '38444555', '3329-154422', 'Mitre 1230, San Pedro'),
('María', 'Rodríguez', '40111222', '3329-155566', 'Pellegrini 450, San Pedro');


-- Categorías refiere a productos
-- 7. Tabla de Categorías (Organización general)
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);
-- En la tabla de productos tenemos un campo llamado venta_al_publico (BOOLEAN).
-- Si está en TRUE, el administrativo/vendedor lo puede facturar en el mostrador.
-- Si está en FALSE, significa que es un insumo que solo el Veterinario utiliza en 
-- la consulta o cirugía (y que se descontará del stock cuando el veterinario lo use, no por una venta directa).

-- 8. Tabla de Productos e Insumos (Inventario)
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL, -- Se vincula a la tabla categorias
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    codigo_barras VARCHAR(50) UNIQUE, -- Muy útil si usan lector de barras en la tienda, aunque no es obligatorio
    precio_costo DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- Costo al que compramos el producto
    precio_venta DECIMAL(10, 2),      -- Puede ser NULL si es de uso estrictamente clínico
    stock_actual INT NOT NULL DEFAULT 0, -- Stock general del producto
    stock_minimo INT NOT NULL DEFAULT 5, -- Para alertas de "quedan pocos productos", solo se usa para comparación en el backend
    venta_al_publico BOOLEAN NOT NULL DEFAULT TRUE, -- TRUE: Tienda / FALSE: Uso del Veterinario
    fecha_vencimiento DATE NULL, --Null en caso de que sea algo que no vence
    CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 9. Inserción de Categorías Generales 
INSERT INTO categorias (nombre, descripcion) VALUES 
('Alimentos', 'Comida para perros, gatos y otras mascotas de venta libre.'),
('Accesorios y Juguetes', 'Correas, collares, juguetes, rascadores y elementos de paseo.'),
('Higiene y Cuidado Diario', 'Champús, acondicionadores, cuidado bucal, limpiadores óticos y estética.'),
('Medicamentos y Fármacos', 'Antibióticos, analgésicos y jarabes. Algunos pueden ser de venta bajo receta.'),
('Vacunas', 'Biológicos para planes de vacunación de caninos y felinos.'),
('Descartables e Insumos Médicos', 'Materiales de uso interno en clínica como jeringas, gasas y guantes.');

-- 10. Inserción de Productos de Prueba
INSERT INTO productos (id_categoria, nombre, descripcion, precio_costo, precio_venta, stock_actual, venta_al_publico) VALUES 
-- Productos para la TIENDA (venta_al_publico = TRUE)
((SELECT id FROM categorias WHERE nombre = 'Alimentos'), 'Alimento Perro Adulto 15kg', 'Comida premium para perros medianos', 40000.00, 55000.00, 20, TRUE),
((SELECT id FROM categorias WHERE nombre = 'Accesorios y Juguetes'), 'Correa Extensible Recorzada 5m', 'Correa color roja para perros hasta 20kg', 5000.00, 8500.00, 15, TRUE),
((SELECT id FROM categorias WHERE nombre = 'Accesorios y Juguetes'), 'Pelota de Goma Irrompible', 'Juguete mordillo para cachorros', 1200.00, 2500.00, 30, TRUE),
((SELECT id FROM categorias WHERE nombre = 'Higiene y Cuidado Diario'), 'Champú Neutro para Mascotas 500ml', 'Champú apto para el pH de perros y gatos', 1500.00, 3200.00, 10, TRUE),
((SELECT id FROM categorias WHERE nombre = 'Higiene y Cuidado Diario'), 'Limpiador de Oídos Solución Otica', 'Limpiador para prevención de otitis', 2200.00, 4500.00, 8, TRUE),

-- Productos para el VETERINARIO (venta_al_publico = FALSE y precio_venta opcional/bajo)
((SELECT id FROM categorias WHERE nombre = 'Vacunas'), 'Vacuna Quíntuple Canina', 'Dosis inmunológica para cachorros', 3500.00, NULL, 50, FALSE),
((SELECT id FROM categorias WHERE nombre = 'Medicamentos y Fármacos'), 'Anestésico Inyectable 50ml', 'Frasco para cirugías programadas', 12000.00, NULL, 5, FALSE),
((SELECT id FROM categorias WHERE nombre = 'Descartables e Insumos Médicos'), 'Jeringas desc. 3ml (Caja x100)', 'Insumo clínico diario para aplicaciones', 4500.00, NULL, 8, FALSE);

