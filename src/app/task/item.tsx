import { SquarePen, Trash2, CheckCircle, Circle } from "lucide-react";
import { useTaskStore } from "../../stores/taskStore";

export default function TaskItem() {
  const { tasks, removeTask, editTask, toggleTask } = useTaskStore();
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
              <h3 className={task.done ? "textDone" : "none"}>{task.text}</h3>
            </div>
            <div className="btnList">
              <button
                className="btnEdit"
                onClick={() =>
                  editTask(
                    task.id,
                    prompt("Novo nome para a tarefa", task.text) || task.text
                  )
                }
              >
                <SquarePen />
              </button>
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
