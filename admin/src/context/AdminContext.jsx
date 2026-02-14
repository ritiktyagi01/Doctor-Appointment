import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : localStorage.getItem(""),
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [dashData, setdashData] = useState({
    doctor: 0,
    user: 0,
    appointment: 0,
    latestAppointment: [],
  });

  const getAllDoctor = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setDoctors(data.doctors);
        // console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/check-availablity`,
        {
          docId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        getAllDoctor();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const getAllAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/all-appointment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        setAppointment(data.appointmentData);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/appointment-canncel`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const dashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setdashData(data.dashData);
        console.log("data", data.dashData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    token,
    setToken,
    backendUrl,
    getAllDoctor,
    doctors,
    setDoctors,
    changeAvailability,
    getAllAppointment,
    appointment,
    setAppointment,
    cancelAppointment,
    dashboardData,
    dashData,
    setdashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
export default AdminContextProvider;
