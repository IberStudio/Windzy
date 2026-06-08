import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Button from "../components/Button"
import { deleteData, getData, postData, putData } from "../utils/fetch";
import type { Task } from "../types/task";
import { Border } from "../components/Border";
import { icons } from "../utils/imports";

const WorklistItem = (
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

const Worklist = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  /* -------------------- LOAD ON MOUNT -------------------- */
    useEffect(() => {
      const loadTasks = async () => {
        const data = await getData<Task[]>("tasks");
        setTasks(data);
      };

      loadTasks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const value = inputRef.current?.value?.trim();
      if (!value) return;

      const exists = tasks.some(
        task => task.title.toLowerCase() === value.toLowerCase()
      );

      if (exists) {
        console.log("Task already exists");
        return;
      }

      const created = await postData<Task>("tasks", {
        title: value,
        completed: false,
      });

      setTasks(prev => [...prev, created]);

      if (inputRef.current) inputRef.current.value = "";
    };

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
      <>
        <form 
          className="w-full border- flex flex-row justify-between"
          onSubmit={handleSubmit}
        >
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Add a task" 
            className="input-border w-[80%]"
            required
          />
          <Button 
              value="Add"
              type="submit"
          />
        </form>
        <div className="border- flex flex-col flex-1 gap-1 overflow-y-scroll">
          {
            tasks.length === 0 ? (
              <p className="m-auto text-3xl text-[white]">No Tasks</p>
            ) : (
              tasks.map((task) => {
                return (
                    <WorklistItem
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
      </>
    )
}

export default Worklist