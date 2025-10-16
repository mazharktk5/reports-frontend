import React from "react";

const ReportForm = ({ formData, onChange, onSubmit, submitLabel }) => (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
            type="date"
            name="date"
            value={formData.date}
            onChange={onChange}
            className="border px-3 py-2 rounded w-full"
            required
        />
        <textarea
            name="tasks"
            value={formData.tasks}
            onChange={onChange}
            placeholder="Tasks worked on"
            className="border px-3 py-2 rounded w-full"
            required
        />
        <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={onChange}
            className="border px-3 py-2 rounded w-full"
            required
        />
        <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={onChange}
            className="border px-3 py-2 rounded w-full"
            required
        />
        <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 w-full"
        >
            {submitLabel}
        </button>
    </form>
);

export default ReportForm;
