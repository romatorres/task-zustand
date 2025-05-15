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
    <main>
      <h1>Suas Tarefas!</h1>
      <p>
        Você tem <span>{tasks.length}</span> tarefas em aberto.
      </p>

      <form onSubmit={handleAddTask} className="formTask">
        <input
          type="text"
          placeholder="Digite uma nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Adicione uma tarefa</button>
      </form>
      <TaskItem />
    </main>
  );
}

export default TaskList;
