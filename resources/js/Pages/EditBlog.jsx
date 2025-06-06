import React, {useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogComponentText from '../components/BlogComponentText';
import BlogComponentImage from '../components/BlogComponentImage';
import { Button, Text, Title,Drawer, FileInput, TextInput, Group, Modal, Notification} from '@mantine/core';
import PencilIcon from '../assets/pencil-square.png';
import ImageIcon from '../assets/image-plus.png';
import { useForm as useInertiaForm, router, usePage} from '@inertiajs/react';
import Error404 from './Error404';
import { useDisclosure } from '@mantine/hooks';

function EditBlog({blog, blogComponents: dbComponents, categories,}) {

    const [snackbar, setSnackbar] = useState({ message: '', color: '', icon: null });
      const [showSnackbar, setShowSnackbar] = useState(false);
    
      const showNotification = (message, color = 'red', icon = <IconX size={16} />) => {
        setSnackbar({ message, color, icon });
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
      };

    console.log(blog.categories)
    const { auth, url } = usePage().props;

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
      preserveScroll: true,
      onError: (BlogComponentsErrors) => {
        if (BlogComponentsErrors.empty_components) {
          showNotification(BlogComponentsErrors.empty_components);
          console.log(BlogComponentsErrors)
        }

      },
    });
  };
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
        
        <div className='grid grid-cols-[20%_80%] my-5'>

        {/* d2 marga toolbox */}
        <div className="flex flex-col items-start bg-slate-0 rounded-sm border border-black pl-3 pt-10 space-y-4 min-h-full max-w-[120px]">
        <Button variant="filled" color="pink" radius="lg" size="lg" onClick={addTextComponent}>
        <img src={PencilIcon} alt="Pencil Icon" className="w-6 h-6" /></Button>
          
        <Button variant="filled" color="pink" radius="lg" size="lg" onClick={addImageComponent}>
        <img src={ImageIcon} alt="Image Icon" className="w-6 h-6" /></Button> </div>

            <div className='flex flex-col justify-center items-center'>
              {/* d2 marga editing Blog */}
              <div className='flex flex-col justify-center items-center'>
                 {showSnackbar && (
                                    <Notification
                                    icon={snackbar.icon}
                                    color={snackbar.color}
                                    title="Error"
                                    withCloseButton
                                    onClose={() => setShowSnackbar(false)}
                                    style={{ zIndex: 1000 }}
                                    className='w-full m-2'
                                    >
                                    {snackbar.message}
                                    </Notification>
                                )}
                                
                <div className=' border border-b-black w-[1250px] p-10'>
                    <div className="flex gap-2 mb-4">
                    <Button color="pink" onClick={() => publish()} > Publish </Button>
                    <Button color="pink" onClick={() => setIsBlogEdit(!isBlogEdit)}> Edit Blog </Button>
                    <Button color="red" onClick={open}> Delete Blog </Button>

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
                          <Button color="pink" className=" p-3">
                            {category.categoryName}
                          </Button>
                          <Button color="red"
                            onClick={() => removeCategory(category)}
                            className=" text-white px-3"
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
                                      <div className="flex flex-row space-x-3 py-2">
                                          {categories?.map((category) => (
                                              <Button color="pink"
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
                                          <Button color="pink" type="submit">Submit</Button>
                                      </Group>
                                  </form>
                    </div>:<div className='flex flex-col justify-center items-center'>
                      <img src={`${url}/storage/${blog.Thumbnail}`} alt="Example" className='w-full h-[500px]' />
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