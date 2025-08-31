import { Link } from "react-router-dom"
import useNavbarStore from "../../store/navbar.store";

const NavbarList = () => {

    const { currentPage } = useNavbarStore();

    return (
        <ul className="flex flex-col gap-0" >
            <Link to={'/'}>
                <li className={`nav-list-item ${currentPage === "home" ? "text-accentDark font-bold" : "text-textDark" } `}>
                        Home
                </li>
            </Link>
            <Link to={'/todo'}>
                <li className={`nav-list-item ${currentPage === "todo" ? "text-accentDark font-bold" : "text-textDark" } `}>
                        Todo
                </li>
            </Link>
            <Link to={'/privacy'}>
                <li className={`nav-list-item ${currentPage === "privacy" ? "text-accentDark font-bold" : "text-textDark" } `}>
                        Privacy
                </li>
            </Link>
            <Link to={'/about'}>
                <li className={`nav-list-item ${currentPage === "about" ? "text-accentDark font-bold" : "text-textDark" } `}>
                        About
                </li>
            </Link>
        </ul>
    )
}

export default NavbarList