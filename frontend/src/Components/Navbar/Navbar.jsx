import { Link, useLocation } from "react-router-dom"
import NavbarList from "./NavbarList";
import useNavbarStore from "../../store/navbar.store";
import { useEffect } from "react";
import { useUserStore } from "../../store/user.store";
import UserDetail from "./UserDetail";

const Navbar = () => {

    const { currentPage, setCurrentPage, setSpawnPoint, spawnPoint, setIsAddTaskOpen } = useNavbarStore();
    const { isLoggedIn, user } = useUserStore();
    const location = useLocation();

    const buttonClass = "gap-4 border border-textDark bg-textDark hover:bg-textDark/80 text-bgLight px-6 py-1 rounded-sm transition-all ease-in-out duration-100 text-center shadow cursor-pointer";

    const handleExpand = (e) => {
        console.log("Clicking");
        document.body.classList.add("overflow-hidden");
        setSpawnPoint({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        });
        setIsAddTaskOpen(true);
    }

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
                        <button className={buttonClass} onClick={handleExpand} > Add Task </button>
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