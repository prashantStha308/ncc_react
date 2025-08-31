import { useEffect } from "react";
import Tab from "./Tab";
import { useTaskStore } from "../../store/task.store";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Plus } from "lucide-react";
import AddTaskForm from "./AddTaskForm";
import useNavbarStore from "../../store/navbar.store";

const TabContainer = () => {
    const { setSpawnPoint, spawnPoint, setIsAddTaskOpen } = useNavbarStore();
    const { tasks = [], fetchAllTasks, } = useTaskStore();

    const handleExpand = (e) => {
        console.log("Clicking");
        setSpawnPoint({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        });
        setIsAddTaskOpen(true);
    }
    

    const tabs = [
        { title: "Last Reviewed", data: [...tasks].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)) },
        { title: "Bookmarked", data: tasks.filter(t => t.isBookmarked) },
        { title: "In Progress", data: tasks.filter(t => t.status === 1) },
        { title: "Pending Tasks", data: tasks.filter(t => t.status === 0) },
        { title: "Completed", data: tasks.filter(t => t.status === 2) }
    ];

    return (
        <section className={`h-full w-full ${tasks.length === 0 && "flex justify-center items-center min-h-[calc(100vh-4rem)]"}`}>
            <AddTaskForm spawnPoint={spawnPoint} />
            
            {
                tasks.length !== 0 ?
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                        <Masonry gutter="20px">
                            {tabs.map((tab, index) => (
                                <Tab key={index} title={tab.title} tasks={tab.data} />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                    :
                    <div className="text-center p-8 max-w-md mx-auto">
                        {/* Icon/Visual Element */}
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accentLight to-accentDark rounded-full flex items-center justify-center shadow-lg">
                            <Plus size={48} className="text-bgLight" />
                        </div>
        
                        {/* Main Text */}
                        <h2 className="text-3xl font-extrabold text-textDark mb-3">
                            Ready to Get Organized?
                        </h2>
        
                        <p className="text-lg text-textDark/80 mb-6 leading-relaxed">
                            Create your first task and start building productive habits today.
                        </p>
        
                        {/* Call to Action Button */}
                        <button
                            className="bg-gradient-to-r from-accentDark to-accentLight text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:scale-105"
                            onClick={handleExpand}
                        >
                            Add Your First Task
                        </button>
        
                        {/* Subtle Background Decoration */}
                        <div className="absolute inset-0 -z-10 opacity-5">
                            <div className="w-96 h-96 bg-accentLight rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                    </div>
            }
        </section>
        );
};

export default TabContainer;
