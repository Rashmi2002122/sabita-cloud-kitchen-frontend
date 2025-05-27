import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        department: "",
        salary: "",
        permanentAddress: "",
        currentAddress: "",
        file: null,
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
        setFormData({ ...formData, file: files[0] });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};


    const handleSubmit = async (e) => {
        e.preventDefault();

         const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("middleName", formData.middleName);
    data.append("lastName", formData.lastName);
    data.append("dob", formData.dob);
    data.append("department", formData.department);
    data.append("salary", formData.salary);
    data.append("permanentAddress", formData.permanentAddress);
    data.append("currentAddress", formData.currentAddress);
    data.append("file", formData.file);

        try {
            const response = await axios.post(`${base_url}/add`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage(`✅ Success: ${response.data}`);
            setFormData({
                firstName: "",
                middleName: "",
                lastName: "",
                dob: "",
                department: "",
                salary: "",
                permanentAddress: "",
                currentAddress: "",
                file: null,
            });
            setErrors({});
        } catch (error) {
            setMessage("❌ Error submitting form");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Employee Signup Form</h2>
            {message && <p className="mb-4 text-center text-lg font-medium text-green-600">{message}</p>}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block font-medium mb-1">First Name</label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-style"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Middle Name</label>
                        <input
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="input-style"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Last Name</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="input-style"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="input-style"
                        />
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Department</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="input-style"
                        >
                            <option value="">Select</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Support">Support</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                        </select>
                        {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Salary</label>
                    <input
                        name="salary"
                        type="number"
                        min="0"
                        value={formData.salary}
                        onChange={handleChange}
                        className="input-style"
                    />
                    {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-1">Permanent Address</label>
                        <textarea
                            name="permanentAddress"
                            value={formData.permanentAddress}
                            onChange={handleChange}
                            className="input-style h-24"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Current Address</label>
                        <textarea
                            name="currentAddress"
                            value={formData.currentAddress}
                            onChange={handleChange}
                            className="input-style h-24"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Upload ID Proof (PDF only)</label>
                    <input
                        type="file"
                        name="file"
                        accept="application/pdf"
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded px-3 py-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
           <p className="mt-4 text-sm text-center text-gray-600">
           have an account? <Link to="/" className="text-blue-500 hover:underline">Log in</Link>
        </p>
        </div>
    );
};

export default Signup;
