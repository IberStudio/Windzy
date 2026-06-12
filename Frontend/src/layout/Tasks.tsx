import { useState, useEffect } from "react";
import TasksForm from "../components/TasksForm";
import TaskItemContainer from "../components/TasksItem";
import { getData } from "../utils/fetch";
import type { Task } from "../types/task";

const Tasks = () => {
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
      <TasksForm tasks={tasks} setTasks={setTasks} />
      <TaskItemContainer tasks={tasks} setTasks={setTasks} />
    </>
  );
};

export default Tasks;