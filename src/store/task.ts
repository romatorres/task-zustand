import { create } from "zustand";

type Task = {
  id: string | number;
  text: string;
  done: boolean;
};

type TaskStore = {
  tasks: Task[];
  addTask: (text: string) => void;
  removeTask: (id: string | number) => void;
  editTask: (id: string | number, text: string) => void;
  toggleTask: (id: string | number) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (text) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), text: text, done: false }],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: [...state.tasks.filter((task) => task.id !== id)],
    })),
  editTask: (id, text) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, text: text } : task
      ),
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      ),
    })),
}));
