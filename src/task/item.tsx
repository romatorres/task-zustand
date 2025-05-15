import { useTaskStore } from "../store/task";

export function TaskItem() {
  const { tasks, removeTask, editTask } = useTaskStore();
  return (
    <div>
      <ul className="ulList">
        {tasks.map((task) => (
          <li className="liList" key={task.id}>
            <p>{task.text}</p>
            <div className="btnList">
              <button
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
