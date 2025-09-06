import { Link, useLocation } from "react-router-dom"
import NavbarList from "./NavbarList";
import useNavbarStore from "../../store/navbar.store";
import { useEffect } from "react";
import { useUserStore } from "../../store/user.store";
import UserDetail from "./UserDetail";
import useWindowHelper from "../../Helpers/window.helper";

const Navbar = () => {

    const { currentPage, setCurrentPage } = useNavbarStore();
    const { handleExpand } = useWindowHelper();
    const { isLoggedIn } = useUserStore();
    const location = useLocation();

    const buttonClass = "gap-4 border border-accentDark bg-accentDark hover:bg-accentDark/80 text-bgLight px-6 py-1 rounded-sm transition-all ease-in-out duration-100 text-center shadow cursor-pointer";

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
                {
                    isLoggedIn ?
                        <button
                            className={buttonClass}
                            onClick={(e) => handleExpand(e)}
                        > Add Task </button>
                        :
                        <Link
                            to={"/login"}
                            className={buttonClass}
                        >
                            Login
                        </Link>
                }

                <NavbarList />
            </nav>

            <UserDetail />
        </section>
    )
}

export default Navbar