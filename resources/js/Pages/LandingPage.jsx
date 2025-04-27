import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import DreamLog from '../assets/DreamLog2.png';
import { Button } from '@mantine/core';

function LandingPage() {
  const [logInOpen, setLogInOpen] = useState(false)

  console.log(logInOpen)
  return (
    <>
      <Navbar Lopen={logInOpen} setLopen={setLogInOpen}/>
     
      <section className='h-full flex flex-row justify-center items-center'>
        <div className='w-[952px] flex flex-col gap-4'>
          <div>Unleash Your <span>Creativity</span>, One Post at a Time.</div>
          <div className='w-[450px] '>
            To shares valuable knowledge and innovative ideas across specific fields,
            offering expert insights, practical tips, and impactful concepts to inspire
              growth and personal development.
          </div>
          <div>
            <Button radius="xl" size='xl'  color="gray" onClick={()=>setLogInOpen(!logInOpen)} ><span className='px-4'>Get Started</span></Button>
          </div>
          
        </div>
        <img src={DreamLog} className='h-[803px]'/>
      </section>

      <section className='h-[1117px] flex flex-row justify-center items-center gap-10 p-12 mt-4'>
        <div className='w-[727px] h-[328px] bg-pink-100 hover:w-[750px] hover:h-[350px]'>

        </div>
        <div className='w-[727px] h-[328px] bg-pink-100 hover:w-[750px] hover:h-[350px]'>

        </div>
      </section>

      <section className='h-full flex flex-row justify-center items-center'>
        <div className='w-[727px] h-[328px] bg-pink-300'>

        </div>
      </section>
    </>
  )
}

export default LandingPage