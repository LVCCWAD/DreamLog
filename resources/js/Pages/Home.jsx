import React from 'react'
import Navbar from '../components/Navbar'
import { Carousel } from '@mantine/carousel';
import { Button, Image, Paper } from '@mantine/core';
import BlogCard from '../components/BlogCard';
import { Text, Title } from '@mantine/core';
import CategoriesCard from '../components/CategoriesCard';
import { usePage } from '@inertiajs/react';

function Card({ image, title, category, id }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={"card"}
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <Text className="category" size="xs">
            {category}
          </Text>
          <Title order={1} className={"title"}>
            {title}
          </Title>
        </div>
        <a href={`/blog/${id}`}>
          <Button variant="white" color="dark">
            Read Blog
          </Button>
        </a>
      </div>
    </Paper>
  );
}


function Home({ blogs }) {

  const { categories, url } = usePage().props;

  return (
    <>
  <Navbar categories={categories} />

  <div className="flex flex-col gap-20 w-full">
    {/* Top Blogs Section */}
    <section className="flex flex-col justify-center items-center w-full gap-5">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-black p-5">
        TOP BLOGS
      </h1>
      <Carousel withIndicators className="h-[400px] w-full max-w-[1500px] px-4">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 5)
          .map((blog) => (
            <Carousel.Slide key={blog.id}>
              <Card
                image={`${url}/storage/${blog.Thumbnail}`}
                title={blog.BlogTitle}
                category={blog.BlogCategory}
                id={blog.id}
              />
            </Carousel.Slide>
          ))}
      </Carousel>
    </section>

    {/* Most Viewed Section */}
    <section className="w-full bg-pink-50 rounded-xl pb-10">
      <Title order={2} className="p-10">MOST VIEWED BLOGS</Title>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {blogs
          .sort((a, b) => b.view_count - a.view_count)
          .slice(0, 5)
          .map((blog) => (
            <BlogCard
              key={blog.id}
              Title={blog.BlogTitle}
              Description={blog.BlogDescription}
              Creator={blog.creator}
              Thumbnail={blog.Thumbnail}
              id={blog.id}
              likes={blog.likes}
              view_count={blog.view_count}
              categories={blog.categories}
            />
          ))}
      </div>
    </section>

    {/* Discover More Section */}
    <section className="w-full rounded-xl pb-10">
      <Title order={2} className="p-10">DISCOVER MORE</Title>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            Title={blog.BlogTitle}
            Description={blog.BlogDescription}
            Creator={blog.creator}
            Thumbnail={blog.Thumbnail}
            id={blog.id}
            likes={blog.likes}
            view_count={blog.view_count}
            categories={blog.categories}
          />
        ))}
      </div>
    </section>

    {/* Categories Section */}
    <section className="w-full flex flex-col items-start bg-pink-50 rounded-xl pt-10">
      <Title order={2} className="p-10">MULTIPLE CATEGORIES TO CHOOSE</Title>
      <div className="flex flex-wrap gap-5 px-10 pb-10">
        {categories.map((category) => (
          <a key={category.id} href={`category/${category.id}`}>
            <CategoriesCard
              Category={category.categoryName}
              Thumbnail={category.thumbnail}
            />
          </a>
        ))}
      </div>
    </section>
  </div>

  {/* Footer */}
  <footer className="h-[100px] mt-[100px] flex flex-col justify-center items-center bg-slate-200">
    <span>© 2025 Dream Log. All Rights Reserved.</span>
  </footer>
</>
// adadassdsad


  )
}

export default Home