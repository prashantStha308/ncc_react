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
        <section className="fixed left-0 top-0 bg-bgLight py-4 px-8 w-[15rem] min-h-screen box-border flex flex-col gap-8 text-textDark">
            <header>
                <h1 className="text-3xl text-center text-accentDark font-black underline" > Aligner </h1>
            </header>

            <nav className="flex flex-col gap-8" >
                <div className="flex items-center gap-4">
                    {/* <div className="w-9 h-9 rounded-full overflow-hidden" >
                        <img src="~/assets/images/default.jpeg" alt="Default image" className=" object-center" />
                    </div> */}
                    <p className=" font-bold text-xl line-clamp-1 " > ___________ </p>
                </div>

                <NavbarList />

            </nav>

        </section>
    )
}

export default Navbar