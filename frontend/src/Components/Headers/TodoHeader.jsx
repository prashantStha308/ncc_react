import ExpandingButton from "../Buttons/ExpandingButton.jsx";
import ButtonDefault from "../Buttons/ButtonDefault.jsx";
import { Library, ChevronDown, Search } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../Dropdown/DropdownItem.jsx";
import useNavbarStore from "../../store/navbar.store.js";

const TodoHeader = () => {
    const { searchKey, setSearchKey, newTaskData, setNewTaskData, setSpawnPoint, spawnPoint, setIsAddTaskOpen } = useNavbarStore();
    const handleExpand = (e) => {
        console.log("Clicking",e);
        setSpawnPoint({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        });
        setIsAddTaskOpen(true);
    } 
    
    return (
        <section className="hidden md:flex justify-evenly w-full" >
            
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

            <ExpandingButton
                text="Add Tasks"
                placeholder="Quick Add..."
                bgColor="bg-dark"
                bgHover="bg-textDark/90"
                textColor="text-dark"
                textHover="text-bgLight/80"
                textFinal="text-white"
                className="flex justify-center py-3 px-4"
                classNameActive="flex justify-center py-3 px-4"
                onClick ={handleExpand}
            />

            <ButtonDefault
                className="border border-accentLight bg-accentLight text-textDark hover:text-textDark/80 hover:bg-accentLight/80"
                leftIcon={<Library />}
            >
                View All Lists
            </ButtonDefault>

            <Dropdown
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
            >
                <DropdownItem>
                    hi
                </DropdownItem>
                <DropdownItem>
                    hi
                </DropdownItem>
                <DropdownItem>
                    hi
                </DropdownItem>
                <DropdownItem>
                    hi
                </DropdownItem>
            </Dropdown>

        </section>
    )
}

export default TodoHeader