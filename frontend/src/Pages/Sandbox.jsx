import { useState } from "react";
import ExpandingWindow from "../Components/ExpandingWindow";
import useNavbarStore from "../store/navbar.store";
import ButtonDefault from "../Components/Buttons/ButtonDefault";

const Sandbox = () => {
    const {setIsAddTaskOpen, setSpawnPoint } = useNavbarStore();

    const isClose = () => setIsAddTaskOpen(false);

    const handleClick = (e) => {
        console.log("Clicking");
        setSpawnPoint({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2,
        });

        setIsAddTaskOpen(true);        
    };

    return (
        <>
            <ButtonDefault
                onClick={handleClick}
            >
                Open Window
            </ButtonDefault>
            <ExpandingWindow
                setClose={isClose}
            >
                <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-accentDark">
                            Add New Task
                        </h1>
                        <button
                            onClick={isClose}
                            className="text-textDark hover:text-accentDark transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="Name" className="mb-1 font-semibold text-textDark">
                            Task Name
                        </label>
                        <input
                            type="text"
                            name="Name"
                            id="Name"
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
                            className="border-2 border-accentLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accentDark transition"
                            required
                        >
                            {[1,2,3].map((list, index) => (
                                <option key={index} value={index}>
                                    {list}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={isClose}
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
            </ExpandingWindow>
        </>
    );
};

export default Sandbox;
