import React,{ useState,useEffect} from 'react';
import {Stack,IconButton,FormGroup,FormControlLabel,Switch} from '@mui/material'
import TextEditor from '../TextEditor';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import useSwitchIsCorrect from '../../../../../hooks/useSwitchIsCorrect/useSwitchIsCorrect';

const Answer = (props)=>{
    const {answer,is_change_allowed, removeAnswer,updateAnswer} = props;
    const [answerText,setAnswerText] = useState(answer.text)
    const isCorrect = useSwitchIsCorrect({initial_value:answer.is_correct, IsChangeAllowed:is_change_allowed})

    useEffect(()=>{
        //Upading the answer list on every update to a specific answer
        let answersModified = {_id:answer._id, text:answerText, is_correct:isCorrect.checked};
        updateAnswer(answersModified);
    },[answerText,isCorrect.checked])

    return(
        <Stack direction="row" spacing={2}>
            <IconButton color='primary' aria-label="remove answer" component='span'>
                <RemoveCircleIcon onClick={()=>removeAnswer(answer._id)}/>
            </IconButton>
            <TextEditor label="Answer text" value={answerText} setValue={setAnswerText}/>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked {...isCorrect}/>} label={isCorrect.value?"Correct":"Incorrect"} />
            </FormGroup>
        </Stack>
    )
}

export default Answer;