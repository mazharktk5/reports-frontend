import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [totalReports, setTotalReports] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };
                const [reportsRes, usersRes] = await Promise.all([
                    axios.get("http://localhost:3000/admin/reports/count", { headers }),
                    axios.get("http://localhost:3000/admin/users/count", { headers }),
                ]);
                setTotalReports(reportsRes.data.count);
                setTotalUsers(usersRes.data.count);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p className="text-gray-500">Loading...</p>;

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white shadow p-6 rounded-lg flex flex-col items-center">
                    <h3 className="text-lg font-medium mb-2">Total Reports</h3>
                    <p className="text-3xl font-bold">{totalReports}</p>
                </div>
                <div className="bg-white shadow p-6 rounded-lg flex flex-col items-center">
                    <h3 className="text-lg font-medium mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
