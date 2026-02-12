import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import  {AppContext}  from '../context/AppContext';
import { assets } from '../assets/assets';


const TopDoctors = () => {
    const Navigate = useNavigate();
    const{doctors} = useContext(AppContext);
    const slugify = (text) =>
  text.trim().replace(/\s+/g, '-')

    return (
        <div className='flex flex-col items-center gap-3  my-16 md:mx-10 '>
            <h1 className='text-3xl font-medium '>Top Doctors to Book </h1>
            <p className='md:w-1/3 text-gray-400 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-4 pt-5 px-3 md:px-0'>
                {
                    doctors.slice(0, 10).map((item, index) => (
                        <div onClick={()=>Navigate(`/appointment/${slugify(item.name)}`)} className=' border border-blue-200 rounded-lg shadow-md cursor-pointer overflow-hidden hover:-translate-y-2.5 transiton-all duration-200'key={index} >
                            <img className='bg-[#EAEFFF]  object-cover ' src={item.image} alt="" />
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
            
            <button onClick={()=> {Navigate("/doctors");scrollTo(0,0)}} className='  w-fit rounded-full px-15 py-2  mt-2 hover:scale-105 transition-all duration-100 bg-[#EAEFFF] text-gray-600 cursor-pointer'>more<img className='w-2 inline' src={assets.dropdown_icon} alt="" /></button>

        </div>
    )
}

export default TopDoctors;