import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const Navigate = useNavigate();
  return (
    <div>
         <div className='flex flex-col flex-wrap md:flex-row bg-primary  md:pt-15 px-6 md:px-10 lg:px-20 rounded-lg'>
            {/*-----LEft side------------ */}
            <div className='md:w-1/2 flex flex-col items-start  justify-center gap-4 py-10 m-auto md:py-[10vh] md:-mb-[-7.5] '>
                <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight md:leading-tight lg:leading-tight'>Book Appointment
                    <br />  With 100+ Trusted Doctors</p>
                <a  onClick={()=>{Navigate('/Login');scrollTo(0,0)}} className=" bg-white  text-black px-4 py-2 rounded-full mt-2 hover:scale-105 transition-all duration-100" href="">
                    Create account <ArrowRight className='inline ' />
                </a>
            </div>

             <div className='md:w-1/2 flex justify-end'>
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