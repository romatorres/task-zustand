import { type FormEvent, useState } from "react";
import { TaskItem } from "./item";
import { useTaskStore } from "../store/task";

export function TaskList() {
  const [newTask, setNewTask] = useState("");
  const { tasks, addTask } = useTaskStore();

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();

    addTask(newTask);

    setNewTask("");
  };

  return (
    <main className="container">
      <header>
        <h1>Suas Tarefas!</h1>
        <p>
          Você tem <span>{tasks.length}</span> tarefas em aberto.
        </p>
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
        <p>Total de tarefas:</p>
        <p>Tarefas pendentes:</p>
        <p>Tarefas finalizadas:</p>
      </footer>
    </main>
  );
}

export default TaskList;
