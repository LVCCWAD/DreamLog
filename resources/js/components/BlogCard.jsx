import React from 'react'
import { Card, Image, Text, Badge, Button, Group ,Avatar } from '@mantine/core';
import { router, usePage } from '@inertiajs/react';
import EyeImage from '../assets/eye-alt.png';

function formatLikes(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
}

function BlogCard({Title, Description,Thumbnail , Creator, id,  likes, view_count,categories}) {
    console.log(categories)

    const { auth, url } = usePage().props;

    const authUser = auth.user;

    const handleFollow = () =>{
        router.post(`/profile/${authUser.id}/follow`, {
                      user_id: Creator.id
                    },
                {
        preserveScroll: true,
        preserveState: true,
        replace: true,
       
        });
    }

    const handleUnFollow = () =>{
        router.post(`/profile/${authUser.id}/unfollow`, {
                      user_id: Creator.id
                    },
                {
        preserveScroll: true,
        preserveState: true,
        replace: true,
       
        });
    }

   
  const handleLike = () => {
    router.post('/like/blog', { blog_id: id }, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onSuccess: () => console.log('Liked!'),
    });
  };

  const handleUnlike = () => {
        router.post('/unlike/blog', { blog_id: id }, {
        preserveScroll: true,
        preserveState: true,
        replace: true,
        onSuccess: () => console.log('Unliked!'),
        });
    }
  
     
    const followed = authUser?.followings.some(following => following.id == Creator?.id)
    const isLiked = authUser?.liked_blogs?.some(blog => blog.id === id);

    const likesCount = likes?.length || 0;
    
  return (
    <div className="w-[300px] p-4 h-full">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {/* Thumbnail Section */}
        <Card.Section>
          <Image
            src={`${url}/storage/${Thumbnail}`}
            height={160}
            className="object-cover w-full h-[200px]"
          />
        </Card.Section>

        {/* Title */}
        <Text fw={700} size="lg" align="left" mt="md">
          <a href={`/blog/${id}`}>{Title}</a>
        </Text>

        {/* Creator and Follow Section */}
        <div className="flex justify-between items-start mt-2">
          <a href={`/profile/${Creator?.id}`}>
            <div className="flex items-center gap-2">
              <Avatar
                src={`${url}/storage/${Creator.profile.profilePicture}`}
                size={30}
                radius="xl"
                alt={Creator.profile.userName}
                className="border-2 border-white shadow-md"
              />
              <Text size="xs" c="dimmed">
                Created By: {Creator.name}
              </Text>
            </div>
          </a>

          {authUser?.id !== Creator?.id && (
            !followed ? (
              <Button
                size="xs"
                color="red"
                variant="filled"
                onClick={handleFollow}
                radius="xl"
              >
                FOLLOW
              </Button>
            ) : (
              <Button
                size="xs"
                color="gray"
                variant="light"
                onClick={handleUnFollow}
                radius="xl"
              >
                UNFOLLOW
              </Button>
            )
          )}
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-[0.5em] mt-3">
          {categories.map((category) => (
            <a key={category.id} href={`category/${category.id}`} >
            <Button
                                    key={category.id}
                                    size="xs"
                                    variant="light" 
                                    color= "pink"
                                    
                                >
                                    {category.categoryName}
                                </Button></a>
          ))}
        </div>

        {/* Likes and Views */}
        <div className="flex justify-between items-center mt-3">
          <div>
            {isLiked ? (
              <Button
                color="pink"
                variant="filled"
                className="cursor-pointer px-3 py-1 text-sm"
                onClick={handleUnlike}
                radius="lg"
              >
                ♥ {formatLikes(likesCount)}
              </Button>
            ) : (
              <Button
                color="gray"
                variant="light"
                className="cursor-pointer px-3 py-1 text-sm"
                onClick={handleLike}
                radius="lg"
              >
                ♡  {formatLikes(likesCount)}
              </Button>
            )}
          </div>

          <Text size="xs">
            <span className="flex flex-row gap-1 text-gray-500">
              <img src={EyeImage} alt="Views" className="w-4 h-4" />
              {view_count}
            </span>
          </Text>
        </div>
      </Card>
    </div>

      );
    }

export default BlogCard;
