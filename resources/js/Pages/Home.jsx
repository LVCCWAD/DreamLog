import React from 'react'
import Navbar from '../components/Navbar'
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import BlogCard from '../components/BlogCard';
import { Text, Title } from '@mantine/core';

function Home({isUser, blogs, categories, authUser}) {
    console.log(authUser)
    console.log(blogs)
  return (
    <>
        <Navbar isUser={isUser} categories={categories}/>
        <section className='w-full'> </section>
        <div className="max-w-[1400px] px-5 mx-auto">
          <section>
            <Title order={2} classname= 'm-5 p-5'>Top Blogs</Title> 
            <Carousel withIndicators className="w-full h-[400px]">
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
            <Title order={2} className='m-5 p-5'>Most Viewed</Title>
            <div className='flex flex-row justify-center items-center gap-6'>
              {blogs.map((blog)=>(
                              <BlogCard
                                  Title={blog.BlogTitle}
                                  Description={blog.BlogDescription}
                                  Creator={blog.creator}
                                  Thumbnail={blog.Thumbnail}
                                  id={blog.id}
                                  authUser={authUser}
                                  likes={blog.likes}/>
                          ))}
            </div>
            
          </section>

          <section>
           <Title order={2} className='m-5 p-5'>Discover more</Title>
            <div className='flex flex-row justify-center items-center gap-6 h-[300px]'>
              {blogs.map((blog)=>(
                                <BlogCard
                                  Title={blog.BlogTitle}
                                  Description={blog.BlogDescription}
                                  Creator={blog.creator}
                                  Thumbnail={blog.Thumbnail}
                                  id={blog.id}
                                  authUser={authUser}
                                  likes={blog.likes}/>
                            ))}
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