import {BadgePlus} from "lucide-react";
import { motion } from "motion/react";
import useBreakpoint from "../../hooks/useBreakpoint.jsx";
import { useEffect, useRef, useState } from "react";

const ExpandingButton = ({
    data, setData,
    text = "Add Task",
    placeholder = "Quick Add...",
    bgColor = "bg-accentDark",
    bgHover = "bg-accentDark-80",
    textColor = "text-textDark",
    textHover = "text-textDark/80",
    textFinal = "text-white",
    className = "",
    classNameActive="",
    trigger = <BadgePlus size={20} />,
    ...prop
}) => {
    const [isActive, setIsActive] = useState(false);
    const buttonRef = useRef();
    const iconRef = useRef();
    const isMobile = useBreakpoint();

    const [buttonWidth, setButtonWidth] = useState(0);

    useEffect(() => {
        if (buttonRef.current && iconRef.current ) {
            setButtonWidth(buttonRef.current.offsetWidth - (iconRef.current.offsetWidth * (isMobile ? 4 : 1)) );
        }
    },[isMobile])

    useEffect(() => {
        if (isActive && buttonRef.current ) {
            const inputEl = buttonRef.current.querySelector("input");
            if (inputEl) {
                inputEl.focus();
            }
        }
    }, [isActive]);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsActive(false);
        }
        };

        if (isActive) {
        document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isActive]);
   
   return (
       <section
           id="search-button"
           ref={buttonRef}
           onClick={() => setIsActive(true)}
           {...prop}
           className={`flex items-center border border-${bgColor.split('-')[1]} list-none group p-2 px-8 ${isActive ? textColor : `${textFinal} ${bgColor} hover:${textHover} hover:${bgHover} `} rounded-sm transition-all duration-100 ease-in cursor-pointer w-fit ${isActive ? classNameActive : className } `}
       >
           <motion.button className="flex items-center gap-2 cursor-pointer w-fit">
               <motion.div ref={iconRef} >
                   {trigger}
               </motion.div>
               
               <motion.span
                   initial={{ width: "auto", opacity: 1 }}
                   animate={{
                       width: isActive ? 0 : "auto",
                       opacity: isActive ? 0 : 1,
                   }}
                   className="font-medium text-xs overflow-hidden line-clamp-1"
               >
                   {text}
               </motion.span>
               
               <motion.input
                   type="text"
                   name="searchKey"
                   id="searchKey"
                   placeholder={placeholder}
                   className={`outline-none overflow-hidden bg-transparent text-sm w-full ${textColor} `}
                   initial={{ width: 0, opacity: 0 }}
                   animate={{
                       width: isActive ? buttonWidth : 0,
                       opacity: isActive ? 1 : 0,
                   }}
                   transition={{
                       type: 'spring',
                       stiffness: 400,
                       damping: 40
                   }}
                   value={data}
                   onChange={(e)=>setData(e.target.value)}
               />
           </motion.button>
       </section>
   );
};

export default ExpandingButton;