import React from 'react'
import { Card, Image, Text, Badge, Button, Group ,Avatar } from '@mantine/core';
import { router } from '@inertiajs/react';

function BlogCard({Title, Description,Thumbnail , Creator, id, authUser}) {

    const handleFollow = () =>{
        router.post(`/profile/${authUser.id}/follow`, {
                      user_id: Creator.id
                    });
    }
     
    
    
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
                    <a href={`/blog/${id}`} >
                        <Text fw={800}>{Title}</Text>
                    </a>
                    <Badge color="pink" onClick={()=> handleFollow()}>Follow</Badge>
                </Group>
            

            <Text size="m">
                {Description}
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