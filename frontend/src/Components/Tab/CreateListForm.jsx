import ExpandingWindow from "../ExpandingWindow.jsx";
import ButtonDefault from "../Buttons/ButtonDefault.jsx";
import { useState } from "react";
import { useListStore } from "../../store/list.store.js";
import { useUserStore } from "../../store/user.store.js";
import { useWindowStore } from "../../store/window.store.js";

const CreateListForm = () => {

    const { createListStatus: isOpen, setCreateListStatus, spawnPoint } = useWindowStore();
    const { createList, loading, error } = useListStore();
    const { isLoggedIn, user } = useUserStore();

    const [formData, setFormData] = useState({
        Name: "",
        Desc: ""
    })
    
    const setClose = () => setCreateListStatus(false);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (!isLoggedIn) {
                throw new Error("NOt logged in");
            }
            console.log(formData);

            await createList(user.userId, formData);

            if (error) {
                throw new Error(error);
            }
            setFormData({
                Name: "",
                Desc: ""
            })
            setClose();

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <section className="z-50" >
            <ExpandingWindow
                isOpen={isOpen}
                setClose={setClose}
                spawnPoint={spawnPoint}
                heading="Create a New List"
            >

                <form className="form" onSubmit={handleSubmit} >
                    <div className="form-div" >
                        <label
                            htmlFor="ListName"
                            className="form-label"
                        >
                            List Name
                        </label>
                        <input
                            type="text"
                            name="Name"
                            id="ListName"
                            className="input-text"
                            placeholder="Give your list a name"
                            value={formData.Name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-div" >
                        <label
                            htmlFor="ListDesc"
                            className="form-label"
                        >
                            Description
                        </label>
                        <textarea
                            type="text"
                            name="Desc"
                            id="ListDesc"
                            className="input-text resize-none h-20"
                            placeholder="Describe your list"
                            value={formData.Desc}
                            onChange={handleChange}
                        />
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
                            Create List
                        </button>
                    </div>

                </form>
            </ExpandingWindow>
        </section>
    )
}

export default CreateListForm