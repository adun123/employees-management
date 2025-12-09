import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../models/employeeModel.js";

// controller untuk mendapatkan semua data karyawan
export const getEmployees = async (req, res) => {

    try {
        const employees = await getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "gagal untuk mengambil data" });
    }
};


// controller untuk mendapatkan data karyawan berdasarkan ID
export const getEmployee = async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ msg: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// controller untuk menambahkan data karyawan baru
export const addEmployee = async (req, res) => {
  try {
    const newEmployee = await createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controller untuk memperbarui data karyawan berdasarkan ID
export const editEmployee = async (req, res) => {
  try {
    const updated = await updateEmployee(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// controller untuk menghapus data karyawan berdasarkan ID
export const removeEmployee = async (req, res) => {
  try {
    await deleteEmployee(req.params.id);
    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};