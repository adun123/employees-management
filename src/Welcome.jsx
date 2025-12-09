import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("welcome_seen", "true");
    navigate("/");
  };

  

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Selamat Datang!</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        Ini adalah halaman pembukaan. Kamu hanya akan melihat ini sekali saja.
      </p>
      <button 
        onClick={handleContinue}
        className="bg-white text-indigo-600 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-100 transition"
      >
        Masuk Dashboard
      </button>
    </div>
  );
}
