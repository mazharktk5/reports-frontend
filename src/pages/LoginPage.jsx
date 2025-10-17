import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { setToken } from "../utils/auth";
import AuthForm from "../components/AuthForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login(formData);
            setToken(res.data.token);

            const role = res.data.user.role;
            toast.success("Login successful!");
            navigate(role === "admin" ? "/admin" : "/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: "email", type: "email", placeholder: "Email", value: formData.email, icon: <FaEnvelope /> },
        { name: "password", type: "password", placeholder: "Password", value: formData.password, icon: <FaLock /> },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <AuthForm
                title="Login"
                fields={fields}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel={loading ? "Logging in..." : "Login"}
                linkText="Don't have an account? Register"
                linkTo="/register"
            />
        </div>
    );
};

export default Login;
