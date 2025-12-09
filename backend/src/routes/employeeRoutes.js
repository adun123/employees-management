import express from 'express';

import{
    getEmployees,
    getEmployee,
    addEmployee,
    editEmployee,
    removeEmployee

} from '../controllers/employeeController.js';

const router = express.Router();

// route untuk mendapatkan semua data karyawan
router.get('/', getEmployees);

// route untuk mendapatkan data karyawan berdasarkan ID
router.get('/:id', getEmployee);

// route untuk menambahkan data karyawan baru
router.post('/', addEmployee);

// route untuk memperbarui data karyawan berdasarkan ID
router.put('/:id', editEmployee);

// route untuk menghapus data karyawan berdasarkan ID
router.delete('/:id', removeEmployee);

export default router;