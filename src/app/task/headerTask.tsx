"use client";

import { type FormEvent, useState } from "react";
import { useTaskStore } from "../../stores/taskStore";
import { CheckCheck } from "lucide-react";

export default function HeaderTask() {
  const [newTask, setNewTask] = useState("");
  const { addTask } = useTaskStore();

  /* Envia o evento do formulário para adicionar uma nova tarefa, e evita enviar uma tarefa vazia. */
  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div>
      <header className="flex justify-center items-center gap-4 bg-linear-to-r from-primary to-secondary text-white py-6">
        <CheckCheck size={58} />
        <h1>Suas Tarefas!</h1>
      </header>
      <div className="mx-auto max-w-3/5 mt-6">
        <form
          onSubmit={handleAddTask}
          className="flex justify-center items-center gap-4 bg-white"
        >
          <input
            type="text"
            placeholder="Digite uma nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex flex-1 px-3 py-4 border-2 border-secondary rounded-lg text-lg transition-all ease-in-out duration-500 focus:border-primary outline-0"
          />
          <button
            type="submit"
            className="px-10 h-[64px] bg-primary rounded-lg text-white text-lg outline-0"
          >
            Adicione uma tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
