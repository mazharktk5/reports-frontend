import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal"; // import your modal

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((u) => u.id !== id));
            toast.success("User deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete user");
        } finally {
            setConfirmDeleteId(null);
        }
    };

    if (loading) return <p className="text-gray-500">Loading users...</p>;

    return (
        <div className="p-4 sm:p-6 relative">
            <ToastContainer position="top-right" autoClose={3000} />

            <h2 className="text-2xl font-semibold mb-4 sm:mb-6">All Users</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-3 sm:px-4">ID</th>
                            <th className="py-2 px-3 sm:px-4">Name</th>
                            <th className="py-2 px-3 sm:px-4">Email</th>
                            <th className="py-2 px-3 sm:px-4">Role</th>
                            <th className="py-2 px-3 sm:px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-3 sm:px-4">{u.id}</td>
                                <td className="py-2 px-3 sm:px-4">{u.name}</td>
                                <td className="py-2 px-3 sm:px-4 break-words max-w-xs">{u.email}</td>
                                <td className="py-2 px-3 sm:px-4 capitalize">{u.role}</td>
                                <td className="py-2 px-3 sm:px-4">
                                    <button
                                        onClick={() => setConfirmDeleteId(u.id)}
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
                    message="Are you sure you want to delete this user?"
                    onConfirm={() => deleteUser(confirmDeleteId)}
                    onCancel={() => setConfirmDeleteId(null)}
                />
            )}
        </div>
    );
};

export default UsersTable;
