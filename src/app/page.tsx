import TaskList from "./task/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="w-full max-w-3/5 bg-indigo-50">
        <TaskList />
      </div>
    </div>
  );
}
