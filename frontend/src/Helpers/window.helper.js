import { useNavigate } from "react-router-dom";
import { useWindowStore } from "../store/window.store";
import { useUserStore } from "../store/user.store";


const useWindowHelper = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useUserStore();
    const { setSpawnPoint, setAddTaskWindowStatus, setCreateListStatus } = useWindowStore();

    const handleSpawnPoint = (e) => {
        const spawn = {
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        }

        setSpawnPoint(spawn);
        console.log(spawn);
    }
    
    const handleExpandAddTask = (e) => {
        if (!isLoggedIn) {
            navigate("/login");
            setAddTaskWindowStatus(false);
            return;
        }

        document.body.classList.add("overflow-hidden");
        handleSpawnPoint(e);

        setAddTaskWindowStatus(true);
    }

    const handleExpandCreateList = (e) => {
        if (!isLoggedIn) {
            navigate("/login");
            setCreateListStatus(false);
            return;
        }

        document.body.classList.add("overflow-hidden");
        handleSpawnPoint(e);

        setCreateListStatus(true);
    }


    return ({
        handleExpandAddTask,
        handleExpandCreateList,
    })

}

export default useWindowHelper;