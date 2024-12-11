-- Создание таблицы departments
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(125),
    email VARCHAR(50),
    budget NUMERIC(10, 2)
);

-- Создание таблицы employees
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    post VARCHAR(50) NOT NULL,
    full_name VARCHAR(30) NOT NULL,
    surname VARCHAR(30),
    sex VARCHAR(10) CHECK (sex IN ('Мужской', 'Женский')) NOT NULL,
    hired DATE DEFAULT CURRENT_DATE NOT NULL,
    id_department INT NOT NULL,
    FOREIGN KEY (id_department) REFERENCES departments(id)
);
-- Вставка начальных данных в departments
INSERT INTO departments (name, email, budget) VALUES
('Sales', 'sales@example.com', 100000.00),
('Marketing', 'marketing@example.com', 75000.00),
('Engineering', 'engineering@example.com', 150000.00);

-- Вставка начальных данных в employees
INSERT INTO employees (name, post, full_name, surname, sex, hired, id_department) VALUES
('John', 'Software Engineer', 'John Doe', 'Doe', 'Мужской', '2023-01-15', 3),
('Jane', 'Marketing Manager', 'Jane Smith', 'Smith', 'Женский', '2022-05-20', 2),
('Peter', 'Sales Representative', 'Peter Jones', 'Jones', 'Мужской', '2024-03-10', 1),
('Alice', 'Software Developer', 'Alice Brown', 'Brown', 'Женский', '2023-09-01', 3);