import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn, signOut, openUserProfile } = useClerk();
  const [open, setOpen] = useState(false);        // profile dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="backdrop-blur-2xl flex justify-between items-center px-4 py-4 border-b border-gray-400 relative z-50">

        {/* Logo */}
        <img
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-44 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-lg">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="flex flex-col items-center">
              {({ isActive }) => (
                <>
                  <li>{item.name}</li>
                  <hr
                    className={`h-0.5 w-3/5 bg-primary transition-all duration-300 ${isActive ? "block" : "hidden"
                      }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Auth */}
          {user ? (
            <div className="hidden md:flex items-center gap-4 relative">
              <UserButton afterSignOutUrl="/" />

              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="border px-4 py-2 rounded-full bg-blue-50 text-sm hover:bg-primary hover:text-white transition-all"
                >
                  Menu
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg">
                    <p
                      onClick={() => {
                        openUserProfile();
                        setOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Profile
                    </p>

                    <p
                      onClick={() => {
                        navigate("/my-appointments");
                        setOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Appointments
                    </p>

                    <p
                      onClick={async () => {
                        await signOut({ redirectUrl: "/" });
                        setOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="hidden md:flex items-center gap-2 rounded-full bg-primary text-white px-6 py-2"
            >
              Get started
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60 bg-black/40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-6 shadow-lg flex flex-col gap-6">

            <div className="flex justify-between items-center">
              <img src={assets.logo} className="w-28" />
              <X
                className="w-6 h-6 cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            </div>

            {navItems.map((item) => (
              <p
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className="text-lg font-medium  flex items-center gap-2 flex-col px-4 py-2 rounded-full transition-all duration-200 border
        hover:bg-blue-50  cursor-pointer"
              >
                {item.name}
              </p>
            ))}

            {user ? (
              <>
                <hr />
                <p onClick={openUserProfile} className="cursor-pointer">My Profile</p>
                <p onClick={() => navigate("/my-appointments")} className="cursor-pointer">
                  My Appointments
                </p>
                <p
                  onClick={async () => {
                    await signOut({ redirectUrl: "/" });
                    setMobileOpen(false);
                  }}
                  className="cursor-pointer text-red-500"
                >
                  Logout
                </p>
              </>
            ) : (
              <>
              <hr/>
              <button
              onClick={openSignIn}
              className=" md:flex items-center gap-2 rounded-full bg-primary text-white px-6 py-2 cursor-pointer"
            >
              Get started
              <ArrowRight className="w-4 h-4 inline " />
            </button>
              </>
              
          )}
              
          
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
