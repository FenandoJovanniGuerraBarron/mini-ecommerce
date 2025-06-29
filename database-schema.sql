-- =====================================================
-- Mini E-commerce Database Schema
-- Generated with AI assistance (ChatGPT + Cursor IDE)
-- Based on actual Sequelize migrations
-- =====================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS mini_ecommerce
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mini_ecommerce;

-- =====================================================
-- Tabla: users
-- Propósito: Almacenar información de usuarios registrados
-- =====================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username)
);

-- =====================================================
-- Tabla: products
-- Propósito: Catálogo de productos
-- =====================================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_price (price),
    FULLTEXT idx_search (name, description)
);

-- =====================================================
-- Tabla: orders
-- Propósito: Órdenes de compra
-- =====================================================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- Tabla: order_items
-- Propósito: Items de cada orden
-- =====================================================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
);

-- =====================================================
-- Datos de ejemplo (Seeders)
-- =====================================================

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, stock, category) VALUES
('iPhone 15 Pro', 'El último iPhone con características avanzadas', 999.99, 50, 'Electrónicos'),
('MacBook Air M2', 'Laptop ultraligera con chip M2', 1299.99, 30, 'Electrónicos'),
('Camiseta Básica', 'Camiseta de algodón 100%', 29.99, 200, 'Ropa'),
('Jeans Clásicos', 'Jeans de alta calidad', 79.99, 100, 'Ropa'),
('Sofá Moderno', 'Sofá elegante para sala', 599.99, 10, 'Hogar'),
('Pelota de Fútbol', 'Pelota oficial de competición', 49.99, 75, 'Deportes'),
('El Señor de los Anillos', 'Trilogía completa en tapa dura', 39.99, 25, 'Libros');

-- =====================================================
-- Vistas útiles
-- =====================================================

-- Vista: Productos por categoría
CREATE VIEW v_products_by_category AS
SELECT 
    id,
    name,
    description,
    price,
    stock,
    category,
    created_at
FROM products
ORDER BY category, name;

-- Vista: Órdenes con información del usuario
CREATE VIEW v_orders_with_user AS
SELECT 
    o.id,
    o.total_amount,
    o.status,
    o.created_at,
    u.username
FROM orders o
JOIN users u ON o.user_id = u.id;

-- Vista: Productos más vendidos
CREATE VIEW v_best_selling_products AS
SELECT 
    p.id,
    p.name,
    p.category,
    p.price,
    SUM(oi.quantity) as total_sold,
    SUM(oi.quantity * oi.price_at_purchase) as total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status IN ('completed')
GROUP BY p.id, p.name, p.category, p.price
ORDER BY total_sold DESC;

-- =====================================================
-- Procedimientos almacenados
-- =====================================================

DELIMITER //

-- Procedimiento: Actualizar stock de producto
CREATE PROCEDURE UpdateProductStock(
    IN product_id INT,
    IN quantity_change INT
)
BEGIN
    UPDATE products 
    SET stock = stock + quantity_change,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = product_id;
END //

-- Procedimiento: Calcular total de orden
CREATE PROCEDURE CalculateOrderTotal(
    IN order_id INT,
    OUT total DECIMAL(10, 2)
)
BEGIN
    SELECT COALESCE(SUM(price_at_purchase * quantity), 0) INTO total
    FROM order_items
    WHERE order_id = order_id;
END //

DELIMITER ;

-- =====================================================
-- Triggers
-- =====================================================

DELIMITER //

-- Trigger: Actualizar stock al crear order_item
CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    CALL UpdateProductStock(NEW.product_id, -NEW.quantity);
END //

-- Trigger: Actualizar updated_at en productos
CREATE TRIGGER before_product_update
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

-- Trigger: Actualizar updated_at en usuarios
CREATE TRIGGER before_user_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

DELIMITER ;

-- =====================================================
-- Índices adicionales para optimización
-- =====================================================

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_products_category_price ON products(category, price);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_order_items_order_product ON order_items(order_id, product_id);

-- Índices para búsquedas de texto
CREATE FULLTEXT INDEX idx_products_search ON products(name, description);

-- =====================================================
-- Comentarios finales
-- =====================================================

/*
Este esquema de base de datos fue generado con asistencia de IA (ChatGPT + Cursor IDE)
y está basado en las migraciones reales de Sequelize del proyecto.

Características principales:
- 4 tablas principales: users, products, orders, order_items
- Relaciones optimizadas con claves foráneas
- Índices para consultas frecuentes
- Triggers para mantener consistencia de datos
- Vistas para consultas complejas frecuentes
- Procedimientos almacenados para operaciones comunes
- Datos de ejemplo para testing

Para aplicar este esquema:
1. Ejecutar este script en MySQL
2. Configurar las variables de entorno en el servidor
3. Las migraciones de Sequelize ya están reflejadas en este esquema
*/ 