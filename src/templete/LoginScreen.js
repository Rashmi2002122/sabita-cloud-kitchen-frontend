import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../SpringBootAPI";


function Login() {
  const [formData, setFormData] = useState({
    employeeID: "",
    loginId: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const employeeID = form.employeeID.value;
    const loginId = form.loginId.value;

    try {
      const response = await axios.get(`${base_url}/login`, {
        params: {
          employeeID: employeeID,
          loginID: loginId,
        },
      });

      setMessage(
        `✅ Success: Welcome ${response.data?.firstName || "employee"}`
      );
      window.location.href = "/main";
      setErrors({});
    } catch (error) {
      console.error(error);
      setMessage("❌ Invalid login credentials");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {message && (
          <p className="text-center mb-4 text-sm text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeID"
              value={formData.employeeID}
              onChange={handleChange}
              required
              placeholder="Enter your employee ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login ID
            </label>
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              required
              placeholder="Enter your login ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
