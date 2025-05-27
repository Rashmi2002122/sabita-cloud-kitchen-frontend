import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import base_url from "../SpringBootAPI";

const EditScreen = () => {
    const { id } = useParams(); 

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

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${base_url}/view/${id}`);
                const emp = response.data;
                setFormData({
                    firstName: emp.firstName || "",
                    middleName: emp.middleName || "",
                    lastName: emp.lastName || "",
                    dob: emp.dob || "",
                    department: emp.department || "",
                    salary: emp.salary || "",
                    permanentAddress: emp.permanentAddress || "",
                    currentAddress: emp.currentAddress || "",
                    file: null,
                });
            } catch (error) {
                console.error("Failed to load employee data:", error);
                setMessage("❌ Failed to load employee data.");
            }
        };

        fetchEmployee();
    }, [id]);

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

       
        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post(`${base_url}/update/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage(`✅ Success: ${response.data}`);
            setErrors({});
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("❌ Error submitting form");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Employee ID proof update</h2>
            {message && <p className="mb-4 text-center text-lg font-medium text-green-600">{message}</p>}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
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
                Cancel <Link to="/main" className="text-blue-500 hover:underline">Go to Main</Link>
            </p>
        </div>
    );
};

export default EditScreen;
