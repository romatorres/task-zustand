import { SquarePen, Trash2, CheckCircle, Circle } from "lucide-react";
import { useTaskStore } from "../../stores/taskStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import FormTask from "./formTask";

export default function TaskItem() {
  const { tasks, removeTask, toggleTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState<number | null>(null);

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg text-gray-500">
          Nenhuma tarefa encontrada. Crie uma nova tarefa!
        </p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3/5 mt-6 font-open-sans">
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li
            className="flex justify-between items-center px-6 py-9 bg-[#f7f2fc] rounded-lg shadow-md text-xl"
            key={task.id}
          >
            <div className="flex items-center gap-3">
              <button className="btnChek" onClick={() => toggleTask(task.id)}>
                {task.done ? (
                  <CheckCircle size={32} color="#00b894" />
                ) : (
                  <Circle size={32} color="#d63031" />
                )}
              </button>
              <div className="flex flex-col">
                <h3 className={task.done ? "textDone" : "none"}>
                  <span className="text-xl font-medium">{task.text}</span>
                </h3>
                <p className="text-base text-dark">{task.description}</p>
              </div>
            </div>
            <div className="btnList">
              <Dialog
                open={editingTask === task.id}
                onOpenChange={(open) => !open && setEditingTask(null)}
              >
                <DialogTrigger asChild>
                  <button
                    className="btnEdit"
                    onClick={() => setEditingTask(task.id)}
                  >
                    <SquarePen />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Editar Tarefa</DialogTitle>
                  <FormTask
                    taskId={task.id}
                    initialData={{
                      text: task.text,
                      description: task.description,
                    }}
                    onSubmit={() => setEditingTask(null)}
                    onCancel={() => setEditingTask(null)}
                  />
                </DialogContent>
              </Dialog>
              <button className="btnDanger" onClick={() => removeTask(task.id)}>
                <Trash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
