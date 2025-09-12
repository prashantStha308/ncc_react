import ExpandingButton from "../Buttons/ExpandingButton.jsx";
import ButtonDefault from "../Buttons/ButtonDefault.jsx";
import { Library, ChevronDown, Search, BadgePlus, Plus } from "lucide-react";
import useNavbarStore from "../../store/navbar.store.js";
import useWindowHelper from "../../Helpers/window.helper.js";
import TaskLists from "../Dropdown/TaskLists.jsx";

const TodoHeader = () => {
    const { searchKey, setSearchKey } = useNavbarStore();
    const { handleExpandAddTask, handleExpandCreateList } = useWindowHelper();
    
    return (
        <section className="hidden md:flex flex-wrap items-center justify-between w-full gap-0 z-50" >
            
            <ExpandingButton
                data={searchKey}
                setData={setSearchKey}
                text="Search Tasks"
                placeholder="Search for Tasks.."
                bgColor="bg-textDark"
                bgHover="bg-textDark/80"
                textColor="text-textDark"
                textHover="text-bgLight/80"
                textFinal="text-white"
                className="flex justify-center py-2 px-4"
                classNameActive="flex justify-center py-2 px-4"
                trigger={<Search size={20} />}
            />

            <ButtonDefault
                leftIcon={<BadgePlus size={20} />}
                onClick={handleExpandAddTask}
                className="flex justify-center py-2 px-8 bg-dark border border-dark hover:bg-dark/80 active:bg-dark/70 text-white "
            >
                Add Tasks
            </ButtonDefault>

            <ButtonDefault
                leftIcon={<Plus size={20} />}
                onClick={handleExpandCreateList}
                className="flex justify-center py-2 px-8 bg-white border border-white hover:bg-white/80 active:bg-white/70 text-dark "
            >
                Create List
            </ButtonDefault>


            <ButtonDefault
                className="py-2 border border-accentLight bg-accentLight text-textDark hover:bg-accentLight/80"
                leftIcon={<Library />}
            >
                View All Lists
            </ButtonDefault>

            <TaskLists
                trigger={
                    <ButtonDefault
                        rightIcon={
                            <div className="hidden md:block" >
                                <ChevronDown />
                            </div>
                        }
                        className="text-textDark border border-textDark bg-bgLight hover:bg-accentDark/25 px-4 py-2"
                    >
                        Select List
                    </ButtonDefault>
                }
            />

        </section>
    )
}

export default TodoHeader