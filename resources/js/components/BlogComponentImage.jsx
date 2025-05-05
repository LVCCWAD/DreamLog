import { Button, FileInput } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import {router} from '@inertiajs/react';

function BlogComponentImage({position, type="image", handleChange, deleteElement,content, id=null, componentEdit=true}) {
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(content ? `http://localhost:8000/storage/${content}` : null)
    
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
        <>  
            <div >
                {componentEdit ? 
                <><div className=''>
                {/*d2 marga edit image component */}
                {
                    previewUrl ? <div className="flex justify-center w-full my-4"> <img src={previewUrl} alt="Preview" className="my-3 max-h-[300px]" /> </div>: <></>
                }
                <FileInput
                    label="Input Image"
                    placeholder="Input png/jpeg"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                />
            </div>
            
            <Button onClick={() => handleDelete(position)}>Delete</Button></>:
            <img src={previewUrl} alt="Preview" className="my-3 max-h-[300px]" />
            }
            </div>
            
        </>
    )
}

export default BlogComponentImage