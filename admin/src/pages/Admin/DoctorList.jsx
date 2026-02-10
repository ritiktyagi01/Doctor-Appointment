import React, { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorList = () => {
  const { doctors } = useContext(DoctorContext);
  return (
    <>
      <div className="px-8 py-6">
        <h1 className="text-md font-medium"> All Doctors </h1>
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 py-8">
  {doctors.slice(0, 10).map((item, index) => (
    <div
      key={index}
      className="border border-blue-200 cursor-pointer overflow-hidden
                 hover:-translate-y-2.5 transition-all duration-200
                 rounded-lg shadow-lg bg-white"
    >
      {/* Image wrapper */}
      <div className="w-full aspect-3.5/3 bg-[#EAEFFF] flex items-center justify-center">
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
      </div>
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default DoctorList;
