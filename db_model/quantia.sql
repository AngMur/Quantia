-- Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS userdb;

-- Usar la base de datos
USE userdb;
 
-- Crear la tabla users (existente)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Se almacenará el hash de la contraseña
    email VARCHAR(100) NOT NULL UNIQUE,
    riskLevel VARCHAR(10),
    balance DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nueva tabla de transacciones
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('deposit', 'withdrawal') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('completed', 'pending', 'failed') DEFAULT 'pending',
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertar algunos usuarios de ejemplo
INSERT INTO users (username, password, email) VALUES 
('admin', '12345', 'admin@example.com'),
('maria_garcia', '12345', 'maria@example.com'),
('carlos_rojas', '12345', 'carlos@example.com');

-- Insertar algunas transacciones de ejemplo
INSERT INTO transactions (user_id, type, amount, status, description) VALUES
(1, 'deposit', 500.00, 'completed', 'Depósito inicial'),
(1, 'withdrawal', 100.00, 'completed', 'Retiro de efectivo'),
(2, 'deposit', 300.00, 'completed', 'Primer depósito');

-- Consulta para ver los usuarios insertados
SELECT * FROM users;

-- Consulta para ver las transacciones
SELECT * FROM transactions;

SELECT * FROM users join transactions;

describe transactions;