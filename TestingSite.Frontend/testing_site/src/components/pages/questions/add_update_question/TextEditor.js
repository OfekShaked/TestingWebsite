import React,{ useState} from "react";
import {convertToRaw} from 'draft-js'
import MUIRichTextEditor from 'mui-rte'


const TextEditor = (props) =>{
const onChange = event => {
  const rteContent = convertToRaw(event.getCurrentContent()); // for rte content with text formating
  rteContent && props.setValue(JSON.stringify(rteContent)) // store your rteContent to state
}

 return (
   <MUIRichTextEditor
     label={props.label}
     value={props.value}
     onChange={onChange}
   />
 )
}
export default TextEditor;