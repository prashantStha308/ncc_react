import TodoHeader from "../../Components/Headers/TodoHeader"
import TodoHeaderMobile from "../../Components/Headers/TodoHeaderMobile"
import TabContainer from "../../Components/Tab/TabContainer"
import { useState } from "react";

const AppLayout = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [spawnPoint, setSpawnPoint] = useState({
        x: 0,
        y: 0
    });

    return (
        <section className="min-h-screen w-full p-8 flex flex-col gap-4 " >
            <TodoHeader />
            <TodoHeaderMobile />

            <TabContainer />
        </section>
    )
}

export default AppLayout