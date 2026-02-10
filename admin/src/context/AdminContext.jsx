
import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();
const AdminContextProvider= ({children})=>{
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):localStorage.getItem(''));
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const value ={
token,setToken,backendUrl
    }
    
    return (
    <AdminContext.Provider value={value}>
      {children}
        </AdminContext.Provider>
)
}
export default AdminContextProvider;