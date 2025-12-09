import { useState } from 'react';
import { Menu, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";  // <-- WAJIB ADA

export default function Navbar({ onToggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const userName = "Admin User";
  const navigate = useNavigate(); // <-- WAJIB ADA

  const handleLogout = () => {
    localStorage.removeItem("welcome_seen");
    navigate("/welcome", { replace: true }); // <-- pindah halaman tanpa refresh
  };

  return (
    <nav className="bg-white px-4 md:px-6 h-16 flex items-center justify-between shadow-md z-30 w-full top-0">

      {/* LEFT SECTION */}
      <div className="flex items-center space-x-3">
        <button 
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={onToggleSidebar}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-gray-800">
          HR Dashboard
        </h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-4">

        {/* Notification */}
        <button className="p-2 rounded-full hover:bg-gray-100 relative transition">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* User Info */}
        <div className="hidden sm:flex items-center space-x-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-800">{userName}</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>

          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
            {userName[0]}
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-600 p-2 rounded-md transition"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>

    </nav>
  );
}
