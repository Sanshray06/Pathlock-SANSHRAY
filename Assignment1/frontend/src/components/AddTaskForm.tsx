import React, { useState } from "react";
import "./AddTaskForm.css";

interface AddTaskFormProps {
  onAdd: (description: string) => Promise<void> | void;
  loading?: boolean;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, loading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    try {
      await onAdd(trimmed);
      setValue("");
    } catch {
      // handled globally
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        disabled={!!loading}
        aria-label="New task"
      />
      <button type="submit" disabled={!!loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddTaskForm;
