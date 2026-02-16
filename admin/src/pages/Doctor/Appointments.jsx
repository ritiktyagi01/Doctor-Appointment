import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Appointments = () => {
  const {
    dtoken,
    appointment,
    getAppointment,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  // console.log(dtoken);

  useEffect(() => {
    if (dtoken) {
      getAppointment();
    }
  }, [dtoken]);

  useEffect(() => {
    // console.log("appointment", appointment);
  }, [appointment]);

  return (
    <>
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointmnets</p>
        <div className="bg-white test-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
          <div className=" hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
            <p>#</p>
            <p>Patients</p>
            <p >Payment   </p>
            <p>Age</p>
            <p>Date & Time</p>
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

              <div>
                <span className="text-sm border border-primary px-2  rounded-full">
                  {item.payment ? "ONLINE" : "CASH"}
                </span>
              </div>


              <p className="max-sm:hidden ">
                {item.userData?.dob ? calculateAge(item.userData.dob) : "-"}
              </p>
              <p>
                {slotDateFormat(item.slotDate)},{item.slotTime}
              </p>

              <p>
                <span>$</span>
                {item.amount}
              </p>

              {item.cancelled ? (
                <p className="text-sm text-red-400 font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-sm text-green-400 font-medium">Completed</p>
              ) : (
                <div className="flex ">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Appointments;
