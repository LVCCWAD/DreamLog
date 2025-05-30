import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import DreamLog from '../assets/DreamLog2.png';
import { Button } from '@mantine/core';
import CategoriesCard from '../components/CategoriesCard';
import { Title, Text } from '@mantine/core';
import image from '../assets/woman.png';
import image1 from '../assets/bard-logo.png';
import image2 from '../assets/search.png';
import { usePage } from '@inertiajs/react';


function LandingPage() {
  const [logInOpen, setLogInOpen] = useState(false)

  const { auth, categories } = usePage().props;
  const isUser = auth.user;


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
      <Navbar Lopen={logInOpen} setLopen={setLogInOpen} />

      <section className='h-full flex flex-row justify-center items-center p-20'>
        <div className='w-[952px] flex flex-col gap-4'>
          <Title order={1} className="text-5xl font-extrabold leading-tight text-gray-900 ">
            Unleash Your <span className="text-pink-600">Creativity</span>, One Post at a Time.
          </Title>

          <Text className="w-[450px] text-lg text-gray-700  leading-relaxed">
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

          <div className="w-[650px] h-[328px] bg-pink-100 rounded-lg flex items-center justify-between p-6 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="w-[360px] flex flex-col justify-center p-6">
              <Title className="text-sm font-bold leading-tight text-gray-900 ">
                AI Chatbot Assistant
              </Title>
              <Text className="text-sm text-gray-700  leading-relaxed mt-4">
                Need inspiration? Stuck on what to write? Our smart chatbot is here to help! Whether you're brainstorming ideas, writing content,
                or just need someone to guide you, our chatbot will be your creative companion every step of the way.
              </Text>
            </div>
            <div className="w-[240px] flex justify-center p-6">
              <img src={image1} className="h-[170px] rounded-md object-cover" />
            </div>
          </div>

          <div className="w-[650px] h-[328px] bg-pink-100 rounded-lg flex items-center justify-between p-6 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="w-[360px] flex flex-col justify-center p-6">
              <Title className="text-sm font-bold leading-tight text-gray-900 ">
                <span>Create a Blog That’s</span> <span>Uniquely Yours</span>
              </Title>
              <Text className="text-sm text-gray-700  leading-relaxed mt-4">
                Customize every part of your blog — from layout and colors to fonts and themes. No coding needed, just your creativity in full control.
              </Text>
            </div>
            <div className="w-[240px] flex justify-center p-6">
              <img src={image2} className="h-[320px] rounded-md object-cover" />
            </div>
          </div>

        </div>

       
      </section>

      {/* d2 ung sa categories */}
      {/* <section className= 'h-full flex flex-col items-start p-20'>
        <div className='max-w-[1500px] w-full mx-auto px-6'>
          <Title order={2} className="text-3xl font-bold text-gray-900 mb-16">
            Multiple Categories to Choose From
          </Title>
          <div className='flex flex-row flex-wrap gap-x-9 gap-y-9 mt-15'>
            {categories.map((category) => (
              <CategoriesCard Category={category.categoryName} Thumbnail={category.thumbnail} className='mb-6' />
            ))}
          </div>
        </div>
      </section> */}

      <section className='h-full flex flex-col items-start m-15'>
          <div className="max-w-[1500px] w-full mx-auto px-6"> 
            <Title order={2} className="text-3xl font-bold text-gray-900 mb-16">
              Multiple Categories to Choose From
            </Title>
            <div className="flex flex-row flex-wrap gap-x-9 gap-y-9 mt-15">
              {categories.map((category) => (        
                  <CategoriesCard Category={category.categoryName} Thumbnail={category.thumbnail} className='m-3'/>                
              ))}
            </div>
          </div>
          </section>



      {/* d2 part ung about us */}
      < section className='h-[300px] flex flex-col justify-center items-center gap-4 bg-pink-50 my-[100px]' >
        <Title order={2} className="text-3xl font-bold text-gray-900 dark:text-black">
          About Us
        </Title>
        <Text className="w-[600px] text-center text-gray-700  text-md leading-relaxed">
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