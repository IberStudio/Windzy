import { useRef } from "react";
import type { Task } from "../types/task";
import { postData } from "../utils/fetch";
import Button from "./Button";
import { Border } from "./Border";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TasksForm = ({ tasks, setTasks }: Props) => {
  const border = Border("borders", "brownBorder");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = inputRef.current?.value?.trim();
    if (!value) return;

    const exists = tasks.some(
      (task) => task.title.toLowerCase() === value.toLowerCase()
    );

    if (exists) {
      console.log("Task already exists");
      return;
    }

    const created = await postData<Task>("tasks", {
      title: value,
      completed: false,
    });

    setTasks((prev) => [...prev, created]);

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form
      className={`${border.className} w-full flex flex-row justify-between`}
      style={border.style}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a task"
        className="input-border w-[80%]"
        required
      />
      <Button value="Add" type="submit" />
    </form>
  );
};

export default TasksForm;