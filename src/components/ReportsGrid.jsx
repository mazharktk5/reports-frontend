import React from "react";
import ReportCard from "./ReportCard";

const ReportsGrid = ({ reports, onEdit }) => {
    if (reports.length === 0) return <p className="text-gray-500">No reports found.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((r) => (
                <ReportCard key={r.id} report={r} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default ReportsGrid;
