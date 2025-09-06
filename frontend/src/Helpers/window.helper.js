import { useNavigate } from "react-router-dom";
import { useWindowStore } from "../store/window.store";
import { useUserStore } from "../store/user.store";


const useWindowHelper = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useUserStore();
    const { setAddTaskSpawnPoint, addTaskSpawnPoint, setAddTaskWindowStatus } = useWindowStore();
    
    const handleExpand = (e) => {
        if (!isLoggedIn) {
            navigate("/login");
            setAddTaskWindowStatus(false);
            return;
        }
        console.log("Clicking");
        console.log(e.clientX);
        console.log(e.clientY);

        document.body.classList.add("overflow-hidden");

        const spawn = {
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        }

        setAddTaskSpawnPoint(spawn);
        console.log(spawn);
        setAddTaskWindowStatus(true);
    }


    return ({
        handleExpand,
    })

}

export default useWindowHelper;