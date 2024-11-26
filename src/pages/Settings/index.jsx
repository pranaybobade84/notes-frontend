import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const sidebarLinks = [
  { name: "Account", to: "/settings/account" },
  { name: "Private Key", to: "/settings/private-key" },
  { name: "Access Notes", to: "/settings/verify-key" },
  { name: "Edit Profile", to: "/settings/edit-profile" },
  { name: "Reset Password", to: "/settings/reset-password" },
  { name: "Delete Account", to: "/settings/delete-account" },
];
const SidebarLink = ({ to, children }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block w-full text-left p-3 rounded-lg ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {children}
    </Link>
  );
};

const SettingsAndActivity = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-[89vh]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-100 shadow-lg p-4">
        <h1 className="text-lg font-bold text-gray-700 mb-6">Settings</h1>
        <ul className="space-y-4">
          {sidebarLinks?.map(({ name, to }) => (
            <li key={name}>
              <SidebarLink to={to}>{name}</SidebarLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 md:p-6 bg-white shadow-lg overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsAndActivity;
