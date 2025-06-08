
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
import { useForm as useInertiaForm, router, usePage } from '@inertiajs/react';
import { useDisclosure } from '@mantine/hooks';

function ProfileBanner({user}) {

    const { auth,url } = usePage().props;
    const authUser = auth.user;
    const profile = user.profile
    const followings = user.followings.length
    const followers = user.followers.length

    const [error, setError] = useState(null);

    const [updateOpened, { open, close }] = useDisclosure(false);

    const [previewUrlBanner, setPreviewUrlBanner] = useState()
    const [previewUrlProfilePicture, setPreviewUrlProfilePicture] = useState()
    const [followingsModal, { open: openFollowings, close: closeFollowings }] = useDisclosure(false);
    const [followersModal, { open: openFollowers, close: closeFollowers }] = useDisclosure(false);

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
            // preserveScroll: true,
            onSuccess: () => {
              close(); 
              reset();
            },
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
                        },
                      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
       
        });
        }
    
        const handleUnFollow = () =>{
            router.post(`/profile/${authUser.id}/unfollow`, {
                          user_id: user.id
                        },
                      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
       
        });
        }

      const handleFileChange = (file) => {
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;

      img.onload = () => {
        if (img.width > img.height) {
          setError(null);
          setCategoryData('thumbnail', file);
        } else {
          setError('Please upload a landscape image (width must be greater than height).');
          setCategoryData('thumbnail', null);
        }
      };
    };

    reader.readAsDataURL(file);
  };
    
  return (
    <div className="flex flex-col justify-center items-center bg-stone-100 w-full mb-10">

  {/* Followings Modal */}
  <Modal opened={followingsModal} onClose={closeFollowings} title="Followings" centered>
    {user.followings.map((following, idx) => (
      <div key={`following-${idx}`} className="flex items-center gap-4 p-2">
        <Avatar
          src={`${url}/storage/${following.profile.profilePicture}`}
          size={50}
          radius={999}
          alt={following.profile.userName}
          className="border-4 border-white shadow-md"
        />
        <Text size="sm" c="dimmed">{following.name}</Text>
      </div>
    ))}
  </Modal>

  {/* Followers Modal */}
  <Modal opened={followersModal} onClose={closeFollowers} title="Followers" centered>
    {user.followers.map((follower, idx) => (
      <div key={`follower-${idx}`} className="flex items-center gap-4 p-2">
        <Avatar
          src={`${url}/storage/${follower.profile.profilePicture}`}
          size={50}
          radius={999}
          alt={follower.profile.userName}
          className="border-4 border-white shadow-md"
        />
        <Text size="sm" c="dimmed">{follower.name}</Text>
      </div>
    ))}
  </Modal>

  {/* Banner Image */}
  <BackgroundImage
    src={`${url}/storage/${profile.banner}`}
    radius="sm"
    className="w-full h-96"
  >
    <div className="w-full h-full bg-black/30 flex justify-end items-start p-4">
      {user.id === authUser?.id && (
        <Button variant="light" color="white" onClick={open}>
          Edit
        </Button>
      )}
    </div>
  </BackgroundImage>

  {/* Edit Profile Modal */}
  <Modal
    opened={updateOpened}
    onClose={close}
    title={<div className="text-center font-bold text-lg">Update Profile</div>}
    centered
  >
    <form onSubmit={updateProfile}>
      {data.banner && previewUrlBanner && (
        <img src={previewUrlBanner} alt="Banner preview" className="mb-4 rounded-md" />
      )}
      <FileInput
        label="Input Banner"
        placeholder="Upload PNG/JPEG"
        onChange={(file) => {
          setData('banner', file);
          handleFileChange(file);
        }}
        error={error}
      />

      {data.profilePicture && previewUrlProfilePicture && (
        <img
          src={previewUrlProfilePicture}
          alt="Profile preview"
          className="mt-4 mb-4 rounded-full w-24 h-24 object-cover"
        />
      )}
      <FileInput
        label="Input Profile Picture"
        placeholder="Upload PNG/JPEG"
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
        <Button color="pink" type="submit">Submit</Button>
      </Group>
    </form>
  </Modal>

  {/* Profile Card */}
  <div className="flex flex-col sm:flex-row gap-6 items-start w-full max-w-4xl bg-slate-200 p-6 rounded-lg mt-[-3rem]">
    {/* Avatar */}
    <Avatar
      src={`${url}/storage/${profile.profilePicture}`}
      size={120}
      radius={999}
      alt={profile.userName}
      className="border-4 border-white shadow-md"
    />

    {/* User Info */}
    <div className="flex flex-col w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <Text size="xl" weight={700}>{profile.userName}</Text>
          <Text size="sm" className="text-gray-600">Bio: {profile.bio}</Text>
        </div>
        {authUser?.id !== user.id && (
          !followed ? (
            <Badge color="pink" onClick={handleFollow} className="cursor-pointer">Follow</Badge>
          ) : (
            <Badge color="pink" onClick={handleUnFollow} className="cursor-pointer">Unfollow</Badge>
          )
        )}
      </div>

      {/* Follow Buttons */}
      <Group mt="sm" spacing="xs">
        <Button
          variant="light"
          color="gray"
          compact
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={openFollowings}
        >
          {followings} Following
        </Button>
        <Button
          variant="light"
          color="gray"
          compact
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={openFollowers}
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