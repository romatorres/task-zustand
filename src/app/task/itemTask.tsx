import {
  SquarePen,
  Trash2,
  CheckCircle,
  Circle,
  Calendar,
  TriangleAlert,
} from "lucide-react";
import { useTaskStore } from "../../stores/taskStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import FormTask from "./formTask";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TaskItem() {
  const { filteredTasks, removeTask, toggleTask, searchTerm } = useTaskStore();
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [deletingTask, setDeletingTask] = useState<number | null>(null);

  if (filteredTasks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg text-gray-500">
          {searchTerm.trim()
            ? `Nenhuma tarefa encontrada para "${searchTerm}". Tente outra busca!`
            : "Nenhuma tarefa encontrada. Crie uma nova tarefa!"}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3/5 mt-6 font-open-sans">
      <ul className="flex flex-col gap-4">
        {filteredTasks.map((task) => (
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
              <div className="flex flex-col gap-2">
                <h3 className={task.done ? "textDone" : "none"}>
                  <span className="text-xl font-medium">{task.text}</span>
                </h3>
                <p className="text-base text-dark">{task.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>Criado em {formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="btnList">
              {/* EDITAR TAREFA */}
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

              {/* EXCLUIR TAREFA */}
              <Dialog
                open={deletingTask === task.id}
                onOpenChange={(open) => !open && setDeletingTask(null)}
              >
                <DialogTrigger asChild>
                  <button
                    className="btnDanger"
                    onClick={() => setDeletingTask(task.id)}
                  >
                    <Trash2 />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Excluir Tarefa</DialogTitle>
                  <div className="flex flex-col gap-3 text-danger items-center">
                    <TriangleAlert size={46} />
                    <p className="text-2xl text-gray-800">
                      Tem certeza que deseja excluir esta tarefa? Essa ação não
                      pode ser desfeita.
                    </p>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setDeletingTask(null)}
                      className="px-10 h-14 w-full bg-gray-300 rounded-lg text-gray-700 text-lg outline-0 cursor-pointer transition-all ease-in-out duration-500 hover:bg-gray-400 active:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      className="px-10 h-14 w-full bg-danger rounded-lg text-white text-lg outline-0 cursor-pointer transition-all ease-in-out duration-500 hover:bg-red-600 focus:bg-gray-400 active:bg-gray-400"
                      onClick={() => {
                        removeTask(task.id);
                        setDeletingTask(null);
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
