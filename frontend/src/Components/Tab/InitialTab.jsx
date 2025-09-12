import { Plus } from "lucide-react";
import { motion } from "motion/react";

const InitialTab = ({ handleAddTask, handleCreateList }) => {
    return (
        <div className="text-center p-8 max-w-md mx-auto relative">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accentLight to-accentDark rounded-full flex items-center justify-center shadow-lg">
                <Plus size={48} className="text-bgLight" />
            </div>

            {/* Main Text */}
            <h2 className="text-3xl font-extrabold text-textDark mb-3">
                Ready to Get Organized?
            </h2>

            <p className="text-lg text-textDark/80 mb-8 leading-relaxed">
                Productivity starts with a list. Create yours today and get ready to
                build better habits.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col items-center gap-4">
                {/* Primary Button */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-accentDark text-white px-6 py-2 rounded-xl font-semibold text-lg shadow-lg cursor-pointer w-full max-w-xs"
                    onClick={handleCreateList}
                >
                    Create a List
                </motion.button>

                {/* Divider with "Then" */}
                <div className="flex items-center gap-3 text-textDark/70 font-medium">
                    <div className="flex-1 h-px bg-textDark/20"></div>
                    <span>Then</span>
                    <div className="flex-1 h-px bg-textDark/20"></div>
                </div>

                {/* Secondary Button */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="border-2 border-accentDark text-accentDark px-6 py-2 rounded-xl font-semibold text-lg shadow-sm bg-white cursor-pointer w-full max-w-xs"
                    onClick={handleAddTask}
                >
                    Add Your First Task
                </motion.button>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 opacity-5">
                <div className="w-96 h-96 bg-accentLight rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
        </div>
    );
};

export default InitialTab;
