import { useState, useEffect } from "react";
import TasksForm from "../components/TasksForm";
import TaskItemContainer from "../components/TasksItem";
import { getData } from "../utils/fetch";
import type { Task } from "../types/task";
import { useLoading } from "../context/LoadingContext";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { setIsLoading } = useLoading();

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      let data
      try {
        data = await getData<Task[]>("tasks");
      }
      finally {
        setIsLoading(false)
      }
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