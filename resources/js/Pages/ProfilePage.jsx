import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';

function ProfilePage({user, userBlogs, isUser, categories}) {
    console.log(user)
  return (
    <>
        <Navbar isUser={isUser} categories={categories}/>
        <div  className='flex flex-col justify-center items-center h-[400px] '>
          
        <div  className='flex flex-col justify-center items-center'>
          
        </div>
          
        </div>
        <div className='flex flex-row justify-center items-center gap-3'>
              {userBlogs.map((blog)=>(
                  <BlogCard
                      Title={blog.BlogTitle}
                      Description={blog.BlogDescription}
                      Creator={blog.creator}
                      Thumbnail={blog.Thumbnail}
                      id={blog.id}/>
              ))}
          </div>
    </>
  )
}

export default ProfilePage