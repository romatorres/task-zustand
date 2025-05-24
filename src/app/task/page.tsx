"use client";

import { useEffect, useState } from "react";
import HeaderTask from "./headerTask";
import TaskItem from "./itemTask";
import { useTaskStore } from "../../stores/taskStore";

export default function TaskList() {
  const { fetchTasks } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
      setIsLoading(false);
    };

    loadTasks();
  }, [fetchTasks]);

  return (
    <main>
      <div className="fixed top-0 w-full z-20">
        <HeaderTask />
      </div>

      <div className="mt-80 mb-10 z-10">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <TaskItem />
        )}
      </div>
    </main>
  );
}
