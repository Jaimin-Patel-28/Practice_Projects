import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const emptyValues = {
  question: "",
  category: "",
  difficulty: "",
  status: "",
};

const Form = ({ taskToEdit, onSubmit, onClose }) => {
  const isEditMode = Boolean(taskToEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: taskToEdit || emptyValues,
  });

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7">
      {/* Form Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {isEditMode ? "Edit Question" : "Add New Question"}
          </h2>
          <p className="mt-2 text-sm leading-5 text-slate-500">
            {isEditMode
              ? "Update the details of your question."
              : "Add a question to your interview preparation tracker."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={19} />
        </button>
      </div>

      {/* Question Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Question Title */}
        <div>
          <label
            htmlFor="question"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Question Title
          </label>

          <input
            {...register("question", {
              required: "Question is required",
              // sirf spaces wala question bhi reject hoga
              validate: (v) => v.trim() !== "" || "Question cannot be empty",
            })}
            id="question"
            type="text"
            placeholder="Enter a question"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
          {errors.question && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Select Category
          </label>

          <select
            {...register("category", { required: "Please select a category" })}
            id="category"
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="">Select a category</option>
            <option value="DSA">DSA</option>
            <option value="GIT">Git</option>
            <option value="TECHNICAL">Technical</option>
          </select>
          {errors.category && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor="difficulty"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Select Difficulty
          </label>

          <select
            {...register("difficulty", {
              required: "Please select a difficulty",
            })}
            id="difficulty"
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="">Select a difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.difficulty.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Select Status
          </label>

          <select
            {...register("status", { required: "Please select a status" })}
            id="status"
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="">Select a status</option>
            <option value="PENDING">Pending</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          {errors.status && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-1/3"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:flex-1"
          >
            {isEditMode ? "Update Task" : "Add Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
