import { useState, useEffect } from "react";
import { useUserStore } from "../../store/user.store.js";
import { createTask } from "../../services/task.services.js";
import { useWindowStore } from "../../store/window.store.js";
import ExpandingWindow from "../ExpandingWindow.jsx";

const AddTaskForm = () => {

    const { addTaskWindowStatus: isOpen, setAddTaskWindowStatus, addTaskSpawnPoint } = useWindowStore();
    const { lists } = useUserStore();

    const [formData, setFormData] = useState({
        Name: "",
        Desc: ""
    })

    const [selectedList, setSelectedList] = useState("");

    const setClose = () => setAddTaskWindowStatus(false);

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

        const res = await createTask(selectedList, formData);
        console.log("Task Created:", res);
        setFormData({
            Name: "",
            Desc: ""
        });
        setClose();
    };

    return (
        <>
            <ExpandingWindow
                setClose={setClose}
                isOpen={isOpen}
                spawnPoint={addTaskSpawnPoint}
                heading="Add New Task"
            >

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-div">
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
                            className="input-text"
                            required
                        />
                    </div>

                    <div className="form-div">
                        <label htmlFor="Desc" className="form-label">
                            Task Description
                        </label>
                        <textarea
                            id="Desc"
                            name="Desc"
                            value={formData.Desc}
                            onChange={handleChange}
                            placeholder="Enter task description (optional)"
                            className="input-text resize-none h-20"
                        />
                    </div>

                    <div className="form-div">
                        <label htmlFor="TaskList" className="form-label">
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
            </ExpandingWindow>
        </>
    );
};

export default AddTaskForm;
