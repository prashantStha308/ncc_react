import { useEffect } from "react";
import { useListStore } from "../../store/list.store"
import Dropdown from "./Dropdown"
import DropdownItem from "./DropdownItem"
import { useUserStore } from "../../store/user.store";

const TaskLists = ({trigger, className, ...props}) => {

    const { isLoggedIn, user } = useUserStore();
    const { lists = [], loading, error, fetchAllLists } = useListStore();

    useEffect(() => {
        if (isLoggedIn) {
            fetchAllLists(user.userId)
        }
    },[isLoggedIn, fetchAllLists, user])

    return (
        <Dropdown trigger={trigger} className={className} {...props} >
            {
                lists?.map((list) => (
                    list && (
                        <DropdownItem key={list.listId} >
                            {list?.name || ""}
                        </DropdownItem>
                    )
                ) )
            }
        </Dropdown>
    )
}

export default TaskLists