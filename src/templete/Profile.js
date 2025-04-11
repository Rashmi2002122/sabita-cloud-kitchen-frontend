import React from "react";

const Profile = ({ user, toggleProfile }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4">
      <button
        onClick={toggleProfile}
        className="text-gray-500 hover:text-gray-700 mb-4"
      >
        Close
      </button>
      <div className="flex flex-col items-center">
        <img
          src={user.picture || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600 mb-6">{user.email}</p>
        <ul className="space-y-4">
          <li>
            <a href="#" className="block text-gray-700 hover:text-gray-900">
              Info
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-700 hover:text-gray-900">
              Order
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-700 hover:text-gray-900">
              Location
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-700 hover:text-gray-900">
              Payment
            </a>
          </li>
          <li>
            <a href="#" className="block text-red-500 hover:text-red-700">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
