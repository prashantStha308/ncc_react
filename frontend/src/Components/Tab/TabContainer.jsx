import Tab from "./Tab";
import { useTaskStore } from "../../store/task.store";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import AddTaskForm from "./AddTaskForm";
import { useUserStore } from "../../store/user.store";
import useWindowHelper from "../../Helpers/window.helper";
import { useWindowStore } from "../../store/window.store";
import InitialTab from "./InitialTab";
import { useListStore } from "../../store/list.store";
import { useEffect } from "react";


const TabContainer = () => {
    const { handleExpandAddTask, handleExpandCreateList } = useWindowHelper();
    const { spawnPoint } = useWindowStore();
    const { tasks = [], fetchAllTasks } = useTaskStore();
    const { lists = [], fetchAllLists } = useListStore();
    const { isLoggedIn, user } = useUserStore();

    useEffect(() => {
        console.log(user);
        if (isLoggedIn && user) {
            fetchAllLists(user.userId);
            fetchAllTasks(user.userId);
        }
    },[isLoggedIn, user])


    const tabs = [
        { title: "Last Reviewed", data: [...tasks].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)) },
        { title: "Bookmarked", data: tasks.filter(t => t.isBookmarked) },
        { title: "In Progress", data: tasks.filter(t => t.status === 1) },
        { title: "Pending Tasks", data: tasks.filter(t => t.status === 0) },
        { title: "Completed", data: tasks.filter(t => t.status === 2) }
    ];

    return (
        <section className={`h-full w-full ${isLoggedIn === 0 && "flex justify-center items-center min-h-[calc(100vh-4rem)]"} z-30 `}>
            <AddTaskForm spawnPoint={spawnPoint} />
            
            {
                isLoggedIn && tasks.length !== 0 && lists.length !== 0 ?
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                        <Masonry gutter="20px">
                            {tabs.map((tab, index) => (
                                <Tab key={index} title={tab.title} tasks={tab.data} />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                :
                    <InitialTab handleAddTask={handleExpandAddTask} handleCreateList={handleExpandCreateList} />
            }
        </section>
        );
};

export default TabContainer;
