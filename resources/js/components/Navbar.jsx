import React, { useEffect, useState } from 'react';
import {
  Button, Modal, Group, TextInput, PasswordInput, Text,
  ActionIcon, FileInput, Menu, ScrollArea, Notification
} from '@mantine/core';
import DreamLog from '../assets/DreamLog.png';
import { useDisclosure } from '@mantine/hooks';
import { useForm as useInertiaForm, router, usePage } from '@inertiajs/react';
import { IconCheck, IconX } from '@tabler/icons-react';

function Navbar({ Lopen = false, setLopen, inEdit = false }) {
  const { auth, categories, blogs,url } = usePage().props;
  const isUser = !!auth.user;
  const authUser = auth.user;
  const notifications = authUser ? auth.user.notifications : [];

  const [logInOpen, setLogInOpen] = useState(false);
  const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);
  const [loginOpened, { open: openLogin, close: closeLogin }] = useDisclosure(false);
  const [createBlogOpened, { open: openCreateBlog, close: closeCreateBlog }] = useDisclosure(false);
  const [notificationOpened, { open: openNotification, close: closeNotification }] = useDisclosure(false);

  const [previewUrl, setPreviewUrl] = useState();
  const [dropdown, setDropdown] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [snackbar, setSnackbar] = useState({ message: '', color: '', icon: null });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const showNotification = (message, color = 'red', icon = <IconX size={16} />) => {
    setSnackbar({ message, color, icon });
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  useEffect(() => {
    if (Lopen) openLogin();
    if (closeLogin && setLopen) setLopen(false);
  }, [Lopen]);

  const { data: signUpData, setData: setSignUpData, post: register, processing, errors } = useInertiaForm({
    name: '', email: '', password: ''
  });
  const { data: logInData, setData: setLogInData, post: logIn, processing: logInProcessing, errors: logInErrors, reset: logInReset } = useInertiaForm({
    email: '', password: ''
  });
  const { data: blogData, setData: setBlogData, post: createBlog, processing: BlogProcessing, errors: BlogErrors,reset: blogReset } = useInertiaForm({
    BlogTitle: '', BlogDescription: '', Thumbnail: null, categories: []
  });
  const { data: categoryData, setData: setCategoryData, post: createCategory, processing: CategoryProcessing, errors: CategoryErrors } = useInertiaForm({
    categoryName: '', thumbnail: null
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const signUP = async (e) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      return showNotification("All fields are required");
    }
    if (!validateEmail(signUpData.email)) {
      return showNotification("Invalid email format");
    }
    await register('/register', {
    onSuccess: () => {
        router.visit('/');
        window.location.href = '/';
    },
    });
    if(errors.name){
        return showNotification(errors.name);
    }else if (errors.email){
        return showNotification(errors.email);
    }
    else if (errors.password){
        return showNotification(errors.password);
    }
  };

  const logIN = async (e) => {
    e.preventDefault();
    if (!logInData.email || !logInData.password) {
      return showNotification("Email and password required");
    }
    if (!validateEmail(logInData.email)) {
      return showNotification("Invalid email format");
    }
    await logIn('/login', {
        onSuccess: () => {
            router.visit('/');
            window.location.href = '/';
        },
        });
    if(logInErrors.password){
        return showNotification(logInErrors.password);
    }else if (logInErrors.email){
        return showNotification(logInErrors.email);
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    if (!blogData.BlogTitle || !blogData.BlogDescription || !blogData.Thumbnail) {
      return showNotification("All blog fields are required");
    }
    await createBlog('/createblog', { forceFormData: true });
    if(BlogErrors.BlogTitle){
        return showNotification(BlogErrors.BlogTitle);
    }else if (BlogErrors.BlogDescription){
        return showNotification(BlogErrors.BlogDescription);
    }else if (BlogErrors.Thumbnail){
        return showNotification(BlogErrors.Thumbnail);
    }
    
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    if (!categoryData.categoryName || !categoryData.thumbnail) {
      return showNotification("Category name and thumbnail are required");
    }
    await createCategory('/createcategory', { forceFormData: true });
    if(CategoryErrors.categoryName){
        return showNotification(CategoryErrors.categoryName);
    }else if (CategoryErrors.thumbnail){
        return showNotification(CategoryErrors.thumbnail);
    }
  };

  const handleLogout = () => {
    router.post('/logout', {}, {
      onSuccess: () => { window.location.href = '/'; }
    });
  };

  const [query, setQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    setFilteredBlogs(blogs.filter(blog =>
      blog.BlogTitle.toLowerCase().includes(query.toLowerCase()) ||
      blog.BlogDescription.toLowerCase().includes(query.toLowerCase())
    ));
  }, [query]);

  const handleFileChange = (file, mode) => {
    if (!file) return;
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        if (img.width > img.height) {
          setCategoryData('thumbnail', file);
        } else {
            {mode == "category" && setCategoryData('thumbnail', null)}
            {mode == "blog" && setBlogData('Thumbnail', null)}
          showNotification("Please upload a landscape image");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (blogData.Thumbnail) {
      const objectUrl = URL.createObjectURL(blogData.Thumbnail);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [blogData.Thumbnail]);

    

    return (<div className='w-[100%]'>
        {/* {showSnackbar && (
        <Notification
          icon={snackbar.icon}
          color={snackbar.color}
          title="Error"
          withCloseButton
          onClose={() => setShowSnackbar(false)}
          style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
        >
          {snackbar.message}
        </Notification>
      )} */}

        {/* eto ung signup modal */}
        <Modal opened={signUpOpened} onClose={closeSignUp} title="Sign Up" centered>
            
            
            <Group justify="center">
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
                
                <div className='flex flex-col justify-center items-center'>
                    <img src={DreamLog} className='h-[150px] ml-8 mr-8' />
                    <Text>Welcome To DreamLOG</Text>
                </div>

            </Group>

            <form onSubmit={signUP}>


                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    onChange={(e) => setSignUpData('email', e.target.value)}

                />


                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Name"
                    onChange={(e) => setSignUpData('name', e.target.value)}


                />

                <PasswordInput
                    withAsterisk
                    label="Password"
                    defaultValue=""
                    visible={visible}
                    onVisibilityChange={toggle}
                    onChange={(e) => (setSignUpData('password', e.target.value))}
                />


                <Group justify="center" mt="md">
                   <Button color="pink" variant="filled">Submit</Button>
                </Group>
            </form>
        </Modal>

        {/* log in modal */}
        <Modal opened={loginOpened} onClose={closeLogin} title="Log In" centered>

            <Group justify="center">
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
                
                <div className='flex flex-col justify-center items-center'>
                    <img src={DreamLog} className='h-[150px] ml-8 mr-8' />
                    <Text>Welcome To DreamLOG</Text>
                </div>

            </Group>

            <form onSubmit={logIN}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    onChange={(e) => setLogInData('email', e.target.value)}

                />
                

                <PasswordInput
                    withAsterisk
                    label="Password"
                    defaultValue=""
                    visible={visible}
                    onVisibilityChange={toggle}
                    onChange={(e) => setLogInData('password', e.target.value)}
                />

                
                <Group justify="center" mt="md">
                  
                    <Button color="pink" type="submit" disabled={ logInData.email == "" || logInData.password == "" }>Submit</Button>

                </Group>
            </form>
        </Modal>

        {/* Create Blog modal */}
        <Modal opened={createBlogOpened} onClose={() =>{closeCreateBlog(); blogReset();}} title="Create Blog" centered>

            <Group justify="center">
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
                <div className='flex flex-col justify-center items-center'>
                    <img src={DreamLog} className='h-[150px] ml-8 mr-8' />
                </div>
            </Group>

            <div>
                    <div className='flex flex-row justify-between mb-4 '><span className='text-lg font-bold' >Create a Category?</span><span onClick={()=>setDropdown(!dropdown)} className="text-3xl cursor-pointer">+</span></div>
                    {dropdown && <div className='w-full max-w-md mx-auto flex flex-col gap-3'>
                        <form onSubmit={submitCategory}>
                            <TextInput
                                withAsterisk
                                label="Category Name"
                                placeholder="Category Name"
                                onChange={(e) => setCategoryData('categoryName', e.target.value.toUpperCase())}
                                className='mb-2'

                            />
                                <FileInput
                                withAsterisk
                                label="Input Thumbnail"
                                placeholder="Input png/jpeg"
                                onChange={(file) => {setCategoryData('thumbnail', file)
                                    handleFileChange(file,'category')
                                }}
                                
                                
                                />
                            <div className="w-full flex justify-center mt-5">
                                <Button color='pink' type='submit'  variant="filled" className='w-[200px]'>Create Category</Button>
                                    
                                  
                            </div>
                        </form>
                    </div>}
                    
                </div>
            <form onSubmit={submitBlog}>
                {
                    blogData.Thumbnail && previewUrl ? <img src={previewUrl} /> : <></>
                }
                <FileInput
                    label="Input Thumbnail"
                    placeholder="Input png/jpeg"
                    onChange={(file) => {setBlogData('Thumbnail', file)
                        handleFileChange(file,'blog')}
                    }
                />
                <div className="flex flex-wrap gap-1">
                    {categories.map((category) => (
                        <Button
                        key={category.id}
                        
                        onClick={() => {
                            if (!(blogData.categories || []).includes(category.id)) {
                                setBlogData('categories', [...(blogData.categories || []), category.id]);
                            }else{
                                setBlogData('categories', (blogData.categories || []).filter(catId => catId !== category.id));
                            }
                        }}
                        className={`${(blogData.categories || []).includes(category.id) ? "bg-slate-100":"bg-slate-200"} p-3 rounded-md w-[50px] m-1`}
                        color={!(blogData.categories || []).includes(category.id) ? "gray" :  "rgba(250, 155, 155, 1)"}
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
                    className='mt-5'


                />

                <TextInput
                    withAsterisk
                    label="Blog Description"
                    placeholder="Blog Description"
                    onChange={(e) => setBlogData('BlogDescription', e.target.value)}
                    className='mt-2'

                />



                <Group justify="center" mt="md">
                     
                    <Button color="pink" variant="filled">Submit</Button>

                </Group>
                
            </form>
        </Modal>



       

        <header className='w-full h-[90px] flex flex-row justify-between items-center sticky border border-b-gray-500 z-10'>

            <a href="/"><img src={DreamLog} className='h-[150px] ml-8' /></a>
            {
                isUser ?

                    // d2 ung nakalag in na

                    (<div className=' searchbar flex flex-row justify-center items-center gap-4 mr-3'>
                        <div className="relative w-full max-w-xl mx-auto z-10">
                            <TextInput
                                variant="filled"
                                radius="xl"
                                size="lg"
                                placeholder="Search Title"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />

                            {query.length >= 2 && (
                                <div className="absolute z-20 bg-white w-full max-h-80 overflow-y-auto mt-2 rounded-lg shadow-lg border border-gray-200">
                                    {filteredBlogs.length > 0 ? (
                                        filteredBlogs.map(blog => (
                                            <div
                                                key={blog.id}
                                                className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => window.location.href = `/blog/${blog.id}`}
                                            >
                                                <img
                                                    src={`${url}/storage/${blog.Thumbnail}`}
                                                    alt={blog.BlogTitle}
                                                    className="w-14 h-14 object-cover rounded-md"
                                                />
                                                <div className='flex flex-col justify-start'>
                                                    <p className="text-sm font-medium text-gray-800">{blog.BlogTitle}</p>
                                                    <p className="text-sm font-thin text-gray-800">Created by:{blog.creator.name}</p>
                                                </div>
                                                
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-2">No matching blogs found.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {inEdit ? <></> : (<ActionIcon
                            variant="gradient"
                            size="xl"
                            aria-label="Create Blog"
                            gradient={{ from: 'pink', to: 'red', deg: 120 }}
                            onClick={openCreateBlog}
                            className="create-blog-hover"
                        >
                            <i className="bx bx-plus text-xl text-white dark:text-black transition-transform duration-150 hover:scale-110"></i>
                        </ActionIcon>)}


                        {/* d2 ung notification */}
                        <Menu shadow="md" width={280}>
                            <Menu.Target>
                                <ActionIcon
                                variant="gradient"
                                size="xl"
                                aria-label="Notifications"
                                gradient={{ from: 'pink', to: 'red', deg: 120 }}
                                className="hover-effect-icon"
                                >
                                 <i className="bx bx-bell text-xl text-white-800 dark:text-white transition duration-200"></i>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Notifications</Menu.Label>
                                <Menu.Divider />
                                <ScrollArea style={{ maxHeight: 250, overflowY: 'auto' }}>
                                {notifications.length === 0 && (
                                    <Text size="sm" color="dimmed" align="center" py="md">
                                    No notifications
                                    </Text>
                                )}
                                {notifications.map((notification) => (
                                    <Menu.Item
                                    key={notification.id}
                                    component="a"
                                    href={notification.url || '#'}
                                    target="_blank"
                                    styles={{ root: { whiteSpace: 'normal', lineHeight: 1.3 } }}
                                    >
                                    {notification.message}
                                    <Text size="xs" color="dimmed" mt={4}>
                                        {new Date(notification.created_at).toLocaleString()}
                                    </Text>
                                    </Menu.Item>
                                ))}
                                </ScrollArea>
                            </Menu.Dropdown>
                            </Menu>


                        {/* d2 ung menu  button */}
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon
                                    variant="gradient"
                                    size="xl"
                                    aria-label="Menu"
                                    gradient={{ from: 'pink', to: 'red', deg: 120 }}
                                    className="hover-effect-icon"
                                >
                                    <i className="bx bx-menu text-xl text-white-800 dark:text-white transition duration-200"></i>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <a href={`/profile/${authUser?.id}`}>
                                    <Menu.Item icon={<i className="bx bx-user text-gray-700 dark:text-white"></i>} >
                                        Profile
                                    </Menu.Item>
                                </a>

                                <Menu.Divider />

                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                    color="red"
                                    icon={<i className="bx bx-log-out text-red-600 dark:text-red-400"></i>}
                                    onClick={() => handleLogout()}
                                >
                                    Log Out
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>


                    </div>)

                    : (
                        <div className='flex gap-3 mr-8'>
                            <Button radius="xl" size='compact-xl' color="rgba(219, 0, 20, 1)" variant="light" onClick={openSignUp}><span className='px-4'>Sign Up</span></Button>

                            <Button radius="xl" size='compact-xl' color="rgba(241, 43, 107, 1)" onClick={openLogin}><span className='px-4'>Log In</span></Button>
                        </div>
                    )
            }

        </header>
    </div>
    )
}

export default Navbar