import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";

const App = () => {
  const { token } = useContext(AdminContext);

  return (
   <>
  <Navbar />
  <div className="bg-[#F8F9FD]">
    <ToastContainer />

    <div className="flex items-start">
      {token && <Sidebar />}

      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/admin/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/all-appointments"
          element={token ? <AllAppointments /> : <Navigate to="/login" />}
        />

        <Route
          path="/add-doctor"
          element={token ? <AddDoctor /> : <Navigate to="/login" />}
        />

        <Route
          path="/doctors-list"
          element={token ? <DoctorList /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  </div>
</>

  );
};

export default App;
