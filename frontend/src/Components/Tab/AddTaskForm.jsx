import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore } from "../../store/user.store.js";
import { createTask } from "../../services/task.services.js";
import useNavbarStore from "../../store/navbar.store.js";

const AddTaskForm = () => {

    const { isAddTaskOpen: isOpen, setIsAddTaskOpen, spawnPoint } = useNavbarStore();
    const { lists } = useUserStore();

    const [formData, setFormData] = useState({
        Name: "",
        Desc: ""
    })

    const [selectedList, setSelectedList] = useState("");

    const setClose = () => setIsAddTaskOpen(false);

    useEffect(() => {
        if (lists.length > 0) setSelectedList(lists[0].listId);
    }, [lists]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.Name || !selectedList) return;

        const payload = formData;
        const res = await createTask(selectedList, payload);
        console.log("Task Created:", res);
        setFormData({
            Name: "",
            Desc: ""
        });
        setClose();
    };

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
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-accentDark">
                            Add New Task
                        </h1>
                        <button
                            onClick={setClose}
                            className="text-textDark hover:text-accentDark transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="Name" className="mb-1 font-semibold text-textDark">
                                Task Name
                            </label>
                            <input
                                type="text"
                                name="Name"
                                id="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                placeholder="Enter task name"
                                className="border-2 border-accentLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accentDark transition"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="Desc" className="mb-1 font-semibold text-textDark">
                                Task Description
                            </label>
                            <textarea
                                id="Desc"
                                name="Desc"
                                value={formData.Desc}
                                onChange={handleChange}
                                placeholder="Enter task description (optional)"
                                className="border-2 border-accentLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accentDark transition resize-none h-20"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="TaskList" className="mb-1 font-semibold text-textDark">
                                Select List
                            </label>
                            <select
                                id="TaskList"
                                value={selectedList}
                                onChange={(e) => setSelectedList(e.target.value)}
                                className="border-2 border-accentLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accentDark transition"
                                required
                            >
                                {lists.map((list) => (
                                    <option key={list.listId} value={list.listId}>
                                        {list.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 mt-2">
                            <button
                                type="button"
                                onClick={setClose}
                                className="flex-1 border-2 border-accentLight text-textDark font-semibold py-2 rounded-lg hover:bg-accentLight/10 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-accentDark to-accentLight text-white font-semibold py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Bg ele */}
                <motion.div
                    animate={isOpen ?
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
    );
};

export default AddTaskForm;
