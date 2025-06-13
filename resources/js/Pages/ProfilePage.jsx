import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { BackgroundImage, Button, Image, Modal, Text } from '@mantine/core';
import ProfileBanner from '../components/ProfileBanner';
import { router, usePage } from '@inertiajs/react';
import { useDisclosure } from '@mantine/hooks';
import CategoriesCard from '../components/CategoriesCard';

function ProfilePage({ user, userBlogs, categories, }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedId, setSelectedId] = useState(null);

  const { auth, url } = usePage().props;
  const authUser = auth.user;

  const user_categories = user.user_created_categories;
  console.table(user_categories)


  const profile = user.profile

  const publishedBlogs = userBlogs.filter(blog => blog.Visibility === 'public');
  const draftBlogs = userBlogs.filter(blog => blog.Visibility === 'private');

  const handleDelete = (id) => {
    router.post(`/category/${id}/delete`, {}, {
      onSuccess: () => { close(); setSelectedId(null) },
      onError: (errors) => console.error(errors),
    });
  };


  return (
    <>
      {/* Navbar */}
      <Navbar categories={categories} />

      {/* Delete Confirmation Modal */}
      <Modal opened={opened} onClose={close} title="Confirm Deletion" centered>
        <Text size="sm" mb="md">
          Are you sure you want to delete this Category? This action cannot be undone.
        </Text>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDelete(selectedId)}>
            Yes, Delete
          </Button>
        </div>
      </Modal>

      {/* Main Content Area */}
      <div className="min-h-screen bg-stone-100 py-4">
        {/* Profile Banner */}
        <ProfileBanner profile={profile} user={user} />

        <div className="max-w-7xl mx-auto px-4">
          {/* Published Blogs */}
          <h2 className="text-3xl font-bold p-5">Published</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {publishedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                Title={blog.BlogTitle}
                Description={blog.BlogDescription}
                Creator={blog.creator}
                Thumbnail={blog.Thumbnail}
                id={blog.id}
                likes={blog.likes}
                view_count={blog.view_count}
                categories={blog.categories}
              />
            ))}
          </div>

          {/* Drafts (only visible to the profile owner) */}
          {authUser.id === user.id && (
            <div className="bg-white py-6 rounded-lg shadow">
              <h2 className="text-3xl font-bold px-5 mb-4">Drafts</h2>
              <div className="flex flex-wrap justify-center items-center gap-4 px-4 pb-4">
                {draftBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    Title={blog.BlogTitle}
                    Description={blog.BlogDescription}
                    Creator={blog.creator}
                    Thumbnail={blog.Thumbnail}
                    id={blog.id}
                    likes={blog.likes}
                    view_count={blog.view_count}
                    categories={blog.categories}
                  />
                ))}
              </div>
            </div>
          )}

          {/* User-Created Categories */}
          <h2 className="text-3xl font-bold px-5 mt-10 mb-10">Created Categories</h2>
          <div className="flex flex-wrap gap-10 justify-center px-5">
            {user_categories.map((category) => (
              <div key={category.id} className="relative group">
                <a href={`/category/${category.id}`}>
                  <CategoriesCard
                    Category={category.categoryName}
                    Thumbnail={category.thumbnail}
                  />
                </a>

                {authUser.id === category.user_id && (
                  <button
                    onClick={() => {
                      setSelectedId(category.id);
                      open();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full shadow opacity-90 transition-transform duration-200 scale-100 group-hover:scale-115 hover:bg-red-700">
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

  )
}

export default ProfilePage