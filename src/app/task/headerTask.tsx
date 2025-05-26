"use client";

import { useTaskStore } from "../../stores/taskStore";
import { useState } from "react";
import { CheckCheck, Search } from "lucide-react";
import FormTask from "./formTask";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HeaderTask() {
  const { tasks, setSearchTerm } = useTaskStore();
  const [openDialog, setOpenDialog] = useState(false);

  const completedTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.length - completedTasks;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white">
      <header className="flex justify-between items-center gap-4 bg-linear-to-r from-primary to-secondary text-white py-6 px-20">
        <div className="flex items-center gap-4">
          <CheckCheck size={58} />
          <h1 className="font-open-sans font-semibold text-4xl">
            Suas Tarefas!
          </h1>
        </div>
        <div className="flex items-center gap-6 font-open-sans text-lg">
          <p>
            Total de tarefas:{" "}
            <span className="font-semibold">{tasks.length}</span>
          </p>
          <p>
            Tarefas pendentes:{" "}
            <span className="text-danger font-semibold">{pendingTasks}</span>
          </p>
          <p>
            Tarefas finalizadas:{" "}
            <span className="text-chart-4 font-semibold">{completedTasks}</span>
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3/5 mt-6">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="w-full h-16 bg-primary rounded-lg text-white text-lg outline-0 cursor-pointer transition-all ease-in-out duration-500 hover:bg-secondary focus:bg-secondary active:bg-secondary"
            >
              Adicione uma nova tarefa
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Nova Tarefa! </DialogTitle>
            <FormTask
              onSubmit={() => setOpenDialog(false)}
              onCancel={() => setOpenDialog(false)}
            />
          </DialogContent>
        </Dialog>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquise por uma tarefa"
            className="flex pl-10 px-3 py-4 mt-6 w-full text-primary font-medium placeholder:font-normal border-2 border-secondary rounded-lg text-lg transition-all ease-in-out duration-200 focus:border-primary outline-0"
            onChange={handleSearch}
          />
          <Search className="absolute left-4 top-5.5 h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
