import React from 'react'
import { doctors } from '../assets/assets'
import { Link } from 'react-router-dom'


const MyAppointment = () => {
  const slugify = (text) =>
    text.replace(/\s+/g, '-');

  return (
    <div>
      <p className='text-2xl font-semibold text-gray-600'>My Appointments</p>
      <div className=' gap-5 pt-5 text-xl'>
        {
          doctors.slice(0, 2).map((item, index) => (
            <>
              <div
                className="flex flex-col md:flex-row gap-2 md:gap-4 py-5
             border-t border-b border-gray-300"
                key={index}
              >
                {/* Left: Image */}
                <div className="md:w-1/4 flex justify-center md:items-end">
                  <img
                    className="w-35 sm:w-40 md:w-50 bg-blue-50 rounded"
                    src={item.image}
                    alt={item.speciality}
                  />
                </div>

                {/* Middle: Details */}
                <div className="flex-1 text-gray-600 text-sm sm:text-base flex md:justigy-start flex-col gap-2">   
                  <p className="text-black text-lg font-medium">{item.name}</p>
                  <p>{item.speciality}</p>

                  <div className="mt-3">
                    <p className="font-medium text-gray-700">Address:</p>
                    <p>{item.address.line1}</p>
                    <p>{item.address.line2}</p>
                  </div>

                  <p className="mt-2">
                    <span className="font-semibold">Date & Time:</span>{" "}
                    12:00 PM, 15th June 2024
                  </p>
                </div>

                {/* Right: Actions */}
                <div
                  className="flex flex-col gap-3
               w-full md:w-48
               md:items-end md:justify-center"
                >
                  <button
                    className="w-full border text-sm h-10 rounded-md
                 bg-blue-100 text-gray-700 font-semibold
                 hover:bg-indigo-600 hover:text-white
                 transition-all duration-200"
                  >
                    Pay here
                  </button>

                  <button
                    className="w-full border text-sm h-10 rounded-md
                 text-gray-700 font-semibold
                 hover:bg-red-500 hover:text-white
                 transition-all duration-200"
                  >
                    Cancel appointment
                  </button>
                </div>
              </div>

            </>



          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment