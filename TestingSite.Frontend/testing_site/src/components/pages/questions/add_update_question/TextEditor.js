import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';
const TextEditor = (props) => {
  const [editorValue,setEditorValue] = useState(EditorState.createEmpty());
  const onChange = (editorState) => {
    const rteContent = convertToRaw(editorState.getCurrentContent()); // for rte content with text formating
    rteContent && props.setValue(JSON.stringify(rteContent)); // store your rteContent to state
    setEditorValue(editorState);
    console.log(rteContent);
  };

  return (
      <Editor 
      editorState={editorValue} 
      onEditorStateChange={onChange}
      editorClassName="editor-border" 
      />
  );
};
export default TextEditor;
