import { Button, FileInput } from '@mantine/core';
import React, { useEffect, useState } from 'react'

function BlogComponentImage({position, type="image", handleChange, deleteElement,}) {
    const [image, setImage] = useState()
    const [previewUrl, setPreviewUrl] = useState()

    useEffect(() => {
            if (image) {
              const objectUrl = URL.createObjectURL(image);
              setPreviewUrl(objectUrl);
              
              return () => URL.revokeObjectURL(objectUrl); 
              
            }
          }, [image]);


    useEffect(() => {
      handleChange(position, image)
    }, [image]);
    

  return (
    <>
    
      <div className=''>
        {/*d2 marga edit image component */}
          {
              image && previewUrl  ? <img src={previewUrl} /> : <></>
          }
          <FileInput
              label="Input Image"
              placeholder="Input png/jpeg"
              onChange={(file) => setImage(file)}
          />
      </div>
              
              <Button onClick={() => deleteElement(position)}>Delete</Button>
    </>
  )
}

export default BlogComponentImage