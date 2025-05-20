"use client";

import { useEffect } from "react";
import HeaderTask from "./headerTask";
import TaskItem from "./item";
import { useTaskStore } from "../../stores/taskStore";

export default function TaskList() {
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main>
      <div className="fixed top-0 w-full z-20">
        <HeaderTask />
      </div>
      <div className="mt-60 mb-10 z-10">
        <TaskItem />
      </div>
    </main>
  );
}
