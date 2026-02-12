import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  
 const { doctors,token,getAllDoctor, changeAvailability } = useContext(AdminContext);

 useEffect(() => {
  getAllDoctor();
 },[token])

  return (
    <>
    <div className="max-h-[90vh] m-5 overflow-y-scroll">
      <div className="pl-5">
        <h1 className="text-md font-medium"> All Doctors </h1>
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 py-8">
  {doctors.map((item, index) => (
    <div
      key={index}
      className="border border-blue-200 cursor-pointer overflow-hidden
                 hover:-translate-y-2.5 transition-all duration-200
                 rounded-lg shadow-lg bg-white"
    >
      {/* Image wrapper */}
      <div className="max-w-56 aspect-3.5/3 bg-[#EAEFFF] flex items-center justify-center">
        <img
          src={item.image}
          alt="doctor"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <p className="text-sm md:text-md font-semibold">
          {item.name}
        </p>
        <p className="text-sm md:text-md text-gray-500">
          {item.speciality}
        </p>
        <div className="flex justify-center items-center gap-2">
         <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} />
       
        <p>Available</p> 
        </div>
        
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
      
    </>


  );
};

export default DoctorList;
