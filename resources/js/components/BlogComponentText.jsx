
import React, { useEffect, useState } from 'react'
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, Text } from '@mantine/core';

function BlogComponentText({position = componentPosition, type, handleChange, deleteElement}) {

  
  const [componentContent, setComponentContent] = useState("")
  const [edit, setEdit] = useState(true)
  
  useEffect(()=>{
    handleChange(position, componentContent)
    console.log(componentContent)
  },[componentContent])
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    componentContent,
    onUpdate: ({ editor }) => {
      setComponentContent(editor.getHTML()) 
    },
  })

  

  return (
    <>
    {/*d2 marga edit text component */}
    <div className=''>
      {componentContent}
      
      
       
      {
        edit ? (<div>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>
  
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>
  
  
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
  
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
  
            <RichTextEditor.Content />
          </RichTextEditor>
        </div>):
        (<div>
          <div dangerouslySetInnerHTML={{ __html: componentContent }} />
        </div>)
      }    
      

      
        <Button onClick={()=>setEdit(!edit)}>{edit ? "save":"output"}</Button>
        
        <Button onClick={() => deleteElement(position)}>Delete</Button>
    </div>
    </>
  )
}

export default BlogComponentText