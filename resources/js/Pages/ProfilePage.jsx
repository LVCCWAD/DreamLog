import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';

function ProfilePage({user, userBlogs, isUser}) {
    console.log(userBlogs)
  return (
    <>
        <Navbar isUser={isUser}/>
        <div  className='flex flex-col justify-center items-center h-[900px]'>
          
        <div  className='flex flex-col justify-center items-center'>
          {user.name}
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
        </div>
    </>
  )
}

export default ProfilePage