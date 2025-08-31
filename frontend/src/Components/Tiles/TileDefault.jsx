const TileDefault = ({  task, color }) => {

    return (
        <div className={`border ${color.border} border-t-4 rounded-md p-4`} >
            <div className=" flex items-center gap-4" >
                <input type="checkbox" name={task.taskId} id={task.taskId} className={ color.accent} />
                <label htmlFor={task.taskId}> {task.taskName} </label>
            </div>
        </div>
    )
}

export default TileDefault