import HeaderMobile from "../Components/Headers/HeaderMobile.jsx"
import Navbar from "../Components/Navbar/Navbar.jsx"
import NavbarMobile from "../Components/Navbar/NavbarMobile.jsx"
import AppRoutes from "./App.routes.jsx"

const AppContent = () => {
    return (
        <main className="bg-bgLight min-h-screen max-w-screen flex flex-col md:flex-row gap-0">
            <HeaderMobile />
            <Navbar />
            <section className="flex-1 w-full md:ml-[15rem]">
                <AppRoutes />
            </section>
            <div id="bottom-navbar" className="block md:hidden fixed bottom-0 left-0 right-0 bg-bgLight backdrop-blur-2xl z-40 transition-all duration-200 ease-in-out" >
                <NavbarMobile />
            </div>
        </main>
    )
}

export default AppContent