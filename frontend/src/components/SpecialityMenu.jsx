import React from 'react'
import { specialityData } from '../assets/assets'
import  { Link } from 'react-router-dom'
const SpecialityMenu = () => {

   const slugify = (text) =>
    text.replace(/\s+/g, '-');
  return (
    
    <div id='speciality' className='flex flex-col items-center gap-3 pt-20 m-auto '>
      <h1 className='text-3xl font-medium '>Find by Speciality </h1>
      <p className='md:w-1/3 text-gray-400 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule 
    your appointment hassle-free.</p>

    <div className='flex flex-wrap justify-center gap-5 pt-5 w-full'>
  {
    specialityData.map((item, index) => (
      <Link onClick={()=> scrollTo(0,0)}
        key={index}
        to={`/doctors/${slugify(item.speciality)}`}
        className='text-xs text-gray-600 cursor-pointer hover:-translate-y-1 transition-all duration-300'
      >
        <img
          className='w-16 md:w-24 mb-2 mx-auto'
          src={item.image}
          alt={item.speciality}
        />
        <p className='text-center'>{item.speciality}</p>
      </Link>
    ))
  }
</div>

     </div>

  )
}

export default SpecialityMenu