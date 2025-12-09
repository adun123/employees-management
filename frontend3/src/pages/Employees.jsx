import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/api.js";

import Modal from "../components/Modal";
import EmployeeForm from "../pages/Employees/EmployeeForm";

// Ikon Placeholder (Asumsi menggunakan library ikon seperti Heroicons/Lucide)
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);
const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
);
const EditIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-7l4-4m-4 4l5 5m-9-5l.5-.5"></path></svg>
);
const TrashIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State Loading
  const [searchTerm, setSearchTerm] = useState(""); // State Pencarian

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Gagal memuat data karyawan:", error);
      // Tambahkan notifikasi error jika perlu
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // --- Handlers ---
  const handleAdd = async (data) => {
    // Tambahkan try/catch untuk error handling yang lebih baik
    await createEmployee(data);
    setOpenModal(false);
    loadData();
  };

  const handleEdit = async (data) => {
    await updateEmployee(selected.id, data);
    setOpenEdit(false);
    setSelected(null);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      await deleteEmployee(id);
      loadData();
    }
  };

  // --- Filtering Logic ---
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl mt-10 font-bold text-gray-800 mb-6">
        Manajemen Karyawan 🧑‍💼
      </h1>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

        {/* SEARCH */}
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Nama, Email, atau Departemen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white font-semibold 
                    px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md 
                    w-full md:w-auto justify-center"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Karyawan
        </button>
      </div>

      {/* TABLE WRAPPER MOBILE FRIENDLY */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
       {isLoading ? (
          <div className="p-10 text-center text-gray-500">Memuat data...</div>
        ) : (
          <>
            {/* === MOBILE CARD VIEW === */}
            <div className="grid md:hidden gap-4">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="bg-white p-4 rounded-xl shadow border border-gray-100"
                  >
                    {/* Nama */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{emp.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </div>

                    {/* Email */}
                    <p className="text-sm text-gray-600 mb-1">
                      📧 <span className="font-medium">{emp.email}</span>
                    </p>

                    {/* Department */}
                    <p className="text-sm text-gray-600 mb-3">
                      🏢{" "}
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
                        {emp.department}
                      </span>
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2">
                      <button
                        className="flex items-center gap-1 text-indigo-600 hover:bg-indigo-100 px-3 py-1 rounded-md text-sm transition"
                        onClick={() => {
                          setSelected(emp);
                          setOpenEdit(true);
                        }}
                      >
                        <EditIcon className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        className="flex items-center gap-1 text-red-600 hover:bg-red-100 px-3 py-1 rounded-md text-sm transition"
                        onClick={() => handleDelete(emp.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Tidak ada data ditemukan.</p>
              )}
            </div>

            {/* === DESKTOP TABLE VIEW === */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-max w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Departemen</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-indigo-50 transition">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{emp.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{emp.email}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className="text-indigo-600 hover:bg-indigo-100 p-1 rounded"
                            onClick={() => {
                              setSelected(emp);
                              setOpenEdit(true);
                            }}
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="text-red-600 hover:bg-red-100 p-1 rounded"
                            onClick={() => handleDelete(emp.id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>

      {/* MODALS */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-2xl font-bold mb-4">Tambah Karyawan Baru</h2>
        <EmployeeForm onSubmit={handleAdd} />
      </Modal>

      <Modal open={openEdit} onClose={() => { setOpenEdit(false); setSelected(null); }}>
        <h2 className="text-2xl font-bold mb-4">Edit Karyawan</h2>
        {selected && <EmployeeForm initialData={selected} onSubmit={handleEdit} />}
      </Modal>
    </div>

  );
}