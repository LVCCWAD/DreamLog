import React from 'react'
import DreamLog from '../assets/DreamLog.png';


function CategoriesCard({Category, Thumbnail}) {
  return (
    <div
      className="relative w-[250px] h-[250px] bg-cover bg-center bg-slate-200 rounded-lg"
      style={{ backgroundImage: `url("http://localhost:8000/storage/${Thumbnail}")` }}
    >
    <h1 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white z-10">
        {Category}
    </h1>
    </div>
  )
}

export default CategoriesCard