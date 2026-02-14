
import { createContext } from "react";

export const AppContext = createContext();
const AppContextProvider= ({children})=>{
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate= new Date(dob);
        let age = today.getFullYear()-birthDate.getFullYear();
        return age
        
    }
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
    const value ={
calculateAge,
slotDateFormat
    }
    
    return (
    <AppContext.Provider value={value}>
   {children}
        </AppContext.Provider>
)
}
export default AppContextProvider;