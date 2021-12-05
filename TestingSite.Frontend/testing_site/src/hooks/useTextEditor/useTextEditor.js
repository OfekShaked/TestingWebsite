import {useState} from 'react'
import {EditorState,convertFromRaw,convertToRaw } from "draft-js";

export const useTextEditor = (initialTextEditorValue) => {
 const [textJson, setTextJson] = useState(initialTextEditorValue===null?"":initialTextEditorValue);
 const [textEditor, setTextEditor] = useState(initialTextEditorValue===null?EditorState.createEmpty():EditorState.createWithContent(convertFromRaw(JSON.parse(initialTextEditorValue))),null)

 const updateTextJson = (value) =>{
    setTextJson(value);
    setTextEditor(EditorState.createWithContent(convertFromRaw(JSON.parse(value))),null);
 }

 return [
     textJson,
     updateTextJson,
     textEditor,
     setTextEditor
 ]
}
export default useTextEditor;