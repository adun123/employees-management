import { useState, useEffect } from "react";

// Helper untuk membuat label jadi rapi (hire_date → Hire Date)
const formatLabel = (key) => {
  return key.replace(/_/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export default function EmployeeForm({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    hire_date: "",
    status: "active",
  });

  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    } else {
      setForm({
        name: "",
        email: "",
        position: "",
        department: "",
        salary: "",
        hire_date: "",
        status: "active",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputFields = [
    { key: "name", type: "text", required: true },
    { key: "email", type: "email", required: true },
    { key: "position", type: "text", required: true },
    { key: "department", type: "text", required: true },
    { key: "salary", type: "number", required: true },
    { key: "hire_date", type: "date", required: true },
  ];

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 px-1 sm:px-0"
    >
      {/* Grid 1 kolom mobile, 2 kolom desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map((field) => (
          <div key={field.key} className="flex flex-col">
            <label
              htmlFor={field.key}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {formatLabel(field.key)}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              id={field.key}
              type={field.type}
              name={field.key}
              value={form[field.key]}
              placeholder={formatLabel(field.key)}
              onChange={handleChange}
              required={field.required}
              className="
                px-4 py-2 
                border border-gray-300 
                rounded-lg 
                text-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-indigo-500 
                focus:border-indigo-500
                transition
              "
              {...(field.type === "number" && { min: "0", step: "1000" })}
            />
          </div>
        ))}

        {/* Status */}
        <div className="flex flex-col">
          <label 
            htmlFor="status" 
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
              px-4 py-2 
              border border-gray-300 
              rounded-lg 
              bg-white 
              text-sm
              focus:outline-none 
              focus:ring-2 
              focus:ring-indigo-500 
              focus:border-indigo-500
              transition
            "
          >
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
            <option value="on_leave">Cuti</option>
          </select>
        </div>
      </div>

      {/* Tombol - Mobile full width */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="
            w-full sm:w-auto
            px-4 py-2 
            text-gray-600 
            bg-gray-100 
            rounded-lg 
            hover:bg-gray-200 
            transition
          "
        >
          Batal
        </button>

        <button
          type="submit"
          className="
            w-full sm:w-auto
            px-6 py-2 
            bg-indigo-600 
            text-white 
            font-semibold 
            rounded-lg 
            hover:bg-indigo-700 
            transition
            shadow-md
          "
        >
          {isEditMode ? "Simpan Perubahan" : "Tambah Karyawan"}
        </button>
      </div>
    </form>
  );
}
