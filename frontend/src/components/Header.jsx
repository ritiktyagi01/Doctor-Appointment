import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'

const Header = () => {
    return (
        <div className='flex flex-col flex-wrap md:flex-row bg-primary  md:pt-15 px-6 md:px-10 lg:px-20 rounded-lg'>
            {/*-----LEft side------------ */}
            <div className='md:w-1/2 flex flex-col items-start  justify-center gap-4 py-10 m-auto md:py-[10vh] md:-mb-[-7.5] '>
                <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight md:leading-tight lg:leading-tight'>Book Appointment
                    <br />  With Trusted Doctors</p>
                    <div className='flex flex-col md:flex-row gap-4 items-center text-sm font-light '>
                        <img className="" src={assets.group_profiles} alt="" />
                <p className=' text-sm text-white '>
                    Simply browse through our extensive list of trusted doctors, <br />
                    schedule your appointment hassle-free.
                </p>
                    </div>
                
                <a className=" bg-white  text-black px-4 py-2 rounded-full mt-2 hover:scale-105 transition-all duration-100" href="#speciality">
                    Book appointment <ArrowRight className='inline ' />
                </a>
            </div>

            {/* --------------right side----------- */}
            <div className='md:w-1/2 '>
                <img className="w-full bottom-0 h-auto rounded-lg " src={assets.header_img} alt="" />

            </div>
        </div>

    )
}

export default Header