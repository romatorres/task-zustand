import { create } from "zustand";
import { toast } from "sonner";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type TaskStore = {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (text: string) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
  toggleTask: (id: number) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Falha ao buscar tarefas");
    }
    const tasks = await response.json();
    set({ tasks });
  },

  /* METODO POST - ADICIONAR TAREFA */
  addTask: async (text) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Falha ao adicionar tarefa");
      }
      const newTask = await response.json();
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
      toast.success("Tarefa adicionada com sucesso!");
    } catch {
      toast.error("Erro ao adicionar tarefa");
    }
  },

  toggleTask: async (id) => {
    try {
      const task = useTaskStore.getState().tasks.find((t) => t.id === id);
      if (task) {
        const response = await fetch("/api/tasks", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, done: !task.done }),
        });
        const updatedTask = await response.json();
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        }));
        toast.success("Status da tarefa atualizado!");
      }
    } catch {
      toast.error("Erro ao atualizar status da tarefa");
    }
  },

  editTask: async (id, text) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, text }),
      });
      if (!response.ok) {
        throw new Error("Falha ao editar tarefa");
      }
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
      toast.success("Tarefa editada com sucesso!");
    } catch {
      toast.error("Erro ao editar tarefa");
    }
  },

  removeTask: async (id) => {
    try {
      await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
      toast.success("Tarefa removida com sucesso!");
    } catch {
      toast.error("Erro ao remover tarefa");
    }
  },
}));
