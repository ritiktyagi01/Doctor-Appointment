import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { token, appointment, getAllAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getAllAppointment();
    }
  }, [token]);
  console.log("appointment",appointment)
  console.log(appointment.userData)

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

              <p>
  {item.userData?.dob
    ? calculateAge(item.userData.dob)
    : "-"}
</p>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAppointments;
