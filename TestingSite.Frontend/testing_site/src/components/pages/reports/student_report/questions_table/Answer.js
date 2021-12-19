import React from 'react';
import {Stack} from '@mui/material'
import {ArrowBack, Check,Clear} from '@mui/icons-material';
import './Answer.css';
import TextEditorToHtml from '../../../../common/texteditor_to_html/TextEditorToHtml';

const Answer = (props) => {

    const {answer} = props;

    const getClassName = () =>{
        if(answer.is_correct&&answer.is_selected) return "correct_chosen";
        if(answer.is_correct) return "correct";
        if(answer.is_selected&&!answer.is_correct) return "incorrect"
        else return ""
    }

    return(<>
        <Stack spacing={2}direction="row"> 
            <TextEditorToHtml className={getClassName()} value={answer.text}/>
            {getClassName()==="correct_chosen"?<Check className={getClassName()}/>:<></>}
            {getClassName()==="correct"?<ArrowBack className={getClassName()}/>:<></>}
            {getClassName()==="incorrect"?<Clear className={getClassName()}/>:<></>}
        </Stack>
    </>)
}   

export default Answer;