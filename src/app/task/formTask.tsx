"use client";

import { useForm } from "react-hook-form";
import { useTaskStore } from "../../stores/taskStore";

interface FormInputs {
  text: string;
  description: string;
}

interface FormTaskProps {
  taskId?: number;
  initialData?: {
    text: string;
    description: string;
  };
  onSubmit: () => void;
  onCancel: () => void;
}

export default function FormTask({
  taskId,
  initialData,
  onSubmit: onFormSubmit,
  onCancel,
}: FormTaskProps) {
  const { addTask, editTask } = useTaskStore();
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormInputs) => {
    if (!data.text.trim()) return;
    
    if (taskId) {
      await editTask(taskId, data.text, data.description);
    } else {
      await addTask(data.text, data.description);
    }
    
    reset();
    onFormSubmit();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-white"
      >
        <input
          type="text"
          placeholder="Título da tarefa"
          {...register("text", { required: true })}
          className="flex flex-1 px-3 py-4 w-full border-2 border-secondary rounded-lg text-lg transition-all ease-in-out duration-200 focus:border-primary outline-0"
        />
        <input
          type="text"
          placeholder="Descrição da tarefa"
          {...register("description", { required: true })}
          className="flex flex-1 px-3 py-4 w-full border-2 border-secondary rounded-lg text-lg transition-all ease-in-out duration-200 focus:border-primary outline-0"
        />
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="px-10 h-14 w-full bg-primary rounded-lg text-white text-lg outline-0 cursor-pointer transition-all ease-in-out duration-500 hover:bg-secondary focus:bg-secondary active:bg-secondary"
          >
            {taskId ? "Atualizar" : "Adicionar"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-10 h-14 w-full bg-gray-300 rounded-lg text-gray-700 text-lg outline-0 cursor-pointer transition-all ease-in-out duration-500 hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
