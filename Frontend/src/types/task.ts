export type CreateTask = {
    title: string | undefined
}

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};