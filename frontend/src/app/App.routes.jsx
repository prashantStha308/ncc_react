import { Route, Routes } from "react-router-dom"
import HomeLayout from "../Pages/Home/HomeLayout"
import Sandbox from "../Pages/Sandbox"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />

      <Route path="/test" element={<Sandbox />} />
    </Routes>
  )
}

export default AppRoutes