import React from "react";

const AuthForm = ({ title, fields, onChange, onSubmit, submitLabel, error, linkText, linkTo }) => {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">{title}</h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</div>
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                {fields.map(({ name, type, placeholder, value, icon }) => (
                    <div className="relative" key={name}>
                        {icon && <span className="absolute left-3 top-3 text-gray-400">{icon}</span>}
                        <input
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            className="pl-10 pr-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors mt-2 w-full"
                >
                    {submitLabel}
                </button>
            </form>

            {linkText && linkTo && (
                <p className="mt-4 text-center text-gray-600">
                    {linkText.split("?")[0]}{' '}
                    <a href={linkTo} className="text-blue-600 hover:underline font-semibold">
                        {linkText.split("?")[1]}
                    </a>
                </p>
            )}
        </div>
    );
};

export default AuthForm;
