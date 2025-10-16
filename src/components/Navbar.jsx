import React, { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaTasks, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { getToken, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = getToken();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo / Title */}
                <div
                    className="flex items-center gap-2 font-bold text-2xl cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(token ? '/' : '/login')}
                >
                    <FaTasks size={28} />
                    Daily Reports
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-3">
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <FaSignInAlt />
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <FaUserPlus />
                                Register
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-2">
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => { navigate('/login'); setMenuOpen(false); }}
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <FaSignInAlt />
                                Login
                            </button>
                            <button
                                onClick={() => { navigate('/register'); setMenuOpen(false); }}
                                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <FaUserPlus />
                                Register
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
