import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);

  const handleLogout = () => {
    setToken(null);
    setDtoken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("dtoken");
    navigate("/login");
  };

  const role = token ? "Admin" : dtoken ? "Doctor" : null;

  return (
    <div className="flex justify-between mx-auto items-center py-2 px-4 border-b border-gray-400">
      <div className="flex items-center gap-4">
        <img
          onClick={() =>
            role === "Admin"
              ? navigate("/admin/dashboard")
              : role === "Doctor"
              ? navigate("/doctor/dashboard")
              : navigate("/login")
          }
          className="w-32 sm:w-44 cursor-pointer"
          src={assets.admin_logo}
          alt="logo"
        />

        {role && (
          <p className="border rounded-full flex justify-center w-20 text-sm text-gray-600">
            {role}
          </p>
        )}
      </div>

      {role ? (
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 rounded-full bg-primary text-white px-6 py-2 cursor-pointer text-sm"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="hidden md:flex text-sm items-center gap-2 rounded-full bg-primary text-white px-6 py-2 cursor-pointer"
        >
          Get Started <ArrowRightIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
