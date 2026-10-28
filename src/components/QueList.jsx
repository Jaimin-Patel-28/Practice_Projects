import React from "react";
import { Code2, GitBranch, MessageSquare, Pencil, Trash2 } from "lucide-react";

const categoryStyles = {
  DSA: "bg-blue-50 text-blue-700 ring-blue-100",
  GIT: "bg-orange-50 text-orange-700 ring-orange-100",
  TECHNICAL: "bg-violet-50 text-violet-700 ring-violet-100",
};

const difficultyStyles = {
  EASY: "text-emerald-600",
  MEDIUM: "text-amber-600",
  HARD: "text-rose-600",
};

const statusStyles = {
  COMPLETED: "bg-emerald-50 text-emerald-700",
  INPROGRESS: "bg-amber-50 text-amber-700",
  PENDING: "bg-slate-100 text-slate-600",
};

const statusLabels = {
  COMPLETED: "Completed",
  INPROGRESS: "In Progress",
  PENDING: "Pending",
};

const categoryLabels = {
  DSA: "DSA",
  GIT: "Git",
  TECHNICAL: "Technical",
};

const difficultyLabels = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const categoryIcons = {
  DSA: Code2,
  GIT: GitBranch,
  TECHNICAL: MessageSquare,
};

const QueList = ({ task, onEdit, onDelete }) => {
  if (!task) return null;

  const CategoryIcon = categoryIcons[task.category] || Code2;

  return (
    <div className="group flex w-full flex-col gap-3 border-b border-slate-100 bg-white p-4 transition-colors hover:bg-slate-50/80 md:flex-row md:items-center md:gap-0 md:p-0">
      {/* Question: 50% */}
      <div className="flex min-w-0 items-center gap-3 md:w-[50%] md:px-5 md:py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
          <CategoryIcon size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="truncate text-sm font-semibold text-slate-800"
            title={task.question}
          >
            {task.question}
          </p>
        </div>
      </div>


      <div className="flex flex-wrap items-center gap-2 pl-[52px] md:contents md:pl-0">
        {/* Category: 13% */}
        <div className="min-w-0 md:w-[13%] md:px-2">
          <span
            className={`inline-flex max-w-full truncate rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${
              categoryStyles[task.category] ||
              "bg-slate-100 text-slate-600 ring-slate-200"
            }`}
          >
            {categoryLabels[task.category] || task.category}
          </span>
        </div>

        {/* Difficulty: 12% */}
        <div className="min-w-0 md:w-[12%] md:px-2">
          <span
            className={`text-xs font-semibold ${
              difficultyStyles[task.difficulty] || "text-slate-600"
            }`}
          >
            {difficultyLabels[task.difficulty] || task.difficulty}
          </span>
        </div>

        {/* Status: 15% */}
        <div className="min-w-0 md:w-[15%] md:px-2">
          <span
            className={`inline-block max-w-full truncate rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              statusStyles[task.status] || "bg-slate-100 text-slate-600"
            }`}
          >
            {statusLabels[task.status] || task.status}
          </span>
        </div>
      </div>

      {/* Actions: 10% */}
      <div className="flex items-center justify-end gap-2 md:w-[10%] md:justify-center">
        {/* Edit Icon */}
        <button
          onClick={() => onEdit(task)}
          type="button"
          title="Edit task"
          aria-label="Edit task"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
        >
          <Pencil size={16} />
        </button>

        {/* Delete Icon */}
        <button
          onClick={() => onDelete(task.id)}
          type="button"
          title="Delete task"
          aria-label="Delete task"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default QueList;
