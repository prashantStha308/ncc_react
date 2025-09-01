import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useNavbarStore from "../../store/navbar.store.js";
import Home from '../icons/Home'
import Library from "../icons/Library.jsx";
import { ListTodo, BadgePlus,  } from "lucide-react";


const NavbarMobile = () => {
    const { currentPage, setCurrentPage } = useNavbarStore();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.substring(1).split('/')[0] || "home";
        setCurrentPage(path);
    },[location, currentPage])

    return (
        <nav className="flex justify-between items-center p-2 text-accentDark border-t border-accentLight " >
            
            <Link className="px-3 py-1 rounded-md active:bg-accentLight transition-all duration-75 ease-in-out"  to={'/'} >
                <div>
                    <Home size={25} strokeWidth={3} fill={ currentPage === 'home' ? '#F7A5A5' : "none" } strokeColor={ currentPage === 'home' ? "#5D688A" : "currentColor" } />
                </div>
            </Link>
            <Link className="px-3 py-1 rounded-md active:bg-accentLight transition-all duration-75 ease-in-out"  to={'/todo'} >
                <div>
                    <ListTodo size={25} strokeWidth={1} fill={currentPage === 'todo' ? '#F7A5A5' : "none"} strokeColor={currentPage === 'todo' ? '#5D688A' : "currentColor"}/>

                </div>
            </Link>
            <Link className="px-3 py-1 rounded-md active:bg-accentLight transition-all duration-75 ease-in-out" to={'/publish'} >
                <div>
                    <BadgePlus className={`${currentPage === 'upload' && "fill-red-500 text-white " }`} size={35} strokeWidth={1} />
                </div>
            </Link>
            <Link className="px-4 py-2 rounded-md active:bg-accentLight transition-all duration-75 ease-in-out"  to={'/library'} >
                <div>
                    <Library size={20} strokeWidth={3} fill={ currentPage === 'library' ? '#F7A5A5' : "none" } strokeColor={ currentPage === 'library' ? '#F7A5A5' : "currentColor" } />
                </div>
            </Link>
            <Link to={'/login'} className="px-3 py-1 rounded-md active:bg-accentLight transition-all duration-75 ease-in-out" >
                <div>
                    <div className="w-8 h-8 bg-accentDark rounded-full"></div>
                </div>
            </Link>
        </nav>
    )
}

export default NavbarMobile