import { X } from "lucide-react";
import { useTaskStore } from "../store/task";

export function TaskItem() {
  const { tasks, removeTask, editTask } = useTaskStore();
  return (
    <div>
      <ul className="ulList">
        {tasks.map((task) => (
          <li className="liList" key={task.id}>
            <div className="itemList">
              <span className="IconAling">
                <X size={36} color="#f03333" />
              </span>
              <p>{task.text}</p>
            </div>
            <div className="btnList">
              <button className="btnEdit" onClick={() => removeTask(task.id)}>
                Concluida
              </button>
              <button
                className="btnEdit"
                onClick={() =>
                  editTask(
                    task.id,
                    prompt("Novo nome para a tarefa", task.text) || task.text
                  )
                }
              >
                Editar
              </button>
              <button className="btnDanger" onClick={() => removeTask(task.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskItem;
