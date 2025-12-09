import pool from '../db.js';

// fungsi untuk mendapatkan semua data karyawan
export const getAllEmployees = async () => {
  const result = await pool.query("SELECT * FROM employees ORDER BY id ASC");
  return result.rows;
};


// fungsi untuk mendapatkan data karyawan berdasarkan ID
export const getEmployeeById = async (id) => {
  const result = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
  return result.rows[0];
};


// fungsi untuk menambahkan data karyawan baru
export const createEmployee = async (data) => {
  const { name, email, position, department, salary, hire_date, status } = data;

  const result = await pool.query(
    `INSERT INTO employees (name, email, position, department, salary, hire_date, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, email, position, department, salary, hire_date, status || "active"]
  );

  return result.rows[0];
};

// fungsi untuk memperbarui data karyawan berdasarkan ID
export const updateEmployee = async (id, data) => {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) {
    throw new Error("No fields provided to update");
  }

  // Build dynamic SET query
  const setQuery = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  const sql = `
    UPDATE employees
    SET ${setQuery}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  const result = await pool.query(sql, [...values, id]);
  return result.rows[0];
};


// fungsi untuk menghapus data karyawan berdasarkan ID
export const deleteEmployee = async (id) => {
  await pool.query("DELETE FROM employees WHERE id = $1", [id]);
  return true;
};