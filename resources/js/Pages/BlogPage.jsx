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
                      <a href={`/editblog/${blog.id}`}><Button> edit</Button></a>
                          {/*d2 marga Blog Details */}
                          <div className='flex flex-col justify-center items-center bg-slate-100 p-4'>
                            <img src={`http://localhost:8000/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
                            <Title order={1} fw={1000}>{blog.BlogTitle}</Title>
                            <Text >{blog.BlogDescription}</Text>
                          </div>
                          Categories: 
                          {blog.categories.map((category) => (
                                                
                                                  <span className="bg-slate-50 p-3">
                                                    {category.categoryName}
                                                  </span>
                                                 
                                               
                                              ))}

                          {/* <form onSubmit={submitBlog}>
                                  {
                                      blogData.Thumbnail && previewUrl ? <img src={previewUrl} /> : <></>
                                  }
                                  <FileInput
                                      label="Input Thumbnail"
                                      placeholder="Input png/jpeg"
                                      onChange={(file) => setBlogData('Thumbnail', file)}
                                  />
                                  <div>
                                      {categories.map((category) => (
                                          <Button
                                          key={category.id}
                                          onClick={() => {
                                              if (!(blogData.categories || []).includes(category.id)) {
                                              setBlogData('categories', [...(blogData.categories || []), category.id]);
                                              }
                                          }}
                                          className='bg-slate-100 p-3 rounded-md w-[50px]'
                                          >
                                          <span>{category.categoryName}</span>
                                          </Button>
                                      ))}
                                      </div>
                                  
                                  <TextInput
                                      withAsterisk
                                      label="Blog Title"
                                      placeholder="Blog Title"
                                      onChange={(e) => setBlogData('BlogTitle', e.target.value)}
                  
                  
                                  />
                  
                                  <TextInput
                                      withAsterisk
                                      label="Blog Description"
                                      placeholder="Blog Description"
                                      onChange={(e) => setBlogData('BlogDescription', e.target.value)}
                  
                                  />
                  
                  
                  
                                  <Group justify="center" mt="md">
                                      <Button type="submit">Submit</Button>
                                  </Group>
                              </form> */}

                          {/* {categories.map((category) => (
                                                  <Button
                                                  key={category.id}
                                                  onClick={() => {
                                                      if (!(blogData.categories || []).includes(category.id)) {
                                                      setBlogData('categories', [...(blogData.categories || []), category.id]);
                                                      }
                                                  }}
                                                  className='bg-slate-100 p-3 rounded-md w-[50px]'
                                                  >
                                                  <span>{category.categoryName}</span>
                                                  </Button>
                                              ))}
                                              </div> */}
        
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