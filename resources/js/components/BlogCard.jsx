import React from 'react'
import { Card, Image, Text, Badge, Button, Group ,Avatar } from '@mantine/core';

function BlogCard({Title, Description,Thumbnail , Creator}) {
  return (
    <div className='w-[400px] h-[600px]'>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section component="a" href="https://mantine.dev/">
            <Image
                src={`http://localhost:8000/storage/${Thumbnail}`}
                height={160}
          
            />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={800}>{Title}</Text>
            <Badge color="pink">Follow</Badge>
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