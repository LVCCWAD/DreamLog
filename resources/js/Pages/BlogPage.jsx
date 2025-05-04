import { Button, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';
import Navbar from '../components/Navbar';

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

  return (
    <>
    <Navbar isUser={true}></Navbar>
        <div className='flex flex-col justify-center items-center'>
                      <div className='w-[1250px]'>
                      <a href={`/editblog/${blog.id}`}><Button> edit</Button></a>
                          {/*d2 marga Blog Details */}
                          <div className='flex flex-col justify-center items-center bg-slate-100 p-4'>
                            <img src={`http://localhost:8000/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
                            <Title order={1} fw={1000}>{blog.BlogTitle}</Title>
                            <Text >{blog.BlogDescription}</Text>
                          </div>
        
                          {/* d2 marga components elements */}
                          <div className='flex flex-col'>
                            {elements}
                        </div>
                        </div>
    </div>
    </>
  )
}

export default BlogPage