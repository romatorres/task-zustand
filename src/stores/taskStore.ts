import { create } from "zustand";
import { toast } from "sonner";

type Task = {
  id: number;
  text: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

type TaskStore = {
  tasks: Task[];
  searchTerm: string;
  filteredTasks: Task[];
  setSearchTerm: (term: string) => void;
  fetchTasks: () => Promise<void>;
  addTask: (text: string, description: string) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, text: string, description: string) => void;
  toggleTask: (id: number) => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  searchTerm: "",
  filteredTasks: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    const { tasks } = get();
    
    if (!term.trim()) {
      set({ filteredTasks: tasks });
      return;
    }
    
    const filtered = tasks.filter(
      (task) => 
        task.text.toLowerCase().includes(term.toLowerCase()) || 
        task.description.toLowerCase().includes(term.toLowerCase())
    );
    
    set({ filteredTasks: filtered });
  },

  /* FETCH - BUSCAR TAREFA */
  fetchTasks: async () => {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Falha ao buscar tarefas");
    }
    const tasks = await response.json();
    const sortedTasks = tasks.sort((a: Task, b: Task) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    set({ 
      tasks: sortedTasks,
      filteredTasks: sortedTasks 
    });
  },

  /* METODO POST - ADICIONAR TAREFA */
  addTask: async (text, description) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, description }),
      });
      if (!response.ok) {
        throw new Error("Falha ao adicionar tarefa");
      }
      const newTask = await response.json();
      set((state) => {
        const updatedTasks = [...state.tasks, newTask].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        // Atualiza também as tarefas filtradas
        const { searchTerm } = state;
        let updatedFilteredTasks = updatedTasks;
        
        if (searchTerm.trim()) {
          updatedFilteredTasks = updatedTasks.filter(
            (task) => 
              task.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
              task.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        return { 
          tasks: updatedTasks,
          filteredTasks: updatedFilteredTasks
        };
      });
      toast.success("Tarefa adicionada com sucesso!");
    } catch {
      toast.error("Erro ao adicionar tarefa");
    }
  },

  /* METODO TOGGLE - ALTERAR O STATUS DA TAREFA */
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
        set((state) => {
          const updatedTasks = state.tasks.map((t) => (t.id === id ? updatedTask : t));
          
          // Atualiza também as tarefas filtradas
          const updatedFilteredTasks = state.filteredTasks.map((t) => 
            t.id === id ? updatedTask : t
          );
          
          return {
            tasks: updatedTasks,
            filteredTasks: updatedFilteredTasks
          };
        });
        toast.success("Status da tarefa atualizado!");
      }
    } catch {
      toast.error("Erro ao atualizar status da tarefa");
    }
  },

  /* METODO PUT - ALTERAR TAREFA */
  editTask: async (id, text, description) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, text, description }),
      });
      if (!response.ok) {
        throw new Error("Falha ao editar tarefa");
      }
      const updatedTask = await response.json();
      set((state) => {
        const updatedTasks = state.tasks.map((task) => (task.id === id ? updatedTask : task));
        
        // Atualiza também as tarefas filtradas
        const { searchTerm } = state;
        let updatedFilteredTasks = state.filteredTasks;
        
        // Se a tarefa editada está nas tarefas filtradas, atualize-a
        if (state.filteredTasks.some(t => t.id === id)) {
          updatedFilteredTasks = state.filteredTasks.map((t) => 
            t.id === id ? updatedTask : t
          );
        } 
        // Se a tarefa editada não está nas tarefas filtradas, mas agora corresponde ao termo de busca
        else if (
          searchTerm.trim() && 
          (updatedTask.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
           updatedTask.description.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          updatedFilteredTasks = [...state.filteredTasks, updatedTask];
        }
        
        return {
          tasks: updatedTasks,
          filteredTasks: updatedFilteredTasks
        };
      });
      toast.success("Tarefa editada com sucesso!");
    } catch {
      toast.error("Erro ao editar tarefa");
    }
  },

  /* METODO DELETE - DELETAR TAREFA */
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
        filteredTasks: state.filteredTasks.filter((t) => t.id !== id)
      }));
      toast.success("Tarefa removida com sucesso!");
    } catch {
      toast.error("Erro ao remover tarefa");
    }
  },
}));