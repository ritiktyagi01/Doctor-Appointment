import React from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { token, dashboardData, dashData, cancelAppointment } =
    useContext(AdminContext);
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
    if (token) {
      dashboardData();
    }
  }, [token]);
  return (
    <>
      <div className="mx-8">
        {/* statistics */}
        <div className="flex flex-wrap md:flex-row gap-5  items-center">
          <div className="bg-white mt-5  w-60  py-5  flex  pl-5 gap-5 rounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.doctor_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">{dashData.doctor}</h1>
              <p className="text-gray-400 text-sm">Doctors</p>
            </div>
          </div>

          <div className="bg-white mt-5  w-60 py-5  flex pl-5 gap-5 rounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.appointments_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">{dashData.appointment}</h1>
              <p className="text-gray-400 text-sm">Appointment</p>
            </div>
          </div>

          <div className="bg-white mt-5  w-60 py-5  flex pl-5 gap-5 rounded-lg shadow-lg ">
            <img
              className="bg-white "
              src={assets.patients_icon}
              alt="doctor icon"
            />
            <div className="flex flex-col">
              <h1 className="text-xl">{dashData.user}</h1>
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
                  src={item.docData?.image || "/default-avatar.png"}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData?.name || "Unknown Doctor"}
                  </p>
                  <p className="text-gray-600 ">
                    {" "}
                    Booking on {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-sm text-red-400 font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
