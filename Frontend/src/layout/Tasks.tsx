import { useState, useEffect } from "react";
import TasksForm from "../components/TasksForm";
import TaskItemContainer from "../components/TasksItem";
import { getData } from "../utils/api";
import type { Task } from "../types/task";
import { theme } from "../constants/theme";
import { LoadingProvider } from "../context/LoadingContext";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      let data
      try {
        data = await getData<Task[]>("tasks");
      }
      finally {
      }
      setTasks(data ?? []);
    };
    loadTasks();
  }, []);

  return (
    <div
    className={`w-full h-full flex flex-row`}
    >
      <div
      className={`
        relative
        w-1/3
        flex-1 flex flex-col gap-8 p-2 
        ${theme.secondary.bg}
        border-r-4 ${theme.outline.border}
        `}
      >
        <LoadingProvider loadingKey='Task Item' />
        <h2
        className="text-3xl text-center font-bold"
        >
          Tasks
        </h2>
        <TasksForm tasks={tasks} setTasks={setTasks} />
        <TaskItemContainer tasks={tasks} setTasks={setTasks} />
      </div>
      <div
      className="flex-2"
      >
        fewfe
      </div>
    </div>
  );
};

export default Tasks;