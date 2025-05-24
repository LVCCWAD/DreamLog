import { Button, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';
import Navbar from '../components/Navbar';
import { useForm as useInertiaForm } from '@inertiajs/react';

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
                      <a href={`/editblog/${blog.id}`}><Button className="mb-3"> Edit </Button></a>
                          {/*d2 marga Blog Details */}
                          <div className='flex flex-col justify-center items-center bg-slate-100 p-4 rounded-lg'>
                            <img src={`http://localhost:8000/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
                            <Title order={1} fw={1000}>{blog.BlogTitle}</Title>
                            <Text >{blog.BlogDescription}</Text>
                          </div>
                          <div>
                              <span className="font-bold">Categories:</span>
                              {blog.categories.map((category) => (
                                
                                <span key={category.id} className="px-4 py-2 inline-block">
                                  {category.categoryName}
                                </span>
                              ))}
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