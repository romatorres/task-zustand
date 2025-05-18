import { SquarePen, Trash2, CheckCircle, Circle } from "lucide-react";
import { useTaskStore } from "../../stores/taskStore";

export function TaskItem() {
  const { tasks, removeTask, editTask, toggleTask } = useTaskStore();
  return (
    <div>
      <ul className="ulList">
        {tasks.map((task) => (
          <li className="liList" key={task.id}>
            <div className="itemList">
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

export default TaskItem;
