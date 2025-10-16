import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../utils/auth";
import { getMyReports, editReport } from "../services/api";
import ReportForm from "../components/ReportForm";

const EditReport = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        date: "",
        tasks: "",
        startTime: "",
        endTime: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = getToken();
                const res = await getMyReports(token);
                const report = res.data.find((r) => r.id === parseInt(id));
                if (!report) throw new Error("Report not found");

                setFormData({
                    date: new Date(report.date).toISOString().split("T")[0],
                    tasks: report.tasks,
                    startTime: new Date(report.startTime).toLocaleTimeString("en-GB", { hour12: false }),
                    endTime: new Date(report.endTime).toLocaleTimeString("en-GB", { hour12: false }),
                });
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const token = getToken();
            await editReport(token, id, formData);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update report");
        }
    };

    if (loading) return <p className="p-4 text-gray-500">Loading report...</p>;

    return (
        <div className="p-4 sm:p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Edit Report</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <ReportForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Update Report"
            />
        </div>
    );
};

export default EditReport;
