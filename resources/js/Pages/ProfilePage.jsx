import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { BackgroundImage, Image } from '@mantine/core';
import ProfileBanner from '../components/ProfileBanner';
import { usePage } from '@inertiajs/react';

function ProfilePage({user, userBlogs, categories,}) {

  const { auth } = usePage().props;
  const authUser = auth.user;
  
    
    const profile = user.profile

    const publishedBlogs = userBlogs.filter(blog => blog.Visibility === 'public');
    const draftBlogs = userBlogs.filter(blog => blog.Visibility === 'private');
    
  return (
    <>
        <Navbar  categories={categories}/>
        
        <ProfileBanner
            profile={profile}
            user={user}
            />
       <div>
      {/* Published Section */}
      <h2 className='text-xl font-bold mb-2'>Published</h2>
      <div className='flex flex-wrap justify-center items-center gap-3'>
        {publishedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            Title={blog.BlogTitle}
            Description={blog.BlogDescription}
            Creator={blog.creator}
            Thumbnail={blog.Thumbnail}
            id={blog.id}
            likes={blog.likes}
          />
        ))}
      </div>

      {authUser.id === user.id && 
      (<><h2 className='text-xl font-bold mt-6 mb-2'>Drafts</h2>
      <div className='flex flex-wrap justify-center items-center gap-3'>
        {draftBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            Title={blog.BlogTitle}
            Description={blog.BlogDescription}
            Creator={blog.creator}
            Thumbnail={blog.Thumbnail}
            id={blog.id}
            likes={blog.likes}
          />
        ))}
      </div></>)}
      
    </div>
    </>
  )
}

export default ProfilePage