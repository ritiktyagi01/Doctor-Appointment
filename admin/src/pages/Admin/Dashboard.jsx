import React from "react";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  return (
    <>
      <div className="mx-8">
        {/* statistics */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="bg-white mt-5  w-60 py-5  flex  pl-5 gap-5 reounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.doctor_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">14</h1>
              <p className="text-gray-400 text-sm">Doctors</p>
            </div>
          </div>

          <div className="bg-white mt-5  w-60 py-5  flex pl-5 gap-5 reounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.appointments_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">2</h1>
              <p className="text-gray-400 text-sm">Appointment</p>
            </div>
          </div>

          <div className="bg-white mt-5  w-60 py-5  flex pl-5 gap-5 reounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.patients_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">5</h1>
              <p className="text-gray-400 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* latest appointment */}
        <div className="bg-white mt-8 py-5 px-5 border border-gray-300 rounded-lg shadow-md">
          <div className=" flex gap-2 mb-2">
            <img src={assets.list_icon} alt="" />
            <p>Latests Appointments</p>
            </div>
            <hr />  
            <div className="flex flex-col mt-6  gap-4">
              <p>1256</p>
              <p>1256</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
