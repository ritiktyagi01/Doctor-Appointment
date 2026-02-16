import React from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";


const DoctorDashboard = () => {
  const { dtoken, dashboardData, dashData,setdashData, cancelAppointment ,completeAppointment} =useContext(DoctorContext);
  console.log(dashData);
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dataArray = slotDate.split("-");
    return (
      dataArray[0] + "-" + months[Number(dataArray[1])] + "-" + dataArray[2]
    );
  };
  useEffect(() => {
    if (dtoken) {
      dashboardData();
    }
  }, [dtoken]);
  return (
    <>
      <div className="mx-8">
        {/* statistics */}
        <div className="flex flex-wrap md:flex-row gap-5  items-center">
          <div className="bg-white mt-5  w-60  py-5  flex  pl-5 gap-5 rounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.earning_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">{dashData.earnings}</h1>
              <p className="text-gray-400 text-sm">Earning</p>
            </div>
          </div>

          <div className="bg-white mt-5  w-60 py-5  flex pl-5 gap-5 rounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.appointments_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">{dashData.appointments}</h1>
              <p className="text-gray-400 text-sm">Appointments</p>
            </div>
          </div>

          <div className="bg-white mt-5  w-60 py-5  flex pl-5 gap-5 rounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.patients_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">{dashData.patients}</h1>
              <p className="text-gray-400 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* latest appointment */}
        <div className="bg-white mt-8 py-5 px-5 border border-gray-300 rounded-lg shadow-md">
          <div className=" flex gap-2 mb-2">
            <img src={assets.list_icon} alt="" />
            <p className=" font-medium">Latests Appointments</p>
          </div>
          <hr />
          <div className=" border mt-5 border-gray-300 shadow-sm">
            {dashData?.latestAppointment?.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-12"
                  src={item.userData?.image || "/default-avatar.png"}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData?.name || "Unknown Doctor"}
                  </p>
                  <p className="text-gray-600 ">
                    {" "}
                    Booking on {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
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
      </div>
    </>
  );
}

export default DoctorDashboard;