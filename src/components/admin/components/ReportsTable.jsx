import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportsTable = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/admin/reports", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReports(res.data);
            } catch (err) {
                console.error(err);
                alert("Failed to fetch reports");
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const exportToCSV = () => {
        if (reports.length === 0) return alert("No reports to export.");

        const headers = ["User", "Date", "Tasks", "Start Time", "End Time"];
        const rows = reports.map((r) => [
            r.user?.name || "Unknown",
            new Date(r.date).toLocaleDateString(),
            r.tasks.replace(/\n/g, " "),
            new Date(r.startTime).toLocaleTimeString(),
            new Date(r.endTime).toLocaleTimeString(),
        ]);

        const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reports.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <p className="text-gray-500">Loading reports...</p>;

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="text-2xl font-semibold">All Reports</h2>
                <button
                    onClick={exportToCSV}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Export CSV
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-3 sm:px-4">User</th>
                            <th className="py-2 px-3 sm:px-4">Date</th>
                            <th className="py-2 px-3 sm:px-4">Tasks</th>
                            <th className="py-2 px-3 sm:px-4">Start Time</th>
                            <th className="py-2 px-3 sm:px-4">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((r) => (
                            <tr key={r.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-3 sm:px-4">{r.user?.name || "Unknown"}</td>
                                <td className="py-2 px-3 sm:px-4">{new Date(r.date).toLocaleDateString()}</td>
                                <td className="py-2 px-3 sm:px-4 break-words max-w-xs">{r.tasks}</td>
                                <td className="py-2 px-3 sm:px-4">{new Date(r.startTime).toLocaleTimeString()}</td>
                                <td className="py-2 px-3 sm:px-4">{new Date(r.endTime).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportsTable;
