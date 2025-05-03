import React, { Component, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';
import { Button, Text, Title,Drawer} from '@mantine/core';

import { useForm as useInertiaForm} from '@inertiajs/react';

function EditBlog({blog, isUser}) {
    const [elements, setElements] = useState([]);

    const { data: blogComponents, setData: setBlogComponents, post: createBlogComponents, processing: BlogComponentsProcessing, errors: BlogComponentsErrors } = useInertiaForm({ 
      Components: [], 
      
    });
  
    const save = () => {
      const newComponents = elements.map((element) => ({
        position: element.props.position,
        type: element.props.type,
        content: "",
      }));
    
      setBlogComponents(() => ({
        Components: [...newComponents],
      }));

    };
    
    useEffect(() => {
      console.log("Updated components:", blogComponents);
    }, [blogComponents]);

    const handleChange = (position, content) => {
    
      // blogComponents.Components.map((component) =>
      //   component.prop.position == position ? component.content = content : ""
      // )

      
      
      setBlogComponents((component) => elements.map((individualComponent) =>
        individualComponent.position == position ? { 
          position: element.props.position,
          type: element.props.type,
          content: content, 
        } : { 
          position: element.props.position,
          type: element.props.type,
          content: "",
        }
    ));
    }


  const addTextComponent = () => {
    const position = elements.length + 1;
    setElements([...elements, <BlogComponentText type={"text"} position={position} handleChange={handleChange}/>]);
  };

  const addImageComponent = () => {
    const position = elements.length;
    setElements([...elements, <BlogComponentImage type={'image'} position={position} handleChange={handleChange}/>]);
  };

  
  return (
    <> 
        <Navbar isUser={isUser} inEdit={true}/>
        
        <div className='grid grid-cols-[20%_80%] my-10'>
            {/* d2 marga toolbox */}
            <div className='bg-slate-100 h-full'>
                <Button onClick={addTextComponent}>Add Text</Button>
                <Button onClick={addImageComponent}>Add Image</Button>
            </div>

            {/* d2 marga editing Blog */}
            <div className='flex flex-col justify-center items-center'>
              <div className=' border border-b-black w-[1250px] p-10'>

                  {/*d2 marga Blog Details */}
                  <div className='flex flex-col justify-center items-center'>
                    <img src={`http://localhost:8000/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
                    <Title order={1} fw={1000}>{blog.BlogTitle}</Title>
                    <Text >{blog.BlogDescription}</Text>
                  </div>

                  {/* d2 marga components elements */}
                    <div>
                        {elements}
                    </div>
                </div>
              </div>
              <button onClick={()=> save()}>save</button>
        </div>
        
    </>
  )
}

export default EditBlog