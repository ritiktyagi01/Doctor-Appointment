import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { token, setToken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);

  const handleLogout = () => {
    setToken(null);
    setDtoken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("dtoken");
    navigate("/login");
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-7 py-3 cursor-pointer 
     ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : "border-r-4 border-transparent"}`;

  return (
    <>
      {/* Mobile Button */}
      <button
        className="md:hidden fixed top-1 right-4 z-50 bg-primary text-white px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 z-50 min-h-screen w-64 bg-white border-r
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <ul className="text-[#515151] mt-16 md:mt-5">
          {/* ADMIN LINKS */}
          {token && (
            <>
              <NavLink to="/admin/dashboard" className={linkClass}>
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>

              <NavLink to="/admin/all-appointments" className={linkClass}>
                <img src={assets.appointment_icon} alt="" />
                <p>Appointments</p>
              </NavLink>

              <NavLink to="/admin/add-doctor" className={linkClass}>
                <img src={assets.add_icon} alt="" />
                <p>Add Doctor</p>
              </NavLink>

              <NavLink to="/admin/doctors-list" className={linkClass}>
                <img src={assets.people_icon} alt="" />
                <p>Doctor List</p>
              </NavLink>
            </>
          )}

          {/* DOCTOR LINKS */}
          {dtoken && (
            <>
              <NavLink to="/doctor/dashboard" className={linkClass}>
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>

              <NavLink to="/doctor/appointments" className={linkClass}>
                <img src={assets.appointment_icon} alt="" />
                <p>Appointments</p>
              </NavLink>

              <NavLink to="/doctor/patients" className={linkClass}>
                <img src={assets.people_icon} alt="" />
                <p>Patients</p>
              </NavLink>
              <NavLink to="/doctor/profile" className={linkClass}>
                <img src={assets.people_icon} alt="" />
                <p>Profile</p>
              </NavLink>
            </>
          )}
        </ul>

        <div className="absolute bottom-0 w-full border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-4 text-red-600 font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
