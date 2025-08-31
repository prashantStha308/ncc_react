import { Route, Routes } from "react-router-dom"
import HomeLayout from "../Pages/Home/HomeLayout"
import Sandbox from "../Pages/Sandbox"
import AppLayout from "../Pages/Application/AppLayout.jsx";
import LoginLayout from "../Pages/Auth/LoginLayout.jsx";
import RegisterLayout from "../Pages/Auth/RegisterLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/todo" element={<AppLayout />} />
      
      {/* Auth */}
      <Route path="/login" element={<LoginLayout />} />
      <Route path="/register" element={<RegisterLayout />} />

      <Route path="/test" element={<Sandbox />} />
    </Routes>
  )
}

export default AppRoutes