import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                alert("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p className="text-gray-500">Loading users...</p>;

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-6">All Users</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-3 sm:px-4">ID</th>
                            <th className="py-2 px-3 sm:px-4">Name</th>
                            <th className="py-2 px-3 sm:px-4">Email</th>
                            <th className="py-2 px-3 sm:px-4">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-3 sm:px-4">{u.id}</td>
                                <td className="py-2 px-3 sm:px-4">{u.name}</td>
                                <td className="py-2 px-3 sm:px-4 break-words max-w-xs">{u.email}</td>
                                <td className="py-2 px-3 sm:px-4 capitalize">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;
