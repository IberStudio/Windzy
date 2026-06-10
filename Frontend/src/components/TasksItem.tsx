import { useState, useEffect } from "react";
import { deleteData, getData, putData } from "../utils/fetch";
import Button from "../components/Button";

import type { Task } from "../types/task";

import { Border } from "../components/Border";
import { icons } from "../utils/imports";


const TaskItem = (
  { value, completed, onDelete, onComplete }: 
  { value: string | undefined,
    completed: boolean,
    onDelete?: () => void,
    onComplete?: () => void
   }
) => {
  
  const isCompleted = () => {
    return completed ? icons.cross : icons.tick
  }
 
  const border = completed ? Border("borders", "green") : Border("borders", "red");

  return (
    <>
    <div 
      className={`${completed ? "completed" : ""} flex flex-row justify-between items-center ${border.className}`} 
      style={border.style}
      >
      <p className="max-w-[70%] warp-break-words text-[white]">{value}</p>
      <div className="buttons flex gap-2">
        <Button 
            value={{
                name: "Delete",
                url: icons.trashCan
            }}
            type="button"
            onClick={onDelete}
        />
        <Button 
            value={{
                name: "Complete",
                url: isCompleted()
            }}
            type="button"
            onClick={onComplete}
        />
      </div>
    </div>
    </>
  )
}

const TaskItemContainer = () => {

  const border = Border("borders", "brownBorder")

  const [tasks, setTasks] = useState<Task[]>([]);

  /* -------------------- LOAD ON MOUNT -------------------- */
  useEffect(() => {
      const loadTasks = async () => {
          const data = await getData<Task[]>("tasks");
          setTasks(data);
      };

      loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
      await deleteData("tasks", id);

      setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleComplete = async (id: number) => {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      await putData("tasks", id, {
          completed: !task.completed,
      });

      setTasks(prev =>
          prev.map(t =>
          t.id === id
              ? { ...t, completed: !t.completed }
              : t
          )
      );
  };

  return (
      <div 
        className={`${border.className} flex flex-col flex-1 gap-1 overflow-y-scroll`}
        style={border.style}
      >
        {
          tasks.length === 0 ? (
            <p className="m-auto text-3xl text-[white]">No Tasks</p>
          ) : (
            tasks.map((task) => {
              return (
                  <TaskItem
                    key={task.id}
                    value={task.title}
                    completed={task.completed}
                    onDelete={() => handleDelete(task.id)}
                    onComplete={() => handleComplete(task.id)}
                  />
              )
            }) 
          )
        }
      </div>
    )
}

export default TaskItemContainer