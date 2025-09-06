import { useEffect, useState } from "react"
import TileDefault from "../Tiles/TileDefault"
import { motion } from "motion/react";

const Tab = ({title = "Last Reviewed", tasks }) => {
    
    const [color, setColor] = useState({
        bg: "bg-accentDark",
        border: "border-accentDark",
        accent: "accent-accentDark"
    });


    useEffect(() => {
        switch (title) {
            case "Last Reviewed":
                setColor({
                    bg: "bg-textDark",
                    border: "border-textDark",
                    accent: "accent-textDark"
                });
                break;
            case "Bookmarked":
                setColor({
                    bg: "bg-accentLight",
                    border: "border-accentLight",
                    accent: "accent-accentLight"
                })
                break;
            case "In Progress":
                setColor({
                    bg: "bg-accentYellow",
                    border: "border-accentYellow",
                    accent: "accent-accentYellow"
                })
                break;
            case "Pending":
                setColor({
                    bg: "bg-accentDark",
                    border: "border-accentDark",
                    accent: "accent-accentDark"
                })
                break;
            default:
                setColor({
                    bg: "bg-textDark",
                    border: "border-textDark",
                    accent: "accent-textDark"
                })
                break;
        }
    },[title])

    
    return (
        <motion.section
            className={`min-h-4 w-lg my-2 mx-1 relative border-t-4 ${color.border} rounded-lg bg-white p-2 flex flex-col gap-2 shadow-md`}
        >
            
            <header className="w-full flex flex-col gap-1" >
                <div className="flex justify-between items-center px-1" >
                    <h1 className="capitalized text-textDark font-semibold text-sm md:text-base " >
                        {title}
                    </h1>
                    <div className={`${color.bg} h-3 w-3 rounded-full`} ></div>
                </div>
                <hr className={` border-textDark rounded-xl w-full`} ></hr>
            </header>

            <section className="flex flex-col gap-2" >
                {
                    tasks.map((task, index) => (
                        <TileDefault key={index} task={task} color={color} />
                    ))
                }
            </section>

        </motion.section>
    )
}

export default Tab