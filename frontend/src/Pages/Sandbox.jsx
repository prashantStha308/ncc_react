import { useState } from "react"
import ExpandingTab from "../Components/Tab/AddTaskForm"

const Sandbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spawnPoint, setSpawnPoint] = useState({
    x:0, y:0
  })

  const isClose = () => setIsOpen(false);
  const handleClick = (e) => {
    console.log("Clicking");
    setSpawnPoint({
      x: e.clientX - window.innerWidth / 2,
      y: e.clientY - window.innerHeight / 2
    });

    setIsOpen(true);
  }

  return (
    <>
      <ExpandingTab isOpen={isOpen} setClose={isClose} spawnPoint={spawnPoint} />
      <button onClick={handleClick} className="bg-textDark text-bgLight px-4 py-2 rounded-sm cursor-pointer"  >
        Open
      </button>
    </>
  )
}

export default Sandbox