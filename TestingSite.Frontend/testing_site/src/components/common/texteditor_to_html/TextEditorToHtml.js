import React from 'react';
import draftToHtml from "draftjs-to-html";

const TextEditorToHtml = (props) =>{

    return (
        <div dangerouslySetInnerHTML={{__html:draftToHtml(JSON.parse(props.value))}}/>
    )
}
export default TextEditorToHtml;