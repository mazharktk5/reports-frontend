import React from "react";
import { FaPlus } from "react-icons/fa";

const DashboardHeader = ({ onNew }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blue-600">My Reports</h1>
        <button
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            onClick={onNew}
        >
            <FaPlus className="mr-2" /> New Report
        </button>
    </div>
);

export default DashboardHeader;
