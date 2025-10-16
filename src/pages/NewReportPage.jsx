import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { createReport } from "../services/api"; // use helper
import ReportForm from "../components/ReportForm";

const CreateReport = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: "",
        tasks: "",
        startTime: "",
        endTime: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const token = getToken();
            await createReport(token, formData); // using API helper
            navigate("/"); // go back to dashboard
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create report");
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-md mx-auto flex flex-col justify-center bg-white rounded-xl shadow-md w-full">
            <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
                Create New Report
            </h2>
            {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
            <ReportForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Save Report"
            />
        </div>
    );
};

export default CreateReport;
