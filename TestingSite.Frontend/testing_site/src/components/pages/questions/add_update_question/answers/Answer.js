import React,{ useState,useEffect} from 'react';
import {Stack,IconButton,FormGroup,FormControlLabel,Checkbox} from '@mui/material'
import TextEditor from '../TextEditor';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import useTextEditor from '../../../../../hooks/useTextEditor/useTextEditor';

const Answer = (props)=>{
    const {answer,handleIsCorrectChange, removeAnswer,updateAnswer} = props;
    const [answerText,setAnswerText,answerTextEditor,setAnswerTextEditor] = useTextEditor(answer.text===""?null:answer.text)
    const [isChecked,setIsChecked] = useState(answer.is_correct);
    const handleSwitchChange = () =>{
        handleIsCorrectChange(answer.front_id);
    }

    useEffect(()=>{
        //Upading the answer list on every update to a specific answer
        let answersModified = {_id:answer._id, text:answerText, is_correct:answer.is_correct, front_id:answer.front_id};
        updateAnswer(answersModified);
    },[answerText])

    useEffect(()=>{
        setIsChecked(answer.is_correct);
        console.log(answer.is_correct);
    },[answer])


    return(
        <Stack direction="row" spacing={2}>
            <IconButton color='primary' onClick={()=>removeAnswer(answer.front_id)} aria-label="remove answer" component='span'>
                <RemoveCircleIcon />
            </IconButton>
            <TextEditor value={answerText} setValue={setAnswerText} setEditorValue={setAnswerTextEditor} editorValue={answerTextEditor}/>
            <FormGroup>
                <FormControlLabel control={
                <Checkbox checked={answer.is_correct} onChange={handleSwitchChange}/>} label={answer.is_correct?"Correct":"Incorrect"} />
            </FormGroup>
        </Stack>
    )
}

export default Answer;