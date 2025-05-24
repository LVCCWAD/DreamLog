import React, { useEffect, useState } from 'react'
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, Text, Box } from '@mantine/core';
import parse from 'html-react-parser';
import { domToReact } from 'html-react-parser';
import {router} from '@inertiajs/react';


function BlogComponentText({position = componentPosition, type, handleChange, deleteElement, content, id=null, componentEdit=true}) {
  
  const [componentContent, setComponentContent] = useState(content)
  const [edit, setEdit] = useState(true)
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
    content,
    onUpdate: ({ editor }) => {
      setComponentContent(editor.getHTML()) 
    },
  })
  
  if(componentEdit){
    useEffect(()=>{
      handleChange(position, componentContent)
      console.log(componentContent)
    },[componentContent])
  }
 
  
  const parsedContent = () => {
    try {
      const options = {
        replace: (domNode) => {
          if (!domNode.attribs) return undefined;
          return undefined;
        }
      };
      
      return parse(componentContent, {
        htmlparser2: {
          lowerCaseTags: false,
          recognizeSelfClosing: true
        }
      });
    } catch (error) {
      console.error('Error parsing HTML:', error);
      return <div>Error rendering content</div>;
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
    {/*d2 marga edit text component */}
    {componentEdit ? <div className='flex flex-col items-start space-y-2'>
      {
        edit ? (
          <div>
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
          </div>
        ) : (
          <div>
            <div className="rich-text-content">
              {parsedContent()}
            </div>
          </div>
        )
      }    
      <div className="flex space-x-2">
      <Button onClick={()=>setEdit(!edit)}>{edit ? "save":"output"}</Button>
      <Button onClick={() => handleDelete(position) }>Delete</Button>
      </div>
    </div> : (
      <div className="rich-text-content">
        {parsedContent()}
      </div>
    )}
    </>
  )
}

export default BlogComponentText