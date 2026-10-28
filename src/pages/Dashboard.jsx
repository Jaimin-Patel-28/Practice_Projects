import React, { useState, useEffect, useMemo } from "react";
import Form from "../components/Form";
import QueList from "../components/QueList";
import {
  Clock,
  Search,
  SlidersHorizontal,
  Plus,
  CalendarDays,
  CircleDashed,
  CheckCircle,
  ListTodo,
  Code2,
  MessageSquare,
  Laptop,
  SearchX,
  Inbox,
} from "lucide-react";

const EMPTY_FILTERS = {
  search: "",
  category: "all",
  difficulty: "all",
  status: "all",
};

const loadTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("task")) || [];
    return saved.map((t, i) => ({ ...t, id: t.id ?? Date.now() + i }));
  } catch {
    return []; 
  }
};

const Dashboard = () => {
  const [toggle, setToggle] = useState(false); 
  const [tasks, setTasks] = useState(loadTasks);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [machineStatus, setMachineStatus] = useState(
    () => localStorage.getItem("machineStatus") || "PENDING",
  );

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("machineStatus", machineStatus);
  }, [machineStatus]);

  const openAddForm = () => {
    setTaskToEdit(null);
    setToggle(true);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setToggle(true);
  };

  const closeForm = () => {
    setTaskToEdit(null);
    setToggle(false);
  };

  const handleSave = (data) => {
    const cleanData = { ...data, question: data.question.trim() };

    if (taskToEdit) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskToEdit.id ? { ...t, ...cleanData } : t)),
      );
    } else {
      setTasks((prev) => [...prev, { id: Date.now(), ...cleanData }]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Kya aap sach me ye question delete karna chahte ho?"))
      return;

    if (taskToEdit && taskToEdit.id === id) closeForm();
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => setFilters(EMPTY_FILTERS);

  const filteredTasks = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    return tasks.filter(
      (t) =>
        t.question.toLowerCase().includes(q) &&
        (filters.category === "all" || t.category === filters.category) &&
        (filters.difficulty === "all" || t.difficulty === filters.difficulty) &&
        (filters.status === "all" || t.status === filters.status),
    );
  }, [tasks, filters]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "COMPLETED").length;
    const pending = tasks.filter((t) => t.status === "PENDING").length;
    const inProgress = tasks.filter((t) => t.status === "INPROGRESS").length;
    const dsaCompleted = tasks.filter(
      (t) => t.category === "DSA" && t.status === "COMPLETED",
    ).length;
    const interviewCompleted = tasks.filter(
      (t) => t.category !== "DSA" && t.status === "COMPLETED",
    ).length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pending,
      inProgress,
      dsaCompleted,
      interviewCompleted,
      progress,
    };
  }, [tasks]);

  const cards = [
    {
      title: "Total Questions",
      value: stats.total,
      subtitle: "All added questions",
      icon: ListTodo,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      subtitle: "Questions completed",
      icon: CheckCircle,
      iconStyle: "bg-green-50 text-green-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      subtitle: "Questions in progress",
      icon: Clock,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      subtitle: "Questions remaining",
      icon: CircleDashed,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  const focusCards = [
    {
      title: "DSA Completed",
      value: stats.dsaCompleted,
      subtitle: "Completed DSA problems",
      icon: Code2,
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Interview Questions Completed",
      value: stats.interviewCompleted,
      subtitle: "Git + Technical completed",
      icon: MessageSquare,
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.difficulty !== "all" ||
    filters.status !== "all";

  return (
    <div className="relative min-h-screen bg-[#f7f8fc] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1500px]">
        {/* Dashboard Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Weekly Overview
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Interview Preparation
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Track your progress, organize your questions, and get ready for
              your next interview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-600">
              <CalendarDays size={17} className="text-slate-400" />
              This week
            </div>

            <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700 sm:flex">
              JP
            </div>
          </div>
        </header>

        {/* Statistics Cards */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconStyle}`}
                >
                  <Icon size={21} />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight">
                  {card.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">{card.subtitle}</p>
              </article>
            );
          })}
        </section>

        {/* DSA / Interview / Machine coding */}
        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {focusCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconStyle}`}
                >
                  <Icon size={21} />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <p className="mt-1 text-3xl font-bold tracking-tight">
                  {card.value}
                </p>
                <p className="mt-2 text-xs text-slate-400">{card.subtitle}</p>
              </article>
            );
          })}

          {/* Machine coding status (user khud set karta hai) */}
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Laptop size={21} />
            </div>

            <label
              htmlFor="machine-status"
              className="mt-5 block text-sm font-medium text-slate-500"
            >
              Machine Coding Status
            </label>

            <select
              id="machine-status"
              value={machineStatus}
              onChange={(e) => setMachineStatus(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400"
            >
              <option value="PENDING">Pending</option>
              <option value="INPROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <p className="mt-2 text-xs text-slate-400">
              Update your machine coding round status
            </p>
          </article>
        </section>

        {/* Progress Bar */}
        <section className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold">Overall Progress</span>
            <span className="font-bold text-indigo-600">{stats.progress}%</span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={stats.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall completion progress"
            className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
          >
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {stats.completed} of {stats.total} questions completed
          </p>
        </section>

        {/* Search, Filters and Add Button */}
        <section className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold">Your Questions</h2>
              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredTasks.length} of {tasks.length} questions
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Question
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {/* Search */}
            <div className="xl:col-span-1">
              <label
                htmlFor="search-question"
                className="mb-2 block text-xs font-medium text-slate-500"
              >
                Search questions
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-3 focus-within:border-indigo-400">
                <Search size={17} className="shrink-0 text-slate-400" />
                <input
                  id="search-question"
                  name="search"
                  type="text"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by question..."
                  className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="filter-category"
                className="mb-2 block text-xs font-medium text-slate-500"
              >
                Category
              </label>

              <select
                id="filter-category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
              >
                <option value="all">All Categories</option>
                <option value="DSA">DSA</option>
                <option value="GIT">Git</option>
                <option value="TECHNICAL">Technical</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label
                htmlFor="filter-difficulty"
                className="mb-2 block text-xs font-medium text-slate-500"
              >
                Difficulty
              </label>

              <select
                id="filter-difficulty"
                name="difficulty"
                value={filters.difficulty}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
              >
                <option value="all">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="filter-status"
                className="mb-2 block text-xs font-medium text-slate-500"
              >
                Status
              </label>

              <div className="relative">
                <SlidersHorizontal
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="filter-status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 pr-9 text-sm text-slate-600 outline-none focus:border-indigo-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="INPROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Clear all filters
            </button>
          )}
        </section>

        {/* Question List */}
        <section className="mt-6 min-w-0">
          {tasks.length === 0 ? (
            // EMPTY STATE: data hi nahi hai
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
              <Inbox size={36} className="text-slate-300" />
              <p className="mt-3 font-semibold text-slate-700">
                No questions yet
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Click "Add Question" to start tracking your preparation.
              </p>
              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Plus size={16} />
                Add your first question
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            // NO RESULTS STATE: data hai, par filter se kuch match nahi hua
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
              <SearchX size={36} className="text-slate-300" />
              <p className="mt-3 font-semibold text-slate-700">
                No matching questions
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try a different search or change the filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              {filteredTasks.map((elem) => (
                <QueList
                  key={elem.id}
                  task={elem}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        {/* Centered Add/Edit Modal */}
        {toggle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm sm:p-6">
            <div className="relative my-auto w-full max-w-lg">
              <Form
                taskToEdit={taskToEdit}
                onSubmit={handleSave}
                onClose={closeForm}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-slate-400">
          Interview Prep Tracker · Stay consistent, keep improving.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
