import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaTasks, FaUserPlus } from 'react-icons/fa';
import { getToken, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = getToken();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    const buttonBaseClasses =
        'flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors text-white whitespace-nowrap';

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo / Title */}
                <div
                    className="flex items-center gap-2 font-bold text-2xl cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(token ? '/' : '/login')}
                >
                    <FaTasks size={28} />
                    Daily Reports
                </div>

                {/* Single Button */}
                {token ? (
                    <button
                        onClick={handleLogout}
                        className={`${buttonBaseClasses} bg-red-500 hover:bg-red-600`}
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className={`${buttonBaseClasses} bg-green-500 hover:bg-green-600`}
                    >
                        <FaSignInAlt />
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
