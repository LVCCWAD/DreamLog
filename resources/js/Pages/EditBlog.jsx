import React, {useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';
import { Button, Text, Title,Drawer, FileInput, TextInput, Group, Modal} from '@mantine/core';

import { useForm as useInertiaForm, router, usePage} from '@inertiajs/react';
import Error404 from './Error404';
import { useDisclosure } from '@mantine/hooks';

function EditBlog({blog, blogComponents: dbComponents, categories,}) {

    

    console.log(blog.categories)
    const { auth } = usePage().props;

    if (auth.user.id !== blog.creator.id) {
        return <Error404/>
      }

    const [blogCategories, setBlogCategories] = useState(blog.categories)
    const [isBlogEdit, setIsBlogEdit] = useState(false)
    const [previewUrl, setPreviewUrl] = useState()

    console.log(blogCategories)
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

          const { data: blogData, setData: setBlogData, post: updateBlog, processing: BlogProcessing, errors: BlogErrors } = useInertiaForm({
                BlogTitle: blog.BlogTitle,
                BlogDescription: blog.BlogDescription,
                Thumbnail: null,
                categories:[]
            });
        
        const submitUpdateBlog = (e) => {
              e.preventDefault();
              console.log(blogData.Thumbnail)
              updateBlog(`/blog/${blog.id}/update`, {
                  forceFormData: true,
              });
              setIsBlogEdit(!isBlogEdit)
              setBlogData('categories', []);
          }

          const removeCategory = ({ id }) => {
            setBlogCategories((prev) => {
              const exists = prev.some(c => c.id === id);

              if (exists) {
                
                router.post(`/category/${blog.id}/remove`, {
                  category: id
                });
              }

              
              return prev.filter(c => c.id !== id);
            });
            setBlogData('categories', (blogData.categories ?? []).filter(cid => cid !== id));
          };

          const handleDelete = () => {
            router.post (`/blog/${blog.id}/delete`)
          }

              useEffect(() => {
                      if (blogData.Thumbnail) {
                          const objectUrl = URL.createObjectURL(blogData.Thumbnail);
                          setPreviewUrl(objectUrl);
              
                          return () => URL.revokeObjectURL(objectUrl);
                      }
                  }, [blogData.Thumbnail]);

    
       const [opened, { open, close }] = useDisclosure(false);

    


  return (
    <> 
        <Navbar  inEdit={true} />
        
        <div className='grid grid-cols-[20%_80%] my-10'>

            {/* d2 marga toolbox */}
            <div className='flex space-x-2 bg-slate-100 h-full'>
                <Button onClick={addTextComponent}>Add Text</Button>
                <Button onClick={addImageComponent}>Add Image</Button>
            </div>

            <div className='flex flex-col justify-center items-center'>
              {/* d2 marga editing Blog */}
              <div className='flex flex-col justify-center items-center'>
                <div className=' border border-b-black w-[1250px] p-10'>
                    <div className="flex gap-2 mb-4">
                    <Button onClick={()=> publish()}>Publish</Button>
                    <Button onClick={()=> setIsBlogEdit(!isBlogEdit)}>EditBlog</Button>
                    <Button color="red" onClick={open}>
                      Delete Blog
                    </Button>

                    <Modal opened={opened} onClose={close} title="Confirm Deletion" centered>
                      <Text size="sm" mb="md">
                        Are you sure you want to delete this blog? This action cannot be undone.
                      </Text>
                      <div className="flex justify-end gap-2">
                        <Button variant="default" onClick={close}>
                          Cancel
                        </Button>
                        <Button color="red" onClick={handleDelete}>
                          Yes, Delete
                        </Button>
                      </div>
                    </Modal>
                  
                </div>
                    {/*d2 marga Blog Details */}
                    {isBlogEdit ? <div className='flex flex-col gap-3'>
                      {blogCategories?.map((category) => (
                        <div className="bg-slate-300 p-4 w-[250px] flex justify-between items-center">
                          <Button className="bg-slate-50 p-3">
                            {category.categoryName}
                          </Button>
                          <Button
                            onClick={() => removeCategory(category)}
                            className="bg-red-400 text-white px-3"
                          >
                            X
                          </Button>
                        </div>
                      ))}
                      <form onSubmit={submitUpdateBlog}>
                                      {
                                          blogData.Thumbnail && previewUrl ? <img src={previewUrl} /> : <></>
                                      }
                                      <FileInput
                                          label="Input Thumbnail"
                                          placeholder="Input png/jpeg"
                                          onChange={(file) => setBlogData('Thumbnail', file)}
                                      />
                                      <div>
                                          {categories?.map((category) => (
                                              <Button
                                                  key={category.id}
                                                  disabled={(blogCategories ?? []).some(c => c.id === category.id)}
                                                  onClick={() => {
                                                          if (!(blogData?.categories || []).includes(category.id)) {
                                                          setBlogCategories((prev)=> [...prev, category])
                                                          setBlogData('categories', [...(blogData?.categories || []), category.id]);
                                                          }
                                                      }}
                                                  className="bg-slate-100 p-3 rounded-md w-[50px]"
                                              >
                                                  <span>{category.categoryName}</span>
                                              </Button>
                                          ))}
                                          </div>
                                      
                                      <TextInput
                                          withAsterisk
                                          label="Blog Title"
                                          placeholder="Blog Title"
                                          value={blogData.BlogTitle}
                                          onChange={(e) => setBlogData('BlogTitle', e.target.value)}
                      
                      
                                      />
                      
                                      <TextInput
                                          withAsterisk
                                          label="Blog Description"
                                          placeholder="Blog Description"
                                          value={blogData.BlogDescription}
                                          onChange={(e) => setBlogData('BlogDescription', e.target.value)}
                      
                                      />
                      
                      
                      
                                      <Group justify="center" mt="md">
                                          <Button type="submit">Submit</Button>
                                      </Group>
                                  </form>
                    </div>:<div className='flex flex-col justify-center items-center'>
                      <img src={`http://localhost:8000/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
                      <Title order={1} fw={1000}>{blog.BlogTitle}</Title>
                      <Text >{blog.BlogDescription}</Text>
                      <Text>Categories: </Text>
                      <div className='flex flex-row gap-3'>
                      {blog.categories?.map((category) => (
                        <Button key={category.id} className='bg-slate-50 p-3 '>{category.categoryName}</Button>
                      ))}
                    </div>
                    </div>}
                    

                    
                  </div>
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
        
    </>
  )
}

export default EditBlog