import { Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';

function BlogPage({isUser, user, components, blog}) {
    console.log(blog)
    const [elements, setElements] = useState()

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
                <BlogComponentImage
                  key={`image-${comp.Position}`} 
                  position={comp.Position}
                  type={'image'}
                  id={comp.id}
                  content={comp.Content} 
                  componentEdit = {false}
                />
              );
            }
          });
          
          
          setElements(initialElements);
        }, []);

  return (
    <div>
        <div className='flex flex-col justify-center items-center'>
            <img src={`http://localhost:8000/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
            <Title order={1} fw={1000}>{blog.BlogTitle}</Title>
            <Text>{blog.BlogDescription}</Text>
        </div>
        {elements}
    </div>
  )
}

export default BlogPage