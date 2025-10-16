import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { getMyReports } from "../services/api";
import DashboardHeader from "../components/DashboardHeader";
import ReportsGrid from "../components/ReportsGrid";

const Dashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchReports = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const res = await getMyReports(token);
            setReports(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch reports");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className="p-4 md:p-6">
            <DashboardHeader onNew={() => navigate("/create-report")} />
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ReportsGrid
                    reports={reports}
                    onEdit={(id) => navigate(`/edit-report/${id}`)}
                />
            )}
        </div>
    );
};

export default Dashboard;
