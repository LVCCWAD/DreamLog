import { Button, FileInput } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import {router, usePage} from '@inertiajs/react';

function BlogComponentImage({position, type="image", handleChange, deleteElement,content, id=null, componentEdit=true}) {
    const { url } = usePage().props;
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(content ? `${url}/storage/${content}` : null)
    
    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreviewUrl(objectUrl);
            
            
            handleChange(position, { file: image });
            
            return () => URL.revokeObjectURL(objectUrl); 
        }
    }, [image]);

    
    const handleFileChange = (file) => {
        if (file) {
            setImage(file);
        }
    };

    const handleDelete = (position) =>{
        console.log(id)
        if(id){
          router.post(`/deletecomponent/${id}`);
          deleteElement(position)
        }
        else{
          deleteElement(position)
        }
        
      }

    return (
        <div className="w-full">
  {componentEdit ? (
    <div className="flex flex-col gap-4 items-start px-4 py-2">
      {/* d2 marga edit image component */}
      {previewUrl && (
        <div className="flex justify-center w-full">
          <img
            src={previewUrl}
            alt="Preview"
            className="my-3 max-h-[300px] object-contain rounded shadow"
          />
        </div>
      )}

      <FileInput
        label="Upload Image"
        placeholder="Choose PNG or JPEG"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
        className="w-full max-w-sm"
      />

      <Button onClick={() => handleDelete(position)} color="red" size="xs">
        Delete Image
      </Button>
    </div>
  ) : (
    <div className="flex justify-center w-full">
      <img
        src={previewUrl}
        alt="Preview"
        className="my-3 max-h-[300px] object-contain rounded"
      />
    </div>
  )}
</div>

    )
}

export default BlogComponentImage