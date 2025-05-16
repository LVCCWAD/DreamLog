import React from 'react'
import { Card, Image, Text, Badge, Button, Group ,Avatar } from '@mantine/core';
import { router } from '@inertiajs/react';

function BlogCard({Title, Description,Thumbnail , Creator, id, authUser , likes}) {
    console.log(Creator)

    const handleFollow = () =>{
        router.post(`/profile/${authUser.id}/follow`, {
                      user_id: Creator.id
                    });
    }

    const handleUnFollow = () =>{
        router.post(`/profile/${authUser.id}/unfollow`, {
                      user_id: Creator.id
                    });
    }

    const handleLike = () =>{
        router.post(`/like/blog`, {
                      blog_id: id
                    });
    }

    const handleUnlike = () =>{
        router.post(`/unlike/blog`, {
                      blog_id: id
                    });
    }
     
    const followed = authUser?.followings.some(following => following.id == Creator?.id)
    const isLiked = authUser?.liked_blogs?.some(blog => blog.id === id);

    const likesCount = likes?.length || 0;
    
  return (
    <div className='w-[300px] h-[300px]'>
       
            <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={`http://localhost:8000/storage/${Thumbnail}`}
                    height={160}
            
                />
            </Card.Section>
            
            <Group justify="space-between" mt="md" mb="xs">
                
                    <Text fw={800}><a href={`/blog/${id}`}>{Title}</a></Text>
               {authUser?.id !== Creator?.id && (
                    <>
                    {!followed ? (
                        <Badge color="pink" onClick={handleFollow} className="cursor-pointer">Follow</Badge>
                    ) : (
                        <Badge color="pink" onClick={handleUnFollow} className="cursor-pointer">Un Follow</Badge>
                    )}

                    
                    </>
                )}
                {isLiked ? (
                        <Badge color="red" onClick={handleUnlike} className="cursor-pointer">♥ Liked</Badge>
                    ) : (
                        <Badge color="gray" onClick={handleLike} className="cursor-pointer">♡ Like</Badge>
                    )}
            </Group>
                                                                 
                
            

            <Text size="m">
                {Description}
            </Text>
            <Text size="m">
                {likesCount}
            </Text>
            

            <div className='flex flex-row justify-center items-center gap-5 m-3'>
                
                <Avatar radius="xl" />
                <Text size="xs" c="dimmed">
                    Created By: {Creator.name}
                </Text>

            </div>
            

            
            </Card>
        
    </div>
  )
}

export default BlogCard