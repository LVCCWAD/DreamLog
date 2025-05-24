
import { useEffect, useState } from 'react';
import { 
  Paper, 
  Avatar, 
  Text, 
  Group, 
  Button,
  Stack,
  Container,
  Modal,
  TextInput,
  FileInput,
  BackgroundImage,
  Badge
} from '@mantine/core';
import { useForm as useInertiaForm, router } from '@inertiajs/react';
import { useDisclosure } from '@mantine/hooks';

function ProfileBanner({user,authUser}) {

    const profile = user.profile
    const followings = user.followings.length
    const followers = user.followers.length

    const [updateOpened, { open, close }] = useDisclosure(false);

    const [previewUrlBanner, setPreviewUrlBanner] = useState()
    const [previewUrlProfilePicture, setPreviewUrlProfilePicture] = useState()

    const { data, setData, post, processing, errors } = useInertiaForm({
            profilePicture: null,
            banner: null,
            userName: profile.userName,
            bio:"",
        });

    const updateProfile = (e) => {
        e.preventDefault();
        
        post('/profile/update', {
            forceFormData: true,
        });
    }

    useEffect(() => {
            if (data.banner) {
                const objectUrl = URL.createObjectURL(data.banner);
                setPreviewUrlBanner(objectUrl);
    
                return () => URL.revokeObjectURL(objectUrl);
            }
        }, [data.banner]);

    useEffect(() => {
                if (data.profilePicture) {
                    const objectUrl = URL.createObjectURL(data.profilePicture);
                    setPreviewUrlProfilePicture(objectUrl);
        
                    return () => URL.revokeObjectURL(objectUrl);
                }
            }, [data.profilePicture]);

    const followed = authUser?.followings.some(following => following.id == user.id)

    const handleFollow = () =>{
            router.post(`/profile/${authUser.id}/follow`, {
                          user_id: user.id
                        });
        }
    
        const handleUnFollow = () =>{
            router.post(`/profile/${authUser.id}/unfollow`, {
                          user_id: user.id
                        });
        }
    
  return (
    <div className="flex flex-col justify-center items-center bg-white w-full mb-20">

  {/* Banner Image */}
  <BackgroundImage
    src={`http://localhost:8000/storage/${profile.banner}`}
    radius="sm"
    className="w-full h-80"
  >
    <div className="w-full h-full bg-black/30 flex justify-end items-start p-4">
      {user.id === authUser?.id && (
        <Button variant="light" color="white" onClick={open}>
          Edit
        </Button>
      )}
    </div>
  </BackgroundImage>

  {/* Edit Modal */}
  <Modal opened={updateOpened} onClose={close} title="Update Profile" centered>
    <form onSubmit={updateProfile}>
      {data.banner && previewUrlBanner && (
        <img src={previewUrlBanner} alt="Banner preview" className="mb-4 rounded-md" />
      )}
      <FileInput
        label="Input Banner"
        placeholder="Input png/jpeg"
        onChange={(file) => setData('banner', file)}
      />

      {data.profilePicture && previewUrlProfilePicture && (
        <img src={previewUrlProfilePicture} alt="Profile preview" className="mt-4 mb-4 rounded-full w-24 h-24 object-cover" />
      )}
      <FileInput
        label="Input Profile Picture"
        placeholder="Input png/jpeg"
        onChange={(file) => setData('profilePicture', file)}
      />

      <TextInput
        withAsterisk
        label="Username"
        placeholder="username"
        value={data.userName}
        onChange={(e) => setData('userName', e.target.value)}
      />

      <TextInput
        label="Bio"
        placeholder="bio"
        value={data.bio}
        onChange={(e) => setData('bio', e.target.value)}
      />

      <Group justify="center" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  </Modal>

  {/* Profile Section */}
  <div className="flex flex-row gap-6 items-start w-full px-6 mt-[-3rem] max-w-4xl bg-slate-200 p-4 rounded-lg ">
    {/* Avatar */}
    <Avatar
      src={`http://localhost:8000/storage/${profile.profilePicture}`}
      size={120}
      radius={999}
      alt={profile.userName}
      className="border-4 border-white shadow-md"
    />

    {/* Info and Stats */}
    <div className="flex flex-col">
      <div className='flex flex-row justify-between items-center'>
        <div>
            <Text size="xl" weight={700}>{profile.userName}</Text>
            <Text size="md" className="text-gray-600">Bio: {profile.bio}</Text>
        </div>
        {authUser?.id !== user.id && (
                          !followed ? (
                              <Badge color="pink" onClick={handleFollow}>Follow</Badge>
                          ) : (
                              <Badge color="pink" onClick={handleUnFollow}>Unfollow</Badge>
                          )
                          )}
      </div>
      
      

      <Group mt="sm" spacing="xs">
        <Button
          variant="light"
          color="gray"
          compact
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          {followings} Following
        </Button>
        <Button
          variant="light"
          color="gray"
          compact
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          {followers} Followers
        </Button>
      </Group>
      
    </div>
  </div>
</div>
  )
}

export default ProfileBanner