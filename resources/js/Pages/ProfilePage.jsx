import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';

function ProfilePage({user, userBlogs, isUser}) {
    console.log(userBlogs)
  return (
    <>
        <Navbar isUser={isUser}/>
        <div>
            {userBlogs.map((blog)=>(
                <BlogCard
                    Title={blog.BlogTitle}
                    Description={blog.BlogDescription}
                    Creator={blog.creator}
                    Thumbnail={blog.Thumbnail}/>
            ))}
        </div>
    </>
  )
}

export default ProfilePage