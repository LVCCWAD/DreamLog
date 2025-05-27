import React from 'react';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import { BackgroundImage } from '@mantine/core';

function CategoryBlogs({ blogs, category }) {
  return (
    <div className=" bg-gray-100">
      <Navbar />

      {/* Banner */}
      <div className="relative w-full h-[600px]">
      {/* Banner Image */}
      <BackgroundImage
        src={`http://localhost:8000/storage/${category.thumbnail}`}
        radius="sm"
        className="w-full h-full object-cover"
      >
        {/* Gradient Overlay and Title */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
          <h1 className="text-4xl font-bold text-white">{category.categoryName}</h1>
        </div>
      </BackgroundImage>
    </div>
     

      {/* Blog Cards */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {blogs.map((blog) => (
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
    </div>
  );
}

export default CategoryBlogs;
