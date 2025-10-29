import React from "react";
import "./TaskItem.css";
import type { Task } from "../types/Task";

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  isLoading?: boolean;
};

const SpinnerSmall = () => <div className="spinner-small"></div>;

export default function TaskItem({ task, onToggle, onDelete, isLoading }: Props) {
  return (
    <li className={`task-item ${task.isCompleted ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={onToggle}
        disabled={!!isLoading}
        className="task-checkbox"
      />

      <div className="task-content">
        <div className={`task-desc ${task.isCompleted ? "completed" : ""}`}>
          {task.description}
        </div>
        <div className="task-date">
          {task.createdAt ? new Date(task.createdAt).toLocaleString() : ""}
        </div>
      </div>

      <button
        onClick={onDelete}
        disabled={!!isLoading}
        className="delete-btn"
      >
        {isLoading ? <SpinnerSmall /> : "Delete"}
      </button>
    </li>
  );
}
