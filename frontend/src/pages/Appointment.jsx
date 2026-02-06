import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { ArrowRight } from 'lucide-react'
import { useClerk, useUser } from "@clerk/clerk-react";

const Appointment = () => {
  const { name } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocinfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
    const { user } = useUser();
  const { openSignIn } = useClerk();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  ];


  const slugify = (text) =>
    text.trim().replace(/\s+/g, "-");

  const getAvaiavleSlots = async () => {
    setDocSlots([]);
    // getting current date 
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(17, 0, 0, 0); // setting end time to 5 PM

      // formating hours and minutes
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        // setting start time to 9 AM
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        currentDate.setHours(9, 0, 0, 0); // setting start time to 9 AM
        currentDate.setMinutes(0);
      }
      let slots = [];

      while (currentDate < endTime) {
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let timeStr = hours + ':' + minutes + ' ' + ampm;
        slots.push({
          dateTime: new Date(currentDate),
          time: timeStr
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, slots]);
    };

  };
  const [activeDay, setActiveDay] = useState(0);
  const [activeTime, setActiveTime] = useState(null);

  const Navigate = useNavigate();

  useEffect(() => {
    console.log("Available Slots:", docSlots);
    console.log("docSlots:", docSlots);
    console.log("slotIndex:", slotIndex);
    console.log("current slots:", docSlots[slotIndex]);
  }, [docSlots]);

  useEffect(() => {
    getAvaiavleSlots();
  }, [docInfo]);

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
  return docInfo && (
    <>
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left side */}
        <div className="">
          <img
            className="flex-1 bg-primary p-5 rounded-lg h-auto w-full md:w-200 sm:w-150 object-contain"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        {/* Right side */}
        <div>
          <div className="flex flex-col h-auto gap-3 border border-gray-400 rounded-lg px-5 pt-5 ">

            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold">{docInfo.name}</p>
              <img src={assets.verified_icon} alt="verified" />
            </div>

            <p className="text-gray-500 font-medium">{docInfo.degree} - {docInfo.speciality}   <button className=" bg-white   px-4 rounded-full mt-2 hover:scale-105 transition-all duration-100 border ">
              {docInfo.experience}
            </button></p>




            <h1 className="font-medium text-lg">About <img className="inline h-auto w-auto" src={assets.info_icon} alt="" /> </h1>
            <p className="text-gray-500 text-justify">{docInfo.about}</p>

            <p className="text-gray-500 mb-10 text-lg">
              Appointment Fee : <p className="font-medium inline text-black">${docInfo.fees}</p>
            </p>


          </div>

        </div>

      </div>

      {/* Booking Section */}
      <div className="mt-5  flex flex-col   rounded-lg p-5 border border-gray-300  bg-slate-100">
        <h1 className="text-lg font-bold text-gray-700 mb-4">
          Booking Slots
        </h1>

        {/* Days */}
       <div className="flex gap-3 overflow-x-auto flex-wrap pb-3">
  {days.map((item, index) => (
    <button
      key={index}
      onClick={() => {
        setActiveDay(index);
        setSlotIndex(index);
        setActiveTime(null);
      }}
      className={`min-w-17.5 text-center py-3 rounded-full cursor-pointer transition-all
        ${activeDay === index
          ? "bg-primary text-white shadow-md"
          : "border text-gray-500 hover:bg-blue-200"}
      `}
    >
      <p className="text-sm">{item}</p>
      <p className="text-lg font-semibold">
        {new Date().getDate() + index}
      </p>
    </button>
  ))}
</div>


        {/* Time Slots */}

        <div className="flex flex-wrap gap-3 mt-5">
          {docSlots?.[slotIndex]?.length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTime(item.time)}
                className={`px-4 py-2 rounded-full text-sm transition-all
          focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
          ${activeTime === item.time
                    ? "bg-primary text-white"
                    : "border text-gray-500 hover:bg-blue-200"
                  }
        `}
              >
                {item.time}
              </button>
            ))
          ) : (
            <p className="text-gray-600 text-sm md:text-xl sm:text-sm">No slots available</p>
          )}
        </div>


        {/* Book Button */}
        {
          user? (<button onClick={() => Navigate('/my-appointments')}
          className="mt-6 bg-primary w-fit text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          Book an appointment  <ArrowRight className='inline ' />
        </button>):(<button onClick={() => {openSignIn()}}
          className="mt-6 bg-primary w-fit text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          Book an appointment  <ArrowRight className='inline ' />
        </button>)
        }
        

      </div>

      {/* Footer section */}

      <div className="text-gray-400 gap-3 flex  flex-col justify-center items-center pt-15">
        <h1 className="text-black text-3xl ">Related Doctors</h1>
        <p className="mb-15">Simply browse through our extensive list of trusted doctors.</p>
      </div>
      <div className="w-full grid grid-cols-5 gap-4 gap-y-6 mb-15">
        {
          doctors.slice(0, 5).map((item, index) => (
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
