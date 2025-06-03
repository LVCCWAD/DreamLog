import React from 'react'
import DreamLog from '../assets/DreamLog.png';
import { usePage } from '@inertiajs/react';


function CategoriesCard({Category, Thumbnail}) {
  const { url } = usePage().props;
  return (
    <div
      className="relative w-[300px] h-[300px] bg-cover bg-center bg-slate-200 rounded-3xl transition-transform duration-300 hover:scale-110"
      style={{ backgroundImage: `url("${url}/storage/${Thumbnail}")` }}
    >
    <h1 className="absolute bottom-4 left-0 w-full text-xl text-center font-bold text-white z-10 px-2 py-1"
    style={{backgroundColor: "#00000040"}} >
        {Category}
    </h1>

    {/* <h1 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-bold text-white z-10 ">
        {Category}
    </h1> */}
    </div>
  )
}

export default CategoriesCard