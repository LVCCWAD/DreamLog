import React from 'react'
import { Card, Image, Text, Badge, Button, Group ,Avatar } from '@mantine/core';
import { router, usePage } from '@inertiajs/react';


function formatLikes(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
}

function BlogCard({Title, Description,Thumbnail , Creator, id,  likes, view_count}) {
    console.log(Creator)

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
    <div className='w-[300px] p-4 h-full'>
       
            <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={`${url}/storage/${Thumbnail}`}
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
            
            
           
            <div className='flex flex-row justify-center items-center gap-4 m-1'>
                 <a href={`/profile/${Creator?.id}`}>
                <div className='flex flex-row justify-center items-center gap-4 m-1'>
                     <Avatar
                        src={`${url}/storage/${Creator.profile.profilePicture}`}
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
            <Card.Section>
                <div className='p-4 flex flex-row justify-between'>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-3 h-3">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                        2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
                        2.09C13.09 3.81 14.76 3 16.5 
                        3 19.58 3 22 5.42 22 8.5c0 
                        3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        </div>
                        <span>{formatLikes(likesCount)}</span>
                    </div>

                    <span className='text-gray-600'>Views: {view_count}</span>
                </div>

            </Card.Section>
            

            
            </Card>
        
    </div>
  )
}

export default BlogCard