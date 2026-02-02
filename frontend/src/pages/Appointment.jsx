import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { ArrowRight } from 'lucide-react'
const days = [
  { day: "MON", date: 10 },
  { day: "TUE", date: 11 },
  { day: "WED", date: 12 },
  { day: "THU", date: 13 },
  { day: "FRI", date: 14 },
  { day: "SAT", date: 15 },
  { day: "SUN", date: 16 },
];
const timeSlots = [
  "8.00 am",
  "8.30 am",
  "9.00 am",
  "9.30 am",
  "10.00 am",
  "10.30 am",
  "11.00 am",
  "11.30 am",
];
const Appointment = () => {
  const { name } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocinfo] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTime, setActiveTime] = useState(null);


  const slugify = (text) =>
    text.trim().replace(/\s+/g, "-");

  useEffect(() => {
    if (!doctors || !name) return;

    const info = doctors.find(
      doc => slugify(doc.name) === name
    );

    console.log("Doctor found:", info);
    setDocinfo(info);
  }, [doctors, name]);

  if (!docInfo) {
    return <p className="text-center">Doctor not found</p>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left side */}
        <div className="md:w-1/2 border border-blue-200 rounded-lg overflow-hidden flex justify-center bg-primary  ">
          <img
            className="w-full h-auto max-w-md sm:max-w-lg md:max-w-full object-contain  "
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        {/* Right side */}
        <div>
          <div className="flex flex-col  gap-3 border border-gray-400 rounded-lg px-5 pt-5 ">

            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold">{docInfo.name}</p>
              <img src={assets.verified_icon} alt="verified" />
            </div>

            <p className="text-gray-500 font-medium">{docInfo.degree} - {docInfo.speciality}   <button className=" bg-white   px-4 rounded-full mt-2 hover:scale-105 transition-all duration-100 border ">
              {docInfo.experience}
            </button></p>




            <h1 className="font-medium text-lg">About </h1>
            <p className="text-gray-500 text-justify">{docInfo.about}</p>

            <p className="text-gray-500 mb-10 text-lg">
              Appointment Fee : <p className="font-medium inline text-black">${docInfo.fees}</p>
            </p>


          </div>

        </div>
       
      </div> 

       {/* Booking Section */}
      <div className="mt-5  flex flex-col   rounded-lg p-5 ">
        <h1 className="text-lg font-bold text-gray-700 mb-4">
          Booking Slots
        </h1>

        {/* Days */}
        <div className="flex gap-3 overflow-x-auto pb-3  focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer">
          {days.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`min-w-17.5 text-center py-3 rounded-full cursor-pointer transition-all focus:outline-2 focus:ring-2 focus:ring-blue-500 
          ${activeDay === index
                  ? "bg-primary text-white shadow-md"
                  : "border text-gray-500 hover:bg-blue-100"}
        `}
            >
              <p className="text-sm font-medium">{item.day}</p>
              <p className="text-sm">{item.date}</p>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-3 mt-5  ">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              onClick={() => setActiveTime(time)}
              className={`px-4 py-2 rounded-full text-sm  transition-all focus:outline-none focus:ring-3 focus:ring-blue-500 cursor-pointer
          ${activeTime === time
                  ? "bg-primary text-white"
                  : "border text-gray-500 hover:bg-blue-100"}
        `}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          className="mt-6 bg-primary w-fit text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500 "
        > 
          Book an appointment  <ArrowRight className='inline ' />
        </button>

      </div>

     {/* Footer section */}
      
      <div className="text-gray-400 gap-3 flex  flex-col justify-center items-center pt-25">
        <h1 className="text-black text-3xl ">Related Doctors</h1> 
        <p className="mb-15">Simply browse through our extensive list of trusted doctors.</p>
      </div>
          <div className="w-full grid grid-cols-5 gap-4 gap-y-6 mb-15">
          {
            doctors.slice(0,5).map((item, index) => (
              <div onClick={() => Navigate(`/appointment/${slugify(item.name)}`)} className='border border-blue-200 cursor-pointer overflow-hidden hover:-translate-y-2.5 transiton-all duration-200' key={index} >
                <img className='bg-[#EAEFFF] ' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-center text-sm text-green-500 '>
                    <p className='h-2 w-2 bg-green-500 rounded-full '></p>   <p className=''> Avaiable</p>
                  </div>
                  <p className='text-lg font-semibold'>{item.name}</p>
                  <p className='text-gray-500'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
    </>

  );
};

export default Appointment;
