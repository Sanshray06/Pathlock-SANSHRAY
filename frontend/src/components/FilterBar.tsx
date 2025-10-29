import React from "react";
import "./FilterBar.css";

export type Filter = "all" | "active" | "completed";

type Props = {
  filter: Filter;
  setFilter: (f: Filter) => void;
};

export default function FilterBar({ filter, setFilter }: Props) {
  return (
    <div className="filter-bar">
      <button
        onClick={() => setFilter("all")}
        disabled={filter === "all"}
        className={`filter-btn ${filter === "all" ? "active" : ""}`}
      >
        All
      </button>

      <button
        onClick={() => setFilter("active")}
        disabled={filter === "active"}
        className={`filter-btn ${filter === "active" ? "active" : ""}`}
      >
        Active
      </button>

      <button
        onClick={() => setFilter("completed")}
        disabled={filter === "completed"}
        className={`filter-btn ${filter === "completed" ? "active" : ""}`}
      >
        Completed
      </button>
    </div>
  );
}
