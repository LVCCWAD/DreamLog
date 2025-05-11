import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import DreamLog from '../assets/DreamLog2.png';
import { Button } from '@mantine/core';
import CategoriesCard from '../components/CategoriesCard';
import { Title, Text } from '@mantine/core';
import image from '../assets/woman.png';
import image1 from '../assets/bard-logo.png';
import image2 from '../assets/search.png';


function LandingPage({ isUser }) {
  const [logInOpen, setLogInOpen] = useState(false)

  const getStarted = () => {
    if (isUser) {
      window.location.href = '/';
    }
    else {
      setLogInOpen(!logInOpen)
    }
  }
  return (
    <>
      <Navbar Lopen={logInOpen} setLopen={setLogInOpen} isUser={isUser} />

      <section className='h-full flex flex-row justify-center items-center p-20'>
        <div className='w-[952px] flex flex-col gap-4'>
          <Title order={1} className="text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Unleash Your <span className="text-pink-600">Creativity</span>, One Post at a Time.
          </Title>

          <Text className="w-[450px] text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            To share valuable knowledge and innovative ideas across specific fields, offering expert insights,
            practical tips, and impactful concepts to inspire growth and personal development.
          </Text>
          <div>
            <Button radius="xl" size='xl' color="gray" onClick={() => getStarted()} ><span className='px-4'>Get Started</span></Button>
          </div>

        </div>
        <img src={image} className='h-[700px]' />

      </section>

      <section className=' flex flex-col justify-center items-center gap-10 p-12 mt-4'>
        <div className='flex flex-row justify-center items-center gap-10'>

          <div className="w-[650px] h-[328px] bg-pink-100 hover:w-[700px] hover:h-[350px] rounded-lg flex items-center justify-between p-6 shadow-lg">
            <div className="w-[360px] flex flex-col justify-center p-6">
              <Title className="text-sm font-bold leading-tight text-gray-900 dark:text-white">
                AI Chatbot Assistant
              </Title>
              <Text className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Need inspiration? Stuck on what to write? Our smart chatbot is here to help! Whether you're brainstorming ideas, writing content,
                or just need someone to guide you, our chatbot will be your creative companion every step of the way.
              </Text>
            </div>
            <div className="w-[240px] flex justify-center p-6">
              <img src={image1} className="h-[170px] rounded-md object-cover" />
            </div>
          </div>

          <div className="w-[650px] h-[328px] bg-pink-100 hover:w-[700px] hover:h-[350px] rounded-lg flex items-center justify-between p-6 shadow-lg">
            <div className="w-[360px] flex flex-col justify-center p-6">
              <Title className="text-sm font-bold leading-tight text-gray-900 dark:text-white">
                <span>Create a Blog That’s</span> <span>Uniquely Yours</span>
              </Title>
              <Text className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Customize every part of your blog — from layout and colors to fonts and themes. No coding needed, just your creativity in full control.
              </Text>
            </div>
            <div className="w-[240px] flex justify-center p-6">
              <img src={image2} className="h-[320px] rounded-md object-cover" />
            </div>
          </div>

        </div>

        {/* d2 ung sa categories */}
        <div className='flex flex-col gap-3'>
          <Title order={2} className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Multiple Categories to Choose From
          </Title>
          <div className='flex flex-row justify-center items-center gap-10'>
            <CategoriesCard Category={"Entertainment"} />
            <CategoriesCard Category={"Education"} />
            <CategoriesCard Category={"Technology"} />
            <CategoriesCard Category={"More.."} />
          </div>
        </div>

      </section >

      {/* d2 part ung about us */}
      < section className='h-[300px] flex flex-col justify-center items-center gap-4 bg-pink-50 my-[100px]' >
        <Title order={2} className="text-3xl font-bold text-gray-900 dark:text-black">
          About Us
        </Title>
        <Text className="w-[600px] text-center text-gray-700 dark:text-gray-300 text-md leading-relaxed">
          This platform was created with a clear mission: to share valuable knowledge and innovative ideas across various fields.
          It offers expert insights, practical tips, and impactful content designed to inspire creativity, growth, and personal development.
          The site empowers users to unleash their creativity, one post at a time, giving everyone the freedom to express themselves
          and share their voice with the world.
        </Text>

      </section >


      <footer className='h-[100px] mt-[100px] flex flex-col justify-center items-center bg-slate-200'>
        <span>2025 Dream Log. All Rights Reserved.</span>
      </footer>
    </>
  )
}

export default LandingPage