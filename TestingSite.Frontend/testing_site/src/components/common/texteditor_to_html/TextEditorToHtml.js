import React from 'react';
import draftToHtml from "draftjs-to-html";

const TextEditorToHtml = (props) =>{

    return (
        <div className={props.className} dangerouslySetInnerHTML={{__html:draftToHtml(JSON.parse(props.value))}}/>
    )
}
export default TextEditorToHtml;