import React, { useMemo, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskItem from "./components/TaskItem";
import FilterBar, { type Filter } from "./components/FilterBar";
import { useTasks } from "./hooks/useTasks";
import './App.css';



const App: React.FC = () => {
  const {
    tasks,
    loading,
    addLoading,
    actionLoading,
    error,
    addTask,
    toggleTaskCompletion,
    deleteTask,
  } = useTasks();

  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter(t => !t.isCompleted);
    if (filter === "completed") return tasks.filter(t => t.isCompleted);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Task Manager</h1>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <AddTaskForm onAdd={addTask} loading={addLoading} />

          <FilterBar filter={filter} setFilter={setFilter} />

          <div className="mt-4">
            {loading ? (
              <div className="text-center text-blue-600 animate-pulse py-6">Loading tasks...</div>
            ) : (
              <>
                {filtered.length === 0 ? (
                  <div className="text-center text-gray-500 py-6">No tasks to show.</div>
                ) : (
                  <ul className="space-y-3">
                    {filtered.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => toggleTaskCompletion(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        isLoading={!!actionLoading[task.id]}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          {error && <div className="text-red-600 mt-4 text-sm">{error}</div>}

          <div className="mt-4 text-sm text-gray-600">
            Total: <span className="font-medium">{tasks.length}</span> • Completed:{" "}
            <span className="font-medium">{tasks.filter(t => t.isCompleted).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
