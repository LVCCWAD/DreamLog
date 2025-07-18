import React from 'react'
import DreamLog from '../assets/DreamLog.png';
import { usePage } from '@inertiajs/react';


function CategoriesCard({Category, Thumbnail}) {
  const { url } = usePage().props;
  return (
    <div
      className="relative w-[250px] h-[250px] bg-cover bg-center bg-slate-200 rounded-3xl transition-transform duration-300 hover:scale-110"
      style={{ backgroundImage: `url("${url}/storage/${Thumbnail}")` }}
    >
    <h1 className="absolute bottom-4 left-0 w-full text-xl text-center font-bold text-white z-10 px-2 py-1"
    style={{backgroundColor: "#00000040"}} >
        {Category}
    </h1>

    
    </div>
  )
}

export default CategoriesCard