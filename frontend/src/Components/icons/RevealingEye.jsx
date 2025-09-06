import { motion } from "motion/react";
import { Eye } from "lucide-react";

const RevealingEye = ({toggle, revealState}) => {
    return (
        <div
            className='relative text-textDark cursor-pointer'
            onClick={toggle}
        >
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: revealState ? 1 : 0 }}
                transition={{ duration: 0.15 }}
                className="absolute bg-dark h-0.5 top-1/2 left-0 w-full origin-left"
            ></motion.div>
            <Eye size={20} />
        </div>
    )
}

export default RevealingEye