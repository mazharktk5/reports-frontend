import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register(formData); // use API helper
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    const fields = [
        { name: "name", type: "text", placeholder: "Name", value: formData.name, icon: <FaUser /> },
        { name: "email", type: "email", placeholder: "Email", value: formData.email, icon: <FaEnvelope /> },
        { name: "password", type: "password", placeholder: "Password", value: formData.password, icon: <FaLock /> },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
            <AuthForm
                title="Register"
                fields={fields}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Register"
                error={error}
                linkText="Already have an account? Login"
                linkTo="/login"
            />
        </div>
    );
};

export default RegisterPage;
