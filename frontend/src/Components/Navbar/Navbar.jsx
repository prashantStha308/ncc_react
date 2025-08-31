import { Link, useLocation } from "react-router-dom"
import NavbarList from "./NavbarList";
import useNavbarStore from "../../store/navbar.store";
import { useEffect } from "react";

const Navbar = () => {

    const { currentPage, setCurrentPage } = useNavbarStore();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.substring(1).split('/')[0] || "home";
        setCurrentPage(path);
    },[location, currentPage])


    return (
        <section className="fixed left-0 top-0 bg-bgLight py-4 px-8 w-[15rem] min-h-screen box-border hidden md:flex flex-col gap-8 text-textDark">
            <header>
                <Link to={'/'} >
                    <h1 className="text-3xl text-center text-accentDark font-black underline" > Aligner </h1>
                </Link>
            </header>

            <nav className="w-full flex flex-col gap-8 " >
                <Link
                    to={"/login"}
                    className="gap-4 border border-textDark bg-textDark hover:bg-textDark/80 text-bgLight px-6 py-1 rounded-sm transition-all ease-in-out duration-100 text-center shadow"
                >
                    Login
                </Link>

                <NavbarList />

            </nav>

        </section>
    )
}

export default Navbar