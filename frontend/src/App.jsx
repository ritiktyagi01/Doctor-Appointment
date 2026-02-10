import React from 'react'
import Home from './pages/Home';
import  { Routes ,Route } from 'react-router-dom'
import Myprofile from './pages/MyProfile';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact'
import MyAppointment from './pages/MyAppointment';
import About from './pages/About';
import Login from './pages/Login';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';


const App = () => {
  return (
   
   <div className='mx-4 sm:mx-[10%]'>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/doctors" element={<Doctors/>}/>
    <Route path="/doctors/:speciality" element={<Doctors/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/my-profile" element={<Myprofile/>}/>
    <Route path="/my-appointments" element={<MyAppointment/>}/>
    <Route path="/appointment/:name" element={<Appointment/>}/>

    </Routes>
    </div>
  )
}

export default App;