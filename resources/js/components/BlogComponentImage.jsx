import { Button, FileInput } from '@mantine/core';
import React, { useEffect, useState } from 'react'

function BlogComponentImage({position, type="image", handleChange, deleteElement,content, id=null}) {
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

    return (
        <>
            <div className=''>
                {/*d2 marga edit image component */}
                {
                    previewUrl ? <img src={previewUrl} alt="Preview" className="my-3 max-h-[300px]" /> : <></>
                }
                <FileInput
                    label="Input Image"
                    placeholder="Input png/jpeg"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                />
            </div>
            
            <Button onClick={() => deleteElement(position)}>Delete</Button>
        </>
    )
}

export default BlogComponentImage