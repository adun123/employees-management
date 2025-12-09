-- Membuat tabel employees
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  salary INTEGER NOT NULL,
  hire_date DATE NOT NULL,
  status VARCHAR(10) DEFAULT 'active'
);

-- Menambahkan data awal ke tabel employees
INSERT INTO employees (name, email, position, department, salary, hire_date, status) VALUES
('John Doe', 'john@example.com', 'Software Engineer', 'IT', 7000000, '2022-01-10', 'active'),
('Sarah Johnson', 'sarah@example.com', 'UI/UX Designer', 'Design', 6500000, '2021-12-05', 'active'),
('Michael Smith', 'michael@example.com', 'Project Manager', 'Management', 8500000, '2020-08-21', 'inactive'),
('Emily Davis', 'emily@example.com', 'QA Engineer', 'QA', 6000000, '2023-03-15', 'active'),
('David Brown', 'david@example.com', 'DevOps Engineer', 'IT', 9000000, '2019-10-02', 'active');
