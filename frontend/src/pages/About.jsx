import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <>
    <div >
       <p className='flex justify-center py-10 text-2xl font-bold  '> About Us</p>
      {/* upper side */}
      <div className='flex flex-col md:flex-row '>
        {/* left side */}
        <div className="">
          <img
            className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl border border-gray-200 rounded-xl shadow-lg bg-white"
            src={assets.about_image}
            alt="" />
        </div>


        {/* right side */}
        <div className='text-gray-500 px-5 md:px-15 py-5 md:pt-5 sm:-ml-10 text-justify'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            <br />
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <br />
          <h1 className='text-gray-700 font-semibold'>Our Vision</h1>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it</p>

        </div>
      </div>

      {/* down side */}

      <h1 className='text-2xl font-semibold py-5 sm:py-5'>Why Choose Us: </h1>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-200 rounded-xl shadow-lg bg-blue-50 p-6  ">
        <div className="size-130 -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>

        <div className="py-10 border-b border-gray-200 md:pt-15 md:border-r-4 md:border-b-0 md:px-15">
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Efficiency:</h3>
            <p className="text-sm text-slate-500">Streamlined appointment scheduling That fits into your busy lifestyle.</p>
          </div>
        </div>
        <div className="py-10 border-b border-gray-200 md:pt-15 md:border-r-4 md:border-b-0 md:px-15">
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Convenience:</h3>
            <p className="text-sm text-slate-500">Access to a network of trusted Healthcare professionals in your area.</p>
          </div>
        </div>
        <div className="py-10 border-b border-gray-200 md:pt-15 md:border-b-0 md:px-15">
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Personalization:</h3>
            <p className="text-sm text-slate-500">Tailored recommendations and Reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>


    </div>
     
    </>
  )
}

export default About