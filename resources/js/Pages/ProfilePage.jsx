import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { BackgroundImage, Image } from '@mantine/core';
import ProfileBanner from '../components/ProfileBanner';

function ProfilePage({user, userBlogs, isUser, categories, authUser}) {
    console.log(userBlogs)
    console.log(authUser)
    const profile = user.profile
    console.log(profile.profilePicture)
  return (
    <>
        <Navbar isUser={isUser} categories={categories} authUser={authUser}/>
        
        <ProfileBanner
            user={user}
            authUser={authUser}/>
        <div className='flex flex-wrap justify-center items-center gap-3'> {/*justify-center*/}
              {userBlogs.map((blog)=>(
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
    </>
  )
}

export default ProfilePage