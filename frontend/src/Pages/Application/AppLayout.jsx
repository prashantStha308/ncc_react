import TodoHeader from "../../Components/Headers/TodoHeader"
import TodoHeaderMobile from "../../Components/Headers/TodoHeaderMobile"
import TabContainer from "../../Components/Tab/TabContainer"
import { useState } from "react";
import { useUserStore } from "../../store/user.store";

const AppLayout = () => {

    const { isLoggedIn } = useUserStore();

    return (
        <section className="min-h-screen w-full p-8 flex flex-col gap-4 " >
            {
                isLoggedIn && (
                    <>
                        <TodoHeader />
                        <TodoHeaderMobile />
                    </>
                )
            }
            <TabContainer isLoggedIn={isLoggedIn} />
        </section>
    )
}

export default AppLayout