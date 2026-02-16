import { createContext } from "react";
import { doctors } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

export const DoctorContext = createContext();
const DoctorContextProvider = ({ children }) => {
  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dtoken")
      ? localStorage.getItem("dtoken")
      : localStorage.getItem(""),
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointment, setAppointment] = useState([]);
  // console.log(dtoken);
  const [dashData, setdashData] = useState({
    earnings: 0,
    appointment: 0,
    patients: 0,
    latestAppointment: [],
  });
  const [doctorData, setdoctorData] = useState({
    name: "",
    image: "",
    email: "",
    speciality: "",
    address: {
      line1: "",
      line2: "",
    },
    experience: "",
    about: "",
  });
 const [patients, setPatients] = useState([]);

  //Api hit for get appointment
  const getAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        },
      );

      if (data.success) {
        setAppointment(data.appointments);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //Api hit for appointmentcomplete
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/appointment-completed`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        // console.log(data.message);
        getAppointment();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //Api hit for appointment cancel
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/appointment-cancelled`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        getAppointment();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //api to get the dashboard
  const dashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: {
          Authorization: `Bearer ${dtoken}`,
        },
      });

      if (data.success) {
        setdashData(data.dashData);
        // console.log("data", data.dashData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //api to get doctor profile
  const doctorProfile = async () => {
    try {
       
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${dtoken}`,
        },
      });
      if (data.success) {
        setdoctorData(data.profileData);
        toast.success(data.message);
        // console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //api to update profile
  const updateProfile = async () => {
    try {
      const payload = {
        speciality: doctorData.speciality,
        address: JSON.stringify(doctorData.address),
        experience: doctorData.experience,
        about: doctorData.about,
      };

      console.log("Sending:", payload);
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        },
      );
      if (data.success) {
        setdoctorData(data.doctorData);
        toast.success(data.message);
        // console.log(data.message);
        doctorProfile();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getPatients = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/doctor/patients`,
      {
        headers: {
          Authorization: `Bearer ${dtoken}`,
        },
      }
    );

    if (data.success) {
      setPatients(data.patients);
    }
  } catch (error) {
    console.log(error);
  }
};


  const value = {
    setDtoken,
    dtoken,
    backendUrl,
    setAppointment,
    appointment,
    getAppointment,
    completeAppointment,
    cancelAppointment,
    dashboardData,
    dashData,
    setdashData,
    doctorProfile,
    updateProfile,
    doctorData,
    patients,
getPatients,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
