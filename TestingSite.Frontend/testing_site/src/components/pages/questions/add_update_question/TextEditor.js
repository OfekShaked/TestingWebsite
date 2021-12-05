import React from "react";
import { convertToRaw,EditorState} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';
const TextEditor = (props) => {
  const onStateChange = (editorState) => {
    const rteContent = convertToRaw(editorState.getCurrentContent()); // for rte content with text formating
    rteContent && props.setValue(JSON.stringify(rteContent)); // store your rteContent to state
    props.setEditorValue(editorState);
  };

  return (
      <Editor 
      editorState={props.editorValue} 
      onEditorStateChange={onStateChange}
      editorClassName="editor-border" 
      />
  );
};
export default TextEditor;
