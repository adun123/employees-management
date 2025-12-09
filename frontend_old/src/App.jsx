import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Welcome from "../src/Welcome";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Welcome (tanpa layout) */}
       <Route path="/welcome" element={<Welcome />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}
