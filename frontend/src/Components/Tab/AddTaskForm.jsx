import { useState, useEffect } from "react";
import { useUserStore } from "../../store/user.store.js";
import { createTask } from "../../services/task.services.js";
import { useWindowStore } from "../../store/window.store.js";
import ExpandingWindow from "../ExpandingWindow.jsx";
import { useListStore } from "../../store/list.store.js";

const AddTaskForm = () => {

    const { addTaskWindowStatus: isOpen, setAddTaskWindowStatus, spawnPoint } = useWindowStore();
    const { lists = [], fetchAllLists } = useListStore()
    const { isLoggedIn, user } = useUserStore();
    
    const [ loading, setLoading ] = useState(false);
    const [formData, setFormData] = useState({
        Name: "",
        Desc: "",
        listId: ""
    })

    const setClose = () => setAddTaskWindowStatus(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetchAllLists(user.userId)
        }
    },[isLoggedIn, fetchAllLists, user])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);

            if (!formData.listId) {
                alert("Please select a list"); // Or use a proper toast/notification
                return;
            }
            
            setLoading(true);
            const res = await createTask(formData.listId, { Name: formData.Name, Desc: formData.Desc });
            if (!res.success) {
                throw new Error(res.message);
            }
            console.log("Task Created:", res);
            setFormData({
                Name: "",
                Desc: "",
                listId: 0
            });
            setClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="z-40" >
            <ExpandingWindow
                setClose={setClose}
                isOpen={isOpen}
                spawnPoint={spawnPoint}
                loading={loading}
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
                        <label htmlFor="listId" className="form-label">
                            Select List
                        </label>

                        <select
                            name="listId"
                            id="listId"
                            className="input-text"
                            value={formData.listId}
                            onChange={handleChange}
                            required
                        >
                            {
                                lists?.map((item) => (
                                    item && (
                                        <option
                                            value={item.listId}
                                            key={item.listId}
                                        >
                                            {item.name || ""}
                                        </option>
                                    )
                                ))
                            }
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
        </section>
    );
};

export default AddTaskForm;
