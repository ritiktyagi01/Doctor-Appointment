import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios"

export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : localStorage.getItem(""),
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [ doctors, setDoctors ] = useState([]);

  const getAllDoctor = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const { data } = await axios.post(`${backendUrl}/api/admin/check-availablity`, {
        docId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        console.log(data.message)
        getAllDoctor()
      } else {
        toast.error(data.message);
  }
}
  
  catch(error){

  }
}
  
  const value = {
    token,
    setToken,
    backendUrl,
    getAllDoctor,
    doctors,
    setDoctors,
    changeAvailability
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
export default AdminContextProvider;
