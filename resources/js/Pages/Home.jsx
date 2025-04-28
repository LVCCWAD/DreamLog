import React from 'react'
import Navbar from '../components/Navbar'
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import BlogCard from '../components/BlogCard';

function Home({isUser}) {
    console.log(isUser)
  return (
    <>
        <Navbar isUser={isUser}/>
        <div className='flex flex-col justify-center items-center gap-[100px] mt-5'>
          <section>
            <div className='m-5 p-5'>Top Blogs</div>
            <Carousel withIndicators className='h-[400px] w-[1400px]'>
              <Carousel.Slide>
                <Image
                  radius="md"
                  h={400}
                  w={1400}
                  fit="contain"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                />
              </Carousel.Slide>

              <Carousel.Slide>
                <Image
                  radius="md"
                  h={400}
                  w={1400}
                  fit="contain"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                />
              </Carousel.Slide>

              <Carousel.Slide>
                <Image
                  radius="md"
                  h={400}
                  w={1400}
                  fit="contain"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                />
              </Carousel.Slide>
              {/* ...other slides */}
            </Carousel>
          </section>

          <section className='w-[100%] bg-pink-50'>
            <div className='m-5 p-5'>Most Viewed</div>
            <div className='flex flex-row justify-center items-center gap-6'>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
            
          </section>

          <section>
            <div className='m-5 p-5'>Discover More</div>
            <div className='flex flex-row justify-center items-center gap-6'>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
            
          </section>

        </div>
        
        <footer className='h-[100px] mt-[100px] flex flex-col justify-center items-center bg-slate-200'>
          <span>2025 Dream Log. All Rights Reserved.</span>
        </footer>
    </>
    
  )
}

export default Home