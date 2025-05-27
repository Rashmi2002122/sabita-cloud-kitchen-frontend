import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    loginId: "",
    dobFrom: "",
    dobTo: "",
    department: "",
  });
  const [results, setResults] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = {};
    for (const key in filters) {
      if (filters[key]) {
        params[key] = filters[key];
      }
    }

    try {
      const response = await axios.get(`${base_url}/find`, {
        params,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    }
  };

  const handleView = (emp) => {
    alert("Viewing Employee:\n" + JSON.stringify(emp, null, 2));
  };

  const handleEdit = (emp) => {
    navigate(`/edit/${emp.employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${base_url}/employees/${employeeId}`);
        setResults((prev) => prev.filter((e) => e.employeeId !== employeeId));
        alert("Employee deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleHistory = (employeeId) => {
    alert(`History functionality for employee ID ${employeeId} triggered.`);
    
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
        Employee Search Filter
      </h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-md"
      >
        {[
          { name: "employeeId", label: "Employee ID", type: "text" },
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
          { name: "loginId", label: "Login ID", type: "text" },
          { name: "dobFrom", label: "Date of Birth (From)", type: "date" },
          { name: "dobTo", label: "Date of Birth (To)", type: "date" },
        ].map((input) => (
          <div key={input.name}>
            <label className="block font-semibold text-gray-600">
              {input.label}
            </label>
            <input
              type={input.type}
              name={input.name}
              value={filters[input.name]}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder={`Enter ${input.label}`}
            />
          </div>
        ))}

        <div>
          <label className="block font-semibold text-gray-600">
            Department
          </label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Support">Support</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Search Results
        </h3>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Employee ID</th>
                <th className="px-4 py-3 text-left">First Name</th>
                <th className="px-4 py-3 text-left">Last Name</th>
                <th className="px-4 py-3 text-left">Login ID</th>
                <th className="px-4 py-3 text-left">Date of Birth</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No results found.
                  </td>
                </tr>
              ) : (
                results.map((emp, index) => (
                  <tr
                    key={emp.employeeId}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2">{emp.employeeId}</td>
                    <td className="px-4 py-2">{emp.firstName}</td>
                    <td className="px-4 py-2">{emp.lastName}</td>
                    <td className="px-4 py-2">{emp.loginId}</td>
                    <td className="px-4 py-2">{emp.dob}</td>
                    <td className="px-4 py-2">{emp.department}</td>
                    <td className="px-4 py-2 relative">
                      <div className="group inline-block">
                        <button className="bg-gray-200 px-3 py-1 rounded  hover:bg-gray-300">
                          Actions ▾
                        </button>
                        <div className="absolute hidden group-hover:block bg-white border mt-1 rounded shadow-md z-10 w-32">
                          <button
                            onClick={() => handleView(emp)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(emp)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(emp.employeeId)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleHistory(emp.employeeId)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            History
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
