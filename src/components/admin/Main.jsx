import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import Dashboard from "./components/Dashboard";
import ReportsTable from "./components/ReportsTable";
import UsersTable from "./components/UsersTable";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <AdminNavbar />

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6">
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reports" element={<ReportsTable />} />
                    <Route path="/users" element={<UsersTable />} />
                </Routes>
            </main>
        </div>
    );
};

export default Main;
