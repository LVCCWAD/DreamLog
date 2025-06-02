import React from 'react'
import { Card, Image, Text, Badge, Button, Group ,Avatar } from '@mantine/core';
import { router, usePage } from '@inertiajs/react';

function BlogCard({Title, Description,Thumbnail , Creator, id,  likes}) {
    console.log(Creator)

    const { auth } = usePage().props;

    const authUser = auth.user;

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
    <div className='w-[300px] p-4 h-full'>
       
            <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={`http://localhost:8000/storage/${Thumbnail}`}
                    height={160}
                    className="object-cover w-full h-[200px]" 
                />
            </Card.Section>
            
            <Group justify="space-between" mt="md" mb="xs"> {/*mb="xs"*/}
                
                    <Text fw={800}><a href={`/blog/${id}`}>{Title}</a></Text>
               
                {isLiked ? (
                        <Badge color="red" onClick={handleUnlike} className="cursor-pointer">♥ Liked</Badge>
                    ) : (
                        <Badge color="gray" onClick={handleLike} className="cursor-pointer">♡ Like</Badge>
                    )}
            </Group>
                                                                 
                
            

            <Text size="md">
                {Description}
            </Text>
            <Text size="xs">
                {likesCount}
            </Text>
            
           
            <div className='flex flex-row justify-center items-center gap-4 m-1'>
                 <a href={`/profile/${Creator?.id}`}>
                <div className='flex flex-row justify-center items-center gap-4 m-1'>
                     <Avatar
                        src={`http://localhost:8000/storage/${Creator.profile.profilePicture}`}
                        size={50}
                        radius={999}
                        alt={Creator.profile.userName}
                        className="border-4 border-white shadow-md"
                        />
                    <Text size="xs" c="dimmed">
                        Created By: {Creator.name}
                    </Text>
                </div>
                </a>
                {authUser?.id !== Creator?.id && (
                    <>
                    {!followed ? (
                        <Badge color="pink" onClick={handleFollow} className="cursor-pointer">Follow</Badge>
                    ) : (
                        <Badge color="pink" onClick={handleUnFollow} className="cursor-pointer">Unfollow</Badge>
                    )}

                    
                    </>
                )}


            </div>
            
            

            
            </Card>
        
    </div>
  )
}

export default BlogCard