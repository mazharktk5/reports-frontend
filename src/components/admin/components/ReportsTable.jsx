import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal"; // import here

const ReportsTable = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

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
            toast.error("Failed to fetch reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const deleteReport = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/admin/reports/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReports(reports.filter((r) => r.id !== id));
            toast.success("Report deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete report");
        } finally {
            setConfirmDeleteId(null);
        }
    };

    const exportToCSV = () => {
        if (reports.length === 0) return toast.info("No reports to export.");

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
        toast.success("CSV exported successfully");
    };

    if (loading) return <p className="text-gray-500">Loading reports...</p>;

    return (
        <div className="p-4 sm:p-6 relative">
            <ToastContainer position="top-right" autoClose={3000} />
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
                            <th className="py-2 px-3 sm:px-4">Actions</th>
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
                                <td className="py-2 px-3 sm:px-4">
                                    <button
                                        onClick={() => setConfirmDeleteId(r.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {confirmDeleteId && (
                <ConfirmationModal
                    message="Are you sure you want to delete this report?"
                    onConfirm={() => deleteReport(confirmDeleteId)}
                    onCancel={() => setConfirmDeleteId(null)}
                />
            )}
        </div>
    );
};

export default ReportsTable;
