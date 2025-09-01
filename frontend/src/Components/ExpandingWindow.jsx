import { motion } from "motion/react";
import useNavbarStore from "../store/navbar.store";

const ExpandingWindow = ({ children , setClose }) => {
    
    const { isAddTaskOpen: isOpen, spawnPoint } = useNavbarStore();


    return (
        <>
            <motion.section
                initial={{
                    x: spawnPoint.x,
                    y: spawnPoint.y,
                    scale: 0,
                    opacity: 0
                }}
                animate={isOpen ?
                    {
                        scale: 1,
                        opacity: 1,
                        x: 0,
                        y: 0
                    } :
                    {
                        scale: 0,
                        opacity: 0,
                        y: -20
                    }
                }
                exit={{
                    scale: 0,
                    opacity: 0,
                    y: -20
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut"
                }}
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden isolate"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setClose();
                    }
                }}
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="p-6 bg-bgLight rounded-xl shadow-lg w-full max-w-md mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </motion.div>

                {/* Bg ele */}
                <motion.div
                    animate={ 1== children ?
                        {
                            backgroundColor:[ "#FFFFFF00", "#FFFFFF00", "#00000080" ]
                        } :
                        {
                            backgroundColor:[ "#00000080", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00" ]
                        }
                    }

                    transition={{
                        duration: 0.4
                    }}
                    className=" absolute top-0 left-0 right-0 min-h-screen w-screen backdrop-blur-sm -z-20"
                ></motion.div>

            </motion.section>
        </>
    )
}

export default ExpandingWindow