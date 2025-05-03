import React, {useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';
import { Button, Text, Title,Drawer} from '@mantine/core';

import { useForm as useInertiaForm} from '@inertiajs/react';

function EditBlog({blog, isUser, blogComponents: dbComponents}) {
    console.log(dbComponents)
    useEffect(() => {
      
      let initialElements = [];
      
      
      dbComponents.forEach((comp) => {
        if (comp.Type === 'text') {
          initialElements.push(
            <BlogComponentText
              key={`text-${comp.Position}`}
              id={comp.id}
              position={comp.Position}
              type={'text'}
              content={comp.Content}
              handleChange={handleChange}
              deleteElement={deleteElement}
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
              handleChange={handleChange}
              deleteElement={deleteElement}
            />
          );
        }
      });
      
      
      setElements(initialElements);
    }, []);

    const [elements, setElements] = useState([]);

    const { data: blogComponents, setData: setBlogComponents, post: createBlogComponents, processing: BlogComponentsProcessing, errors: BlogComponentsErrors } = useInertiaForm({ 
      Components: [], 
      
    });
  
    const save = () => {
      const newComponents = elements.filter(element => {
        return !blogComponents.Components.some(obj => obj.position === element.props.position);
      }).map(element => {
        
        const componentData = {
          position: element.props.position,
          type: element.props.type,
          id: element.props.id ? element.props.id : null
        };
        
        
        if (element.props.type === 'image') {
          componentData.content = {};
        } else {
          componentData.content = "";
        }
        
        return componentData;
      });
      
      setBlogComponents(prevState => ({
        Components: [...prevState.Components, ...newComponents],
      }));
    };


    
    useEffect(() => {
      console.log("Updated components:", blogComponents);
      console.log("Updated elements:", elements);
    }, [blogComponents]);

    useEffect(() => {
      save()
    }, [elements]);

    const handleChange = (position, content) => {
      setBlogComponents((prevState) => ({
        ...prevState,
        Components: prevState.Components.map((component) =>
          component.position === position
          ? { ...component, content }: component
        ),
      }));
    }

    const deleteElement = (positionToDelete) => {
      console.log(positionToDelete)
      setElements((el) => el.filter((el) => el.props.position !== positionToDelete));
    
      setBlogComponents((prevState) => ({
        ...prevState,
        Components: prevState.Components.filter((component) => component.position !== positionToDelete)
      }))
    };

    const getNextPosition = (elements) => {
      if (elements.length === 0) {
        return 1; 
      }
    
      let maxPosition = elements[0].props.position;
      for (let i = 1; i < elements.length; i++) {
        if (elements[i].props.position > maxPosition) {
          maxPosition = elements[i].props.position;
        }
      }
      return maxPosition + 1;
    };
    
    


  const addTextComponent = () => {
    const position = getNextPosition(elements);
    setElements([
      ...elements,
      <BlogComponentText
        key={`text-${position}`}
        position={position}
        type={'text'}
        content={""}
        handleChange={handleChange}
        deleteElement={deleteElement}
        
      />,
    ]);
  };

  const addImageComponent = () => {
    const position = getNextPosition(elements);
    setElements([
      ...elements,
      <BlogComponentImage
        key={`image-${position}`}
        position={position}
        type={'image'}
        content={""}
        handleChange={handleChange}
        deleteElement={deleteElement}
       
      />,
    ]);
  }

  const publish = () => {
    createBlogComponents(`/createcomponents/${blog.id}`, {
        forceFormData: true,
      });
}

  
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
                  <Button onClick={()=> publish()}>Publish</Button>
                  {/*d2 marga Blog Details */}
                  <div className='flex flex-col justify-center items-center'>
                    <img src={`http://localhost:8000/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
                    <Title order={1} fw={1000}>{blog.BlogTitle}</Title>
                    <Text >{blog.BlogDescription}</Text>
                  </div>

                  {/* d2 marga components elements */}
                  <div>
                    {elements.map((element, index) => (
                        <React.Fragment key={`element-${element.props.position}`}>
                            {element}
                        </React.Fragment>
                    ))}
                </div>
                </div>
              </div>
              
        </div>
        
    </>
  )
}

export default EditBlog