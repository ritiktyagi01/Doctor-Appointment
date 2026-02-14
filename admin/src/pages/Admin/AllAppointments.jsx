import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { token, appointment, getAllAppointment,cancelAppointment } = useContext(AdminContext);
  const { calculateAge,slotDateFormat } = useContext(AppContext);

useEffect(() => {
  if (token) {
    getAllAppointment();
  }
}, [token]);


useEffect(() => {
  console.log("appointment", appointment);
}, [appointment]);

 

  return (
    <>
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointmnets</p>
        <div className="bg-white test-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
          <div className=" hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
            <p>#</p>
            <p>Patients</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor </p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {appointment.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300"
            >
              <p className="max-sm:hidden">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full"
                  src={item.userData?.image}
                  alt=""
                />
                <p>{item.userData?.name}</p>
              </div>

              <p className="max-sm:hidden">
                {item.userData?.dob ? calculateAge(item.userData.dob) : "-"}
              </p>
              <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
             <div className="flex items-center gap-2">
              <img
  className="w-8 rounded-full bg-gray-200"
  src={item.docData?.image}
  alt=""
/> <p>{item.docData?.name}</p>
              </div>
              <p>
                <span>$</span>
               {item.amount}
              </p>
              {
                item.cancelled?<p className="text-sm text-red-400 font-medium">Cancelled</p>:<img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt=""/>
              }

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAppointments;
