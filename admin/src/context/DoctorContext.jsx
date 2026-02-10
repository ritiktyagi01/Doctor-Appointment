import { createContext } from "react";
import { doctors } from "../assets/assets";

export const DoctorContext = createContext();
const DoctorContextProvider = ({ children }) => {
  const value = {
    doctors,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
