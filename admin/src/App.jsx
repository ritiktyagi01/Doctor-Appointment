import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { useLocation } from "react-router-dom";
import { DoctorContext } from "./context/DoctorContext";
import Appointments from "./pages/Doctor/Appointments";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import Patient from "./pages/Doctor/Patient";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { token } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
  <>
    <ToastContainer />
    <Navbar />

    {isLoginPage ? (
      <Routes>
        <Route
          path="/login"
          element={
            !token && !dtoken ? (
              <Login />
            ) : token ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/doctor/dashboard" />
            )
          }
        />
      </Routes>
    ) : (
      <div className="bg-[#F8F9FD]">
        <div className="flex items-start">
          {(token || dtoken) && <Sidebar />}

          <Routes>
            {/* ADMIN ROUTES */}
            <Route
              path="/admin/dashboard"
              element={token ? <AdminDashboard /> : <Navigate to="/login" />}
            />

            <Route
              path="/admin/all-appointments"
              element={token ? <AllAppointments /> : <Navigate to="/login" />}
            />

            <Route
              path="/admin/add-doctor"
              element={token ? <AddDoctor /> : <Navigate to="/login" />}
            />

            <Route
              path="/admin/doctors-list"
              element={token ? <DoctorList /> : <Navigate to="/login" />}
            />

            {/* DOCTOR ROUTES */}
            <Route
              path="/doctor/dashboard"
              element={dtoken ? <DoctorDashboard /> : <Navigate to="/login" />}
            />

            <Route
              path="/doctor/appointments"
              element={dtoken ? <Appointments /> : <Navigate to="/login" />}
            />

            <Route
              path="/doctor/patients"
              element={dtoken ? <Patient /> : <Navigate to="/login" />}
            />

            <Route
              path="/doctor/profile"
              element={dtoken ? <DoctorProfile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    )}
  </>
);

};

export default App;
