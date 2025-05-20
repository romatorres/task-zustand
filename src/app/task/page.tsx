"use client";

import { useEffect } from "react";
import HeaderTask from "./headerTask";
import TaskItem from "./item";
import { useTaskStore } from "../../stores/taskStore";

export default function TaskList() {
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const completedTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <main>
      <div className="fixed top-0 w-full z-20">
        <HeaderTask />
      </div>
      <div className="mt-60 z-10">
        <TaskItem />
      </div>
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
