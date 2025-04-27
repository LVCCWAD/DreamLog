import React, { useEffect, useState } from 'react'
import { Button,Modal, Group, TextInput,PasswordInput, Text } from '@mantine/core';
import DreamLog from '../assets/DreamLog.png';
import { useDisclosure } from '@mantine/hooks';
import { useForm, hasLength } from '@mantine/form';
import { useForm as useInertiaForm } from '@inertiajs/react';



function Navbar({Lopen, setLopen}) {
    const [logInOpen,setLogInOpen] = useState(false)
    const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);
    const [loginOpened, { open: openLogin, close: closeLogin }] = useDisclosure(false);
    const [visible, { toggle }] = useDisclosure(false);
    
    useEffect(() => {
        if (Lopen){
            openLogin()
        }
        if(closeLogin){
            setLopen(false)
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


      const signUP = (e) => {
        e.preventDefault();
        register('/register');
    }

    const logIN = (e) => {
        e.preventDefault();
        logIn('login');
    }

  return (<>
    
        <Modal opened={signUpOpened} onClose={closeSignUp} title="SignUp" centered>
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
                            onChange={(e) => setSignUpData('password', e.target.value)}
                        />
                       

                    <Group justify="center" mt="md">
                        <Button type="submit"
                        >Submit</Button>
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
            <img src={DreamLog} className='h-[150px] ml-8'/>
            <div className='flex gap-3 mr-8'>
                <Button radius="xl" size='compact-xl' color="rgba(219, 0, 20, 1)" variant="light" onClick={openSignUp}><span className='px-4'>SignUp</span></Button>

                <Button radius="xl" size='compact-xl' color="rgba(241, 43, 107, 1)" onClick={openLogin}><span className='px-4'>LogIn</span></Button>
            </div>
        </header>
    </>
  )
}

export default Navbar