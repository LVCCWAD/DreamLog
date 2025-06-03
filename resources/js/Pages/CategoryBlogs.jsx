import React from 'react';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import { BackgroundImage } from '@mantine/core';
import { usePage } from '@inertiajs/react';

function CategoryBlogs({ blogs, category }) {
  const { url } = usePage().props;
  return (
    <div>
      <Navbar />

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-start text-gray-900 px-24 mt-5 mb-10 ml-5">
        {category.categoryName}
      </h1>


      <div className="max-w-full mx-auto ml-5 mr-5">

        {/* Banner */}
        <div className="h-[300px] mx-auto ">
          {/* Banner Image */}
          <BackgroundImage
            src={`${url}/storage/${category.thumbnail}`}
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
        <div className="max-w-full mx-auto p-6 sm:px-10 md:px-16 lg:px-24 py-5 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-pink-100 mt-10 mb-5 rounded-lg">
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
