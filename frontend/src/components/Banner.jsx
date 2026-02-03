import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const Banner = () => {

  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div>
      <div className='flex flex-col flex-wrap md:flex-row bg-primary  md:pt-15 px-6 md:px-10 lg:px-20 rounded-lg'>
        {/*-----LEft side------------ */}
        <div className='md:w-1/2 flex flex-col items-start  justify-center gap-4  py-0 m-auto md:py-6 md:-mb-[-7.5] '>
          <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight md:leading-tight lg:leading-tight'>Book Appointment
            <br />  With 100+ Trusted Doctors</p>
          {
            user ?
              <button className="flex items-center gap-2 rounded-full text-sm sm:text-base cursor-pointer bg-white text-black px-6 py-2 sm:px-10 sm:py-2.5 active:scale-95 transition-all duration-200">
                Create account
                <ArrowRight className="w-8 h-4 sm:w-4 sm:h-4 inline" />
              </button>
              :
              <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); openSignIn(); }} className="flex items-center gap-2 rounded-full text-sm sm:text-base cursor-pointer bg-white text-black px-6 py-2 sm:px-10 sm:py-2.5 active:scale-95 transition-all duration-200">
                Create account
                <ArrowRight className="w-8 h-3 sm:w-4 sm:h-4" />
              </button>

          }
        </div>

        <div className='md:w-1/2 flex justify-end '>
          <img
            className='w-full max-w-105 rounded-lg'
            src={assets.appointment_img}
            alt=''
          />
        </div>

      </div>
    </div>
  )
}

export default Banner