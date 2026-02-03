import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const Navbar = () => {

  // const [token, setToken] = useState(true);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const { signOut } = useClerk();
  const { openUserProfile } = useClerk();

  return (
    <div className="backdrop-blur-2xl flex justify-between items-center text-sm py-4 mb-5 border-b border-gray-400">

      {/* Logo */}
      <NavLink to="/">
        <img

          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-44 cursor-pointer"
        />
      </NavLink>

      {/* Menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium text-xl">

        {[
          { name: "Home", path: "/" },
          { name: "All Doctors", path: "/doctors" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center"
          >
            {({ isActive }) => (
              <>
                <li className="py-1">{item.name}</li>
                <hr
                  className={`h-0.5 w-3/5 bg-primary border-none transition-all duration-300 ${isActive ? "block" : "hidden"
                    }`}
                />
              </>
            )}
          </NavLink>
        ))}

      </ul>

      {/* Button */}
      {
        user ? (
          <div className="flex items-center gap-4 relative z-50">

               {/* Clerk Avatar */}
            <UserButton afterSignOutUrl="/" />

            {/* Custom Dropdown */}
            <div className="relative ">
              <button
                onClick={() => setOpen(!open)}
                
                className="border px-4 py-2  rounded-full bg-blue-50 text-sm hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 flex items-center gap-2"
              >
                Menu
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-30">
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
                      Navigate("/my-appointments");
                      setOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
                  >
                    My Appointments
                  </p>

                  <p
                    onClick={async () => {
                      console.log("logout")
                      await signOut({ redirectUrl: "/" });
                      setOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 "
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
            className="flex items-center gap-2 rounded-full text-sm sm:text-base cursor-pointer bg-primary text-white px-6 py-2 sm:px-10 sm:py-2.5 active:scale-95"
          >
            Get started
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        )
      }


    </div>
  )
}

export default Navbar
