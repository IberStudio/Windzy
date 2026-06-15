import type { Task } from "../types/task";
import { deleteData, putData } from "../utils/fetch";
import Button from "../components/Button";
import { Border } from "../components/Border";
import { icons } from "../utils/imports";
import { useLoading } from "../context/LoadingContext";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskItem = ({
  value,
  completed,
  onDelete,
  onComplete,
}: {
  value: string | undefined;
  completed: boolean;
  onDelete?: () => void;
  onComplete?: () => void;
}) => {
  const isCompleted = () => (completed ? icons.cross : icons.tick);
  const border = completed ? Border("borders", "green") : Border("borders", "red");

  return (
    <div
      className={`${completed ? "completed" : ""} flex flex-row justify-between items-center ${border.className}`}
      style={border.style}
    >
      <p className="max-w-[70%] warp-break-words text-[white] px-1">{value}</p>
      <div className="buttons flex gap-2">
        <Button
          value={{ name: "Delete", url: icons.trashCan }}
          type="button"
          onClick={onDelete}
        />
        <Button
          value={{ name: "Complete", url: isCompleted() }}
          type="button"
          onClick={onComplete}
        />
      </div>
    </div>
  );
};

const TaskItemContainer = ({ tasks = [], setTasks }: Props) => {
  const border = Border("borders", "brownBorder");
  const {setIsLoading} = useLoading()

  const handleDelete = async (id: number) => {
    setIsLoading(true)
    await deleteData("tasks", id);
    setIsLoading(false)
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleComplete = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    setIsLoading(true)
    if (!task) return;
    await putData("tasks", id, { completed: !task.completed });
    
    setIsLoading(false)
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div
      className={`${border.className} h-full flex flex-col flex-1 gap-1 overflow-y-scroll`}
      style={border.style}
    >
      {tasks.length === 0 ? (
        <p className="m-auto text-3xl text-[white]">No Tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            value={task.title}
            completed={task.completed}
            onDelete={() => handleDelete(task.id)}
            onComplete={() => handleComplete(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskItemContainer;