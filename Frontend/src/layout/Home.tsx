import { useEffect, useState } from "react";
import TaskItemContainer from "../components/TasksItem"
import { getData } from "../utils/fetch";
import type { Task } from "../types/task";
import Music from "./Music";
import Timer from "./Timer";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getData<Task[]>("tasks");
      setTasks(data ?? []);
    };
    loadTasks();
  }, []);

  return (
    <>
      <div 
      className="h-full flex flex-col gap-2"
      >
        <div className="h-[25%]">
          <Timer />
        </div>
        <div className="h-[50%]">
          <TaskItemContainer 
              tasks={tasks}
              setTasks={setTasks}
          />
        </div>
        <div className="h-[25%]">
          <Music
          home={true}
          />
        </div>
      </div>
    </>
  )
}

export default Home