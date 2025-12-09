import { NavLink } from "react-router-dom";

const menus = [
  { label: "Dashboard", path: "/", icon: "Home" },
  { label: "Employees", path: "/employees", icon: "Users" },
  
];

const IconPlaceholder = ({ name, className = "w-5 h-5" }) => {
  return <span className={`${className} mr-3`}>{name[0]}</span>;
};

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay  */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 bg-opacity-40 md:hidden z-20"
          onClick={onClose}
        ></div>
      )}

     <aside
        className={`
          fixed top-0 left-0 z-30
          w-64 h-screen bg-white shadow-xl p-4 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >

        {/* Logo */}
        <div className="mb-8 border-b pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-indigo-600">App Manage</h2>

          {/* tombol */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            <IconPlaceholder name="X" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {menus.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition 
                 ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-md font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                }`
              }
            >
              <IconPlaceholder name={item.icon} />
              <span className="text-base">{item.label}</span>
            </NavLink>
          ))}
        </nav>

      </aside>
    </>
  );
}
