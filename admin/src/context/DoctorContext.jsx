import { createContext } from "react";
import { doctors } from "../assets/assets";
import { useState } from "react";

export const DoctorContext = createContext();
const DoctorContextProvider = ({ children }) => {

  const [dtoken,setDtoken]=useState(localStorage.getItem("dtoken")
      ? localStorage.getItem("dtoken")
      : localStorage.getItem(""),)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    setDtoken,dtoken,backendUrl
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
