import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart2, FileText, Users, PieChart, LogOut, Menu } from "lucide-react";

const AdminNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { to: "/admin/dashboard", label: "Dashboard", icon: <BarChart2 size={18} /> },
        { to: "/admin/reports", label: "Reports", icon: <FileText size={18} /> },
        { to: "/admin/users", label: "Users", icon: <Users size={18} /> },

    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold">Admin Panel</h1>

                {/* Desktop Links */}
                <nav className="hidden md:flex space-x-4">
                    {links.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-1 px-3 py-2 rounded-md transition ${location.pathname === to ? "bg-gray-700" : "hover:bg-gray-800"}`}
                        >
                            {icon} <span>{label}</span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center p-2 rounded-md hover:bg-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="md:hidden bg-gray-900 px-4 pb-4 space-y-2">
                    {links.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-1 px-3 py-2 rounded-md transition ${location.pathname === to ? "bg-gray-700" : "hover:bg-gray-800"}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {icon} <span>{label}</span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition w-full"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </nav>
            )}
        </header>
    );
};

export default AdminNavbar;
