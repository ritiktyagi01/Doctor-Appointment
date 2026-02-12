// src/context/AppContext.jsx
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [token,setToken] = useState(' ')

  const getAlldoctor = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/doctor/list`,{} );

      if (data.success) {
        setDoctors(data.data);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  getAlldoctor();
}, []);
  const value = { doctors, setDoctors, getAlldoctor,token,setToken,backendURL };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
