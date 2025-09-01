import ExpandingButton from "../Buttons/ExpandingButton.jsx";
import ButtonDefault from "../Buttons/ButtonDefault.jsx";
import { Library, ChevronDown, Search } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../Dropdown/DropdownItem.jsx";
import useNavbarStore from "../../store/navbar.store.js";

const TodoHeaderMobile = () => {
    const { searchKey, setSearchKey, newTaskData, setNewTaskData, setSpawnPoint, spawnPoint, setIsAddTaskOpen } = useNavbarStore();
    const handleExpand = (e) => {
        console.log("Clicking", e);
        setSpawnPoint({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        });
        setIsAddTaskOpen(true);
    }

    return (
        <section className="md:hidden grid gap-2 justify-center w-full" >
            <ExpandingButton
                text="Search Tasks"
                placeholder="Search for Tasks.."
                bgColor="bg-textDark"
                bgHover="bg-textDark/80"
                textColor="text-textDark"
                textHover="text-bgLight/80"
                textFinal="text-white"
                className=" w-full flex justify-center "
                classNameActive=" w-full flex justify-center"
                trigger={<Search size={20} />}
            />

            <ExpandingButton
                text="Add Tasks"
                placeholder="Quick Add..."
                bgColor="bg-dark"
                bgHover="bg-textDark"
                textColor="text-dark"
                textHover="text-bgLight/80"
                textFinal="text-white"
                className=" w-full flex justify-center py-3 "
                classNameActive=" w-full flex justify-center py-3"
                onClick ={handleExpand}
            />

            <div className="w-full flex items-center justify-between gap-2 " >
                <ButtonDefault
                    className="border px-6 w-fit border-accentLight bg-accentLight text-textDark hover:text-textDark/80 hover:bg-accentLight/80"
                    leftIcon={<Library />}
                >
                    View All Lists
                </ButtonDefault>

                <Dropdown
                    trigger={
                    <ButtonDefault
                        rightIcon={
                            <div className="" >
                                <ChevronDown />
                            </div>
                        }
                        className="px-6 w-full text-textDark border border-textDark bg-bgLight hover:bg-accentDark/25 "
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
                </div>

        </section>
    )
}

export default TodoHeaderMobile