import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(AdminContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-7 py-3 cursor-pointer 
     ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : "border-r-4 border-transparent"}`;

  return (
    <>
      {/* 🔹 Mobile Menu Button */}
      <button
        className="md:hidden fixed top-1 right-4 z-50 bg-primary text-white px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* 🔹 Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔹 Sidebar / Menu */}
      <div
        className={`fixed md:static top-0 left-0 z-50 min-h-screen w-64 bg-white border-r
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <ul className="text-[#515151] mt-16 md:mt-5">
          <NavLink onClick={() => setOpen(false)} to="/admin/dashboard" className={linkClass}>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/all-appointments" className={linkClass}>
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/add-doctor" className={linkClass}>
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/doctors-list" className={linkClass}>
            <img src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>

        {/* 🔴 Logout (mobile only) */}
        <div className="absolute bottom-0 w-full md:hidden border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center text-left px-4 py-4 text-red-600 font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
