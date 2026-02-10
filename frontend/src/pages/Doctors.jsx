import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom';

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([])
  const Navigate = useNavigate();
  const slugify = (text) =>
    text.replace(/\s+/g, '-');

  const handleNavigate = (name) => {
    Navigate(
      speciality === name
        ? "/doctors"
        : `/doctors/${slugify(name)}`
    );
  };


  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          doc => slugify(doc.speciality) === speciality
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [doctors, speciality])

  return (
    <>
      <p className='text-3xl font-medium flex justify-center py-5'>
        Browse through the doctors specialist
      </p>
      <div className='flex flex-col md:flex-row items-start mt-5 gap-5 '>
        {/* left side */}
        <div className='text-gray-500'>
          <div className=" cursor-pointer flex  sm:flex-row md:flex-col md:items-start  gap-6 ">
            <button
              onClick={() => handleNavigate("General-physician")}
              className={`w-full border flex justify-center items-center  h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer text-gray-600 font-semibold transition-all duration-200 mb-3
      ${slugify("General physician") === speciality
                  ? "bg-primary text-white border-primary "
                  : " border-gray-300 "}
    `}
            >
              General physician
            </button>

            <button
              onClick={() => handleNavigate("Gynecologist")}
              className={`w-full border flex justify-center items-center  h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer text-gray-600 font-semibold transition-all duration-200 mb-3
      ${slugify("Gynecologist") === speciality
                  ? "bg-primary text-white border-primary "
                  : " border-gray-300 "}
    `}
            >
              Gynecologist
            </button>

            <button
              onClick={() => handleNavigate("Dermatologist")}
              className={`border flex justify-center items-center w-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer text-gray-600 font-semibold transition-all duration-200 mb-3
      ${slugify("Dermatologist") === speciality
                  ? "bg-primary text-white border-primary"
                  : " border-gray-300 "}
    `}
            >
              Dermatologist
            </button>

            <button
              onClick={() => handleNavigate("Pediatricians")}
              className={`border flex justify-center items-center w-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer text-gray-600 font-semibold transition-all duration-200 mb-3
      ${slugify("Pediatricians") === speciality
                  ? "bg-primary text-white border-primary"
                  : " border-gray-300 "}
    `}
            >
              Pediatricians
            </button>

            <button
              onClick={() => handleNavigate("Neurologist")}
              className={`border flex justify-center items-center w-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer text-gray-600 font-semibold transition-all duration-200 mb-3
      ${slugify("Neurologist") === speciality
                  ? "bg-primary text-white border-primary"
                  : " border-gray-300 "}
    `}
            >
              Neurologist
            </button>

            <button
              onClick={() => handleNavigate("Gastroenterologist")}
              className={`border flex justify-center items-center w-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer text-gray-600 font-semibold transition-all duration-200 mb-3 px-5
      ${slugify("Gastroenterologist") === speciality
                  ? "bg-primary text-white border-primary"
                  : " border-gray-300 "}
    `}
            >
              Gastroenterologist
            </button>
          </div>



        </div>
        {/* Right side  */}
        <div className="w-full grid grid-cols-4 gap-4 gap-y-6">
          {
            filterDoc.map((item, index) => (
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
      </div>
    </>

  )
}

export default Doctors;