import React from 'react'
import { Card, Image, Text, Badge, Button, Group ,Avatar } from '@mantine/core';

function BlogCard() {
  return (
    <div className='w-[400px] h-[600px]'>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section component="a" href="https://mantine.dev/">
            <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
            />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={800}>Norway Fjord Adventures</Text>
            <Badge color="pink">Follow</Badge>
        </Group>

        <Text size="m">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
        </Text>

        <div className='flex flex-row justify-center items-center gap-5 m-3'>
            
            <Avatar radius="xl" />
            <Text size="xs" c="dimmed">
                Created By: User
            </Text>

        </div>
        

        
        </Card>
    </div>
  )
}

export default BlogCard