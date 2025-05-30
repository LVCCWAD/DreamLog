import React from 'react';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import { BackgroundImage } from '@mantine/core';

function CategoryBlogs({ blogs, category }) {
  return (
    <div>
      <Navbar />

      <h1 className="text-9xl font-bold text-start text-gray-900 px-25 mt-6 mb-20 ml-20">
        {category.categoryName}
      </h1>


      <div className="max-w-full mx-auto ml-15 mr-15">
        {/* Banner */}

        <div className="h-[500px] px-24">
          {/* Banner Image */}
          <BackgroundImage
            src={`http://localhost:8000/storage/${category.thumbnail}`}
            radius="sm"
            className="w-full h-full object-cover"
          >
            {/* Gradient Overlay and Title */}
            {/* <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
          <h1 className="text-4xl font-bold text-white">{category.categoryName}</h1>
        </div> */}
          </BackgroundImage>
        </div>


        {/* Blog Cards */}
        {/* <div className="max-w-6xl mx-auto py-10 px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-pink-100"> */}
        <div className="max-w-full mx-auto my-auto p-10 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-pink-100 mt-16 ml-25 mr-25">
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
    </div>
  );
}

export default CategoryBlogs;
