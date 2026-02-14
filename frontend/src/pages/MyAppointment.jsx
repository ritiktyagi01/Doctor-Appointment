import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { backendURL } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const { getToken, isSignedIn } = useAuth();
  const Navigate = useNavigate();

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
  const getAppointmentData = async () => {
    try {
      const token = await getToken();
      console.log(token);

      const { data } = await axios.post(
        `${backendURL}/api/user/list-appointments`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log("Full Response:", data);

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log("Appointments:", data.appointments);
        // toast.success("List of Appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!appointmentId) return; // safety guard

    try {
      const token = await getToken();

      const { data } = await axios.post(
        `${backendURL}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getAppointmentData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // console.log(appointments)
  const fetchData = async () => {
    if (!isSignedIn) return;

    const token = await getToken();
    if (!token) return;

    getAppointmentData(token);
  };
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      reciept: order.reciept,
      handler: async (response) => {
        console.log(response);
        try {
          const token = await getToken();
          const { data } = await axios.post(
            `${backendURL}/api/user/verify-payment`,
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (data.success) {
            getAppointmentData();
            Navigate("/my-appointments");
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (appointmentId) => {
    try {
      console.log("appointmentId", appointmentId);
      const token = await getToken();

      const { data } = await axios.post(
        `${backendURL}/api/user/payment-razorpay`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        console.log("order", data.order);
        initPay(data.order);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isSignedIn]);

  const slugify = (text) => text.replace(/\s+/g, "-");

  return (
    <div>
      <p className="text-2xl font-semibold text-gray-600 border-b border-gray-200 pb-5">
        My Appointments
      </p>

      {appointments && appointments.length > 0 ? (
        <div className="gap-5 pt-5 text-xl">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row gap-2 md:gap-4 py-5
          border-t border-b border-gray-300"
            >
              <div className="md:w-1/4 flex justify-center md:items-end">
                <img
                  className="w-35 sm:w-40 md:w-50 bg-blue-50 rounded"
                  src={item.docData?.image}
                  alt={item.docData?.speciality}
                />
              </div>

              <div className="flex-1 text-gray-600 text-sm sm:text-base flex flex-col gap-2">
                <p className="text-black text-lg font-medium">
                  {item.docData?.name}
                </p>
                <p>{item.docData?.speciality}</p>

                <div className="mt-3">
                  <p className="font-medium text-gray-700">Address:</p>
                  <p>{item.docData?.address?.line1}</p>
                  <p>{item.docData?.address?.line2}</p>
                </div>

                <p className="mt-2">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-48 md:items-end md:justify-center">
                {item.payment
                  ? !item.cancelled &&
                    item.payment && (
                      <button className="sm:min-w-48 py-2 px-4  bg-green-600 text-white  border border-green-700 rounded-md font-semibold hover:bg-green transition-all duration-200">
                        Paid
                      </button>
                    )
                  : !item.cancelled && (
                      <button
                        onClick={() => paymentRazorpay(item._id)}
                        className="w-full border text-sm h-10 rounded-md
                bg-blue-100 text-gray-700 font-semibold
                hover:bg-indigo-600 hover:text-white
                transition-all duration-200"
                      >
                        Pay here
                      </button>
                    )}

                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="w-full border text-sm h-10 rounded-md
                text-gray-700 font-semibold
                hover:bg-red-500 hover:text-white
                transition-all duration-200"
                  >
                    Cancel appointment
                  </button>
                )}

                {item.cancelled && (
                  <button
                    disabled
                    className="sm:min-w-48 text-red-500 border border-red-400 rounded-sm"
                  >
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-60 flex items-center justify-center ">
          <p className="text-5xl text-gray-400 font-bold">No Appointments</p>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
