import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const Patient = () => {
  const { dtoken, patients, getPatients } = useContext(DoctorContext);

  useEffect(() => {
    if (dtoken) {
      getPatients();
    }
  }, [dtoken]);
  // console.log("Patients from API:", patients);


  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Patients</p>

      <div className="w-full grid grid-cols-4 gap-4 gap-y-6">
        {patients.map((item, index) => (
          <div
            key={index}
            className="border border-blue-200 cursor-pointer overflow-hidden hover:-translate-y-2.5 transition-all duration-200"
          >
            <img className="bg-[#EAEFFF]" src={item.image} alt="" />
            <div className="p-4">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-500">{item.email}</p>
              <p className="text-gray-500">{item.phone}</p>
              <p className="text-gray-500">{item.gender}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patient;
