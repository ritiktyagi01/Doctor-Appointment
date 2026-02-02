import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <>
      <h1 className='flex justify-center py-10 text-2xl font-bold'>Contact Us </h1>
      <div className='flex flex-col md:flex-row px-25'>
        {/* left side  */}

        <img className="w-full sm:w-3/4 md:w-1/2 max-w-5xl md:max-w-6xl lg:max-w-7xl border border-gray-400 rounded-xl shadow-xl bg-white " src={assets.contact_image} alt="" />



        <div className='text-gray-500 px-25 mt-10 md:py-0 '>
          {/* right side  */}
          <h1 className='text-2xl font-semibold '>Our Office </h1><br />
          <p>54709 Willms Station<br />
            Suite 350, Washington, USA<br /><br />
            Tel: (415) 555‑0132<br />
            Email: ritiktyagi287@gmail.com</p>

          <div className='text-gray-500'>
            <h1 className='text-2xl font-semibold py-5'>Careers AT PRESCRIPTO</h1>
            <p className='text-sm text-justify'>Learn more about our teams and job openings.</p><br />
            <button className='border flex justify-center items-center w-1/2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer text-gray-600 font-semibold transition-all duration-200'>Explore Jobs</button>
          </div>
        </div>



      </div>

    </>
  )
}

export default Contact