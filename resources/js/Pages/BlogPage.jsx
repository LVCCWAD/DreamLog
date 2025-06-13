import { Avatar, Badge, Button, Group, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';
import Navbar from '../components/Navbar';
import { router, useForm as useInertiaForm, usePage } from '@inertiajs/react';

function formatLikes(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
}

function BlogPage({components, blog}) {
    console.log(blog)
    const { auth,url } = usePage().props;
    const [elements, setElements] = useState()
    const authUser = auth.user
    const [likesOpen, setLikesOpen] = useState(false);

    useEffect(() => {
          
          let initialElements = [];
          
          
          components.forEach((comp) => {
            if (comp.Type === 'text') {
              initialElements.push(
                <BlogComponentText
                  key={`text-${comp.Position}`}
                  id={comp.id}
                  position={comp.Position}
                  type={'text'}
                  content={comp.Content}
                  componentEdit = {false}
                />
              );
            } else if (comp.Type === 'image') {
              initialElements.push(
                <div className="flex justify-center w-full my-4">
                    <BlogComponentImage
                        key={`image-${comp.Position}`} 
                        position={comp.Position}
                        type={'image'}
                        id={comp.id}
                        content={comp.Content} 
                        componentEdit = {false}
                        />
                </div>
                
              );
            }
          });
          
          
          setElements(initialElements);
        }, []);

        const handleLike = () => {
            router.post('/like/blog', { blog_id: blog.id }, {
              preserveScroll: true,
              preserveState: true,
              replace: true,
              onSuccess: () => console.log('Liked!'),
            });
          };
        
          const handleUnlike = () => {
                router.post('/unlike/blog', { blog_id: blog.id }, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => console.log('Unliked!'),
                });
            }

            const isLiked = authUser?.liked_blogs?.some(b => b.id === blog.id);
            const likesCount = blog.likes?.length || 0;

  
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar />

  <div className="flex flex-col items-center p-6 bg-pink-50">
    <div className="w-full max-w-[1250px]">
      
      {/* Edit Button */}
      {auth.user.id === blog.creator.id && (
        <div className="mb-4">
          <a href={`/editblog/${blog.id}`}>
            <Button color="pink">Edit</Button>
          </a>
        </div>
      )}

      {/* Blog Header Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col gap-3">
        <img
          src={`${url}/storage/${blog.Thumbnail}`}
          alt="Thumbnail"
          className="w-full h-[500px] object-cover rounded-md mb-6"
        />

        {/* Title and Like Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <Title order={1} fw={1000} className="text-pink-900">
            {blog.BlogTitle}
          </Title>
          <div>
            {isLiked ? (
              <Button
                color="pink"
                variant="filled"
                className="cursor-pointer text-sm px-4 py-2"
                onClick={ handleUnlike}
                radius="lg"
              >
                ♥  {formatLikes(likesCount)}
              </Button>
            ) : (
              <Button
                color="gray"
                variant="light"
                className="cursor-pointer text-sm px-4 py-2"
                onClick={handleLike}
                radius="lg"
              >
                ♡  {formatLikes(likesCount)}
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <Text className="text-gray-800 leading-relaxed">
          {blog.BlogDescription}
        </Text>

        {/* Categories */}
        <div className="mt-4">
          <span className="font-bold text-pink-800">Categories:</span>
          <div className="flex flex-wrap mt-2 gap-2">
            {blog.categories.map((category) => (
              <span
                key={category.id}
                className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
              >
                {category.categoryName}
              </span>
            ))}
          </div>
        </div>
        <a href={`/profile/${blog.creator?.id}`} className="flex items-center gap-4">
          <Avatar
            src={`${url}/storage/${blog.creator?.profile.profilePicture}`}
            size={50}
            radius={999}
            alt={blog.creator?.profile.userName}
            className="border-4 border-white shadow-md"
          />
          <Text size="sm" c="dimmed">
            Created By: {blog.creator?.name}
          </Text>
        </a>
      </div>

      {/* Liked By Section */}
      {blog.likes?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <Title order={4}>Liked by:</Title>
            <Button
              size="xs"
              variant="light"
              color="pink"
              onClick={() => setLikesOpen(!likesOpen)}
            >
              {likesOpen ? "Hide" : `Show (${blog.likes.length})`}
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            {(likesOpen ? blog.likes : blog.likes.slice(0, 5)).map((user) => (
              <a
                key={user.id}
                href={`/profile/${user.id}`}
                className="flex items-center gap-2 bg-pink-50 px-3 py-2 rounded-lg shadow-sm"
              >
                <Avatar
                  src={`${url}/storage/${user.profile?.profilePicture}`}
                  size={40}
                  radius="xl"
                  alt={user.name}
                />
                <Text size="sm">{user.name}</Text>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Creator Info */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-center">
        
      </div>

      {/* Dynamic Elements Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {elements}
      </div>
    </div>
  </div>
</div>

  )
}

export default BlogPage