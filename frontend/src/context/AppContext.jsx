// src/context/AppContext.jsx
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";


export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
const [userData, setUserData] = useState({
  name: "",
  image: "",
  email: "",
  phone: "",
  address: {
    line1: "",
    line2: ""
  },
  gender: "",
  dob: ""
});
const { getToken } = useAuth();
  

  const getUserProfile= async()=>{
    const token = await getToken();
      if (!token) return;
    try{
      const {data} = await axios.get(`${backendURL}/api/user/get-profile`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if(data.success){
    setUserData(data.userData)
    toast.success(data.message)  }

    }
    catch (error) {
      console.log(error);
    }

  };
const updateUserProfile = async () => {
  try {
    const token = await getToken();
    if (!token) return;

    const payload = {
      phone: userData.phone,
      address: JSON.stringify(userData.address),
      dob: userData.dob,
      gender: userData.gender,
    };

    console.log("Sending:", payload);
    

    const { data } = await axios.post(
      `${backendURL}/api/user/update-profile`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", data);

    if (data.success) {
      toast.success(data.message);
    }
    else{
      toast.error(data.message)
    }

  } catch (error) {
    console.log(error);
  }
};


 const { isSignedIn } = useAuth();

useEffect(() => {
  if (isSignedIn) {
    getUserProfile();
  }
}, [isSignedIn]);

 

  const getAlldoctor = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/doctor/list`,{}, );

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
  const value = { doctors, setDoctors, getAlldoctor,backendURL,getUserProfile,userData,setUserData,updateUserProfile };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
