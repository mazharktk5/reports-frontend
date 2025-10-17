import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { createReport } from "../services/api"; // API helper
import ReportForm from "../components/ReportForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateReport = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: "",
        tasks: "",
        startTime: "",
        endTime: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const token = getToken();
            await createReport(token, formData);
            toast.success("Report created successfully!");
            navigate("/"); // redirect to dashboard
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to create report";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-md mx-auto flex flex-col justify-center bg-white rounded-xl shadow-md w-full">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
                Create New Report
            </h2>
            {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
            <ReportForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel={loading ? "Saving..." : "Save Report"}
                disabled={loading}
            />
        </div>
    );
};

export default CreateReport;
