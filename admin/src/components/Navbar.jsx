import React, { useContext } from 'react'
import { assets } from "../assets/assets";
import {ArrowRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const Navigate = useNavigate();
  const {token,setToken} = useContext(AdminContext);

  const handleLogout = () => {
  setToken(null);                 // remove from context
  localStorage.removeItem("token"); // remove from storage (if used)
  Navigate("/login");             // redirect
};

  return (
    <>
<div className='flex justify-between mx-auto items-center py-2 px-4 border-b border-gray-400 '>
  <div className='flex items-center gap-4'>
    <img onClick={()=> Navigate('/admin/dashboard')} className='w-32 sm:w-44 cursor-pointer' src={assets.admin_logo} alt="logo" />
    <p className='border rounded-full flex justify-center w-15 text-sm text-gray-600'>{token?'Admin':'Doctor'}</p>
  </div>
    {
  token ? (
    <button
      onClick={handleLogout}
      className="hidden text-sm md:flex items-center gap-2 rounded-full bg-primary text-white px-6 py-2 cursor-pointer"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => Navigate("/login")}
      className="hidden md:flex text-sm items-center gap-2 rounded-full bg-primary text-white px-6 py-2 cursor-pointer"
    >
      Get Started <ArrowRightIcon className="inline" />
    </button>
  )
}

    
    
</div>
    
    </>
  )
}

export default Navbar