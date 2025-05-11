import React, { useEffect, useState } from 'react'
import { Button, Modal, Group, TextInput, PasswordInput, Text, ActionIcon, FileInput, Menu, } from '@mantine/core';
import DreamLog from '../assets/DreamLog.png';
import { useDisclosure } from '@mantine/hooks';
import { useForm as useInertiaForm, router } from '@inertiajs/react';





function Navbar({ Lopen = false, setLopen, isUser, inEdit = false }) {
    const [logInOpen, setLogInOpen] = useState(false)
    const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);
    const [loginOpened, { open: openLogin, close: closeLogin }] = useDisclosure(false);
    const [createBlogOpened, { open: openCreateBlog, close: closeCreateBlog }] = useDisclosure(false);
    const [previewUrl, setPreviewUrl] = useState()

    const [notificationOpened, { open: openNotification, close: closeNotification }] = useDisclosure(false);

    const [visible, { toggle }] = useDisclosure(false);

    useEffect(() => {
        if (Lopen) {
            openLogin()
        }
        if (closeLogin) {
            if (setLopen) {
                setLopen(false)
            }

        }
    }, [Lopen]);


    const { data: signUpData, setData: setSignUpData, post: register, processing, errors } = useInertiaForm({
        name: '',
        email: '',
        password: '',
    });
    const { data: logInData, setData: setLogInData, post: logIn, processing: logInProcessing, errors: logInErrors } = useInertiaForm({
        email: '',
        password: '',
    });
    const { data: blogData, setData: setBlogData, post: createBlog, processing: BlogProcessing, errors: BlogErrors } = useInertiaForm({
        BlogTitle: '',
        BlogDescription: '',
        Thumbnail: null,
    });


    const signUP = async (e) => {
        e.preventDefault();
        await register('/register');

    }

    const logIN = async (e) => {
        e.preventDefault();
        await logIn('login');

    }

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                window.location.href = '/';
            }
        });

    };

    const submitBlog = (e) => {
        e.preventDefault();
        console.log(blogData.Thumbnail)
        createBlog('/createblog', {
            forceFormData: true,
        });
    }

    useEffect(() => {
        if (blogData.Thumbnail) {
            const objectUrl = URL.createObjectURL(blogData.Thumbnail);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [blogData.Thumbnail]);


    return (<div className='w-[100%]'>

        {/* eto ung signup modal */}
        <Modal opened={signUpOpened} onClose={closeSignUp} title="SignUp" centered>

            <Group justify="center">
                <div className='flex flex-col justify-center items-center'>
                    <img src={DreamLog} className='h-[150px] ml-8' />
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
                    defaultValue="secret"
                    visible={visible}
                    onVisibilityChange={toggle}
                    onChange={(e) => (setSignUpData('password', e.target.value))}
                />


                <Group justify="center" mt="md">
                    <Button type="submit"
                    >Submit</Button>
                </Group>
            </form>
        </Modal>

        {/* log in modal */}
        <Modal opened={loginOpened} onClose={closeLogin} title="LogIn" centered>

            {/* <Group justify="center">
                <div className='flex flex-col justify-center items-center'>
                    <img src={DreamLog} className='h-[150px] ml-8' />
                </div>
            </Group> */}

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
                    defaultValue="secret"
                    visible={visible}
                    onVisibilityChange={toggle}
                    onChange={(e) => setLogInData('password', e.target.value)}
                />


                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>

        {/* kre eyt blag modal */}
        <Modal opened={createBlogOpened} onClose={closeCreateBlog} title="Create Blog" centered>
            <form onSubmit={submitBlog}>
                {
                    blogData.Thumbnail && previewUrl ? <img src={previewUrl} /> : <></>
                }
                <FileInput
                    label="Input Thumbnail"
                    placeholder="Input png/jpeg"
                    onChange={(file) => setBlogData('Thumbnail', file)}
                />

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
            </form>
        </Modal>



        <Modal opened={loginOpened} onClose={closeLogin} title="LogIn" centered>
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
                    defaultValue="secret"
                    visible={visible}
                    onVisibilityChange={toggle}
                    onChange={(e) => setLogInData('password', e.target.value)}
                />

                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>

        <header className='w-full h-[90px] flex flex-row justify-between items-center sticky border border-b-gray-500'>

            <img src={DreamLog} className='h-[150px] ml-8' />
            {
                isUser ?

                    // d2 ung nakalag in na

                    (<div className=' searchbar flex flex-row gap-4 mr-3'>
                        <TextInput
                            variant="filled"
                            radius="xl"
                            size="lg"
                            placeholder="Input placeholder"
                        />

                        {inEdit ? <></> : (<ActionIcon
                            variant="gradient"
                            size="xl"
                            aria-label="Create Blog"
                            gradient={{ from: 'pink', to: 'red', deg: 120 }}
                            onClick={openCreateBlog}
                        >
                            <i className="bx bx-plus text-xl text-white dark:text-black transition-transform duration-150 hover:scale-110"></i>
                        </ActionIcon>)}


                        {/* d2 ung notification */}
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon
                                    variant="gradient"
                                    size="xl"
                                    aria-label="Notifications"
                                    gradient={{ from: 'gray', to: 'gray', deg: 171 }}
                                >
                                    <i className="bx bx-bell text-xl text-gray-800 dark:text-white"></i>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>

                                <Menu.Item >
                                    Notifications
                                </Menu.Item>

                                <Menu.Divider />
                                <Text>Notification</Text>

                            </Menu.Dropdown>
                        </Menu>


                        {/* d2 ung menu  button */}
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon
                                    variant="gradient"
                                    size="xl"
                                    aria-label="Menu"
                                    gradient={{ from: 'gray', to: 'gray', deg: 171 }}
                                >
                                    <i className="bx bx-menu text-xl text-gray-800 dark:text-white"></i>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>

                                <Menu.Item icon={<i className="bx bx-user text-gray-700 dark:text-white"></i>} >
                                    <a href='/profile'>Profile</a>
                                </Menu.Item>

                                <Menu.Divider />

                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                    color="red"
                                    icon={<i className="bx bx-log-out text-red-600 dark:text-red-400"></i>}
                                    onClick={() => handleLogout()}
                                >
                                    LogOut
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>


                    </div>)

                    : (
                        <div className='flex gap-3 mr-8'>
                            <Button radius="xl" size='compact-xl' color="rgba(219, 0, 20, 1)" variant="light" onClick={openSignUp}><span className='px-4'>SignUp</span></Button>

                            <Button radius="xl" size='compact-xl' color="rgba(241, 43, 107, 1)" onClick={openLogin}><span className='px-4'>LogIn</span></Button>
                        </div>
                    )
            }

        </header>
    </div>
    )
}

export default Navbar