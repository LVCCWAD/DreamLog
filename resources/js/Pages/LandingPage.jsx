import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import DreamLog from '../assets/DreamLog2.png';
import { Button } from '@mantine/core';
import CategoriesCard from '../components/CategoriesCard';

function LandingPage({isUser}) {
  const [logInOpen, setLogInOpen] = useState(false)

  const getStarted = () =>{
    if(isUser){
      window.location.href='/';
    }
    else{
      setLogInOpen(!logInOpen)
    }
  }
  return (
    <>
      <Navbar Lopen={logInOpen} setLopen={setLogInOpen} isUser={isUser}/>
     
      <section className='h-full flex flex-row justify-center items-center'>
        <div className='w-[952px] flex flex-col gap-4'>
          <div>Unleash Your <span>Creativity</span>, One Post at a Time.</div>
          <div className='w-[450px] '>
            To shares valuable knowledge and innovative ideas across specific fields,
            offering expert insights, practical tips, and impactful concepts to inspire
              growth and personal development.
          </div>
          <div>
            <Button radius="xl" size='xl'  color="gray" onClick={() => getStarted()} ><span className='px-4'>Get Started</span></Button>
          </div>
          
        </div>
        <img src={DreamLog} className='h-[803px]'/>
      </section>

      <section className=' flex flex-col justify-center items-center gap-10 p-12 mt-4'>
        <div className='flex flex-row justify-center items-center gap-10'>
          <div className='w-[727px] h-[328px] bg-pink-50 hover:w-[750px] hover:h-[350px] rounded-lg'>
          {/* pink na box */}
          </div>
          <div className='w-[727px] h-[328px] bg-pink-100 hover:w-[750px] hover:h-[350px] rounded-lg'>
          {/* pink na box */}
          </div>
        </div>
        

        {/* d2 ung sa categories */}
        <div className='flex flex-col gap-3'>
          <span>Multiple Categories to Choose From</span>
          <div className='flex flex-row justify-center items-center gap-10'>
              <CategoriesCard Category={"Entertainment"}/>
              <CategoriesCard Category={"Education"}/>
              <CategoriesCard Category={"Technology"}/>
              <CategoriesCard Category={"More.."}/>
          </div>
        </div>
        

      </section>

      {/* d2 part ung about us */}
      <section className='h-[600px] flex flex-col justify-center items-center gap-4 bg-pink-50 my-[100px]'>
        <span className='text-2xl font-bold'>About Us</span>
        <span className='w-[600px] text-center'>
          This platform was created with a clear mission: to share valuable knowledge and innovative ideas across various fields.
          It offers expert insights, practical tips, and impactful content designed to inspire creativity, growth, and personal development.
          The site empowers users to unleash their creativity, one post at a time,
          giving everyone the freedom to express themselves and share their voice with the world.
        </span>
      </section>

      <footer className='h-[100px] mt-[100px] flex flex-col justify-center items-center bg-slate-200'>
        <span>2025 Dream Log. All Rights Reserved.</span>
      </footer>
    </>
  )
}

export default LandingPage