"use client";

import { type FormEvent, useState } from "react";
import { useTaskStore } from "../../stores/taskStore";
import { CheckCheck } from "lucide-react";

export default function HeaderTask() {
  const [newTask, setNewTask] = useState("");
  const { addTask } = useTaskStore();

  const { tasks } = useTaskStore();

  const completedTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.length - completedTasks;

  /* Envia o evento do formulário para adicionar uma nova tarefa, e evita enviar uma tarefa vazia. */
  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="bg-white">
      <header className="flex justify-between items-center gap-4 bg-linear-to-r from-primary to-secondary text-white py-6 px-20">
        <div className="flex items-center gap-4">
          <CheckCheck size={58} />
          <h1 className="font-open-sans font-semibold text-4xl">
            Suas Tarefas!
          </h1>
        </div>
        <div className="flex items-center gap-6 font-open-sans text-lg">
          <p>
            Total de tarefas:{" "}
            <span className="font-semibold">{tasks.length}</span>
          </p>
          <p>
            Tarefas pendentes:{" "}
            <span className="text-danger font-semibold">{pendingTasks}</span>
          </p>
          <p>
            Tarefas finalizadas:{" "}
            <span className="text-chart-4" font-semibold>
              {completedTasks}
            </span>
          </p>
        </div>
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
            className="flex flex-1 px-3 py-4 border-2 border-secondary rounded-lg text-lg transition-all ease-in-out duration-200 focus:border-primary outline-0"
          />
          <button
            type="submit"
            className="px-10 h-[64px] bg-primary rounded-lg text-white text-lg outline-0 cursor-pointer transition-all ease-in-out duration-500 hover:bg-secondary focus:bg-secondary active:bg-secondary"
          >
            Adicione uma tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
