import React from "react";
import { FaEdit } from "react-icons/fa";

const ReportCard = ({ report, onEdit }) => {
    return (
        <div className="flex flex-col justify-between p-4 bg-white shadow rounded-lg h-full">
            <div className="mb-4">
                <p className="font-semibold text-gray-800">{new Date(report.date).toLocaleDateString()}</p>
                <p className="text-gray-600">{report.tasks}</p>
                <p className="text-gray-400 text-sm mt-1">
                    {new Date(report.startTime).toLocaleTimeString()} - {new Date(report.endTime).toLocaleTimeString()}
                </p>
            </div>
            <button
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors w-full"
                onClick={() => onEdit(report.id)}
            >
                <FaEdit className="mr-1" /> Edit
            </button>
        </div>
    );
};

export default ReportCard;
