import ExpandingWindow from "../ExpandingWindow.jsx";
import ButtonDefault from "../Buttons/ButtonDefault.jsx";
import { useState } from "react";

const CreateListForm = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        Name: "",
        Desc: ""
    })
    
    const setClose = () => setIsOpen(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <ButtonDefault
                onClick={()=> setIsOpen(true)}
            >
                Open Form
            </ButtonDefault>

            <ExpandingWindow isOpen={isOpen} setClose={setClose} heading="Create a New List" >

                <form className="form" onSubmit={handleSubmit} >
                    <div className="form-div" >
                        <label
                            htmlFor="Name"
                            className="form-label"
                        >
                            List Name
                        </label>
                        <input
                            type="text"
                            name="Name"
                            id="Name"
                            className="input-text"
                            placeholder="Give your list a name"
                            value={formData.Name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-div" >
                        <label
                            htmlFor="Desc"
                            className="form-label"
                        >
                            Description
                        </label>
                        <textarea
                            type="text"
                            name="Desc"
                            id="Desc"
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
        </>
    )
}

export default CreateListForm