"use client";

import { type FormEvent, useState, useEffect } from "react";
import { TaskItem } from "./item";
import { useTaskStore } from "../../stores/taskStore";

export default function TaskList() {
  const [newTask, setNewTask] = useState("");
  const { tasks, addTask, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* Envia o evento do formulário para adicionar uma nova tarefa, e evita enviar uma tarefa vazia. */
  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  const completedTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <main className="container">
      <header>
        <h1>Suas Tarefas!</h1>
      </header>
      <form onSubmit={handleAddTask} className="formTask">
        <input
          type="text"
          placeholder="Digite uma nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Adicione uma tarefa
        </button>
      </form>
      <TaskItem />
      <footer>
        <p>
          Total de tarefas: <span>{tasks.length}</span>
        </p>
        <p>
          Tarefas pendentes:{" "}
          <span className="pendingTasks">{pendingTasks}</span>
        </p>
        <p>
          Tarefas finalizadas:{" "}
          <span className="completedTasks">{completedTasks}</span>
        </p>
      </footer>
    </main>
  );
}
