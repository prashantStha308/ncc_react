import Navbar from "../Components/Navbar/Navbar.jsx"
import AppRoutes from "./App.routes.jsx"

const AppContent = () => {
    return (
        <main className="bg-bgLight min-h-screen max-w-screen flex gap-0">
            <Navbar />
            <section className="flex-1 w-full ml-[15rem]">
                <AppRoutes />
            </section>
        </main>
    )
}

export default AppContent