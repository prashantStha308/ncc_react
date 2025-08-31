import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderMobile = () => {
    return (
        <section className='sticky flex justify-between md:hidden top-0 left-0 right-0 bg-bgLight z-50 text-textDark w-full py-2 pt-4 px-8 border-b border-accentLight' >
            <Link to={"/"} >
                <h1 className='text-accentDark font-black text-xl' > Aligner </h1>
            </Link>
            
            <div>

            </div>

            <button>
                <Bell className='text-textDark ' size={20} strokeWidth={2} />
            </button>

        </section>
    )
}

export default HeaderMobile