import React,{ useState,useEffect}from 'react';
import {Stack,Button} from '@mui/material'
import Answer from './Answer'
import { v4 as uuidv4 } from 'uuid';

const PossibleAnswers = (props) =>{
    const {question,updateAnswers} = props;
    const [is_correct_change_allowed,setIs_correct_change_allowed] = useState(false);

    const updateAnswer = (answer_to_update) =>{
        let answers_new=[...question.answers];
        let answersModified = answers_new.map(ans=>ans.answer_frontId === answer_to_update.answer_frontId ? answer_to_update:ans);
        updateAnswers(answersModified);
    }
    const removeAnswer = (answer_frontId) =>{
        let answers_new=[...question.answers];
        let answersModified = answers_new.filter(ans=>ans.front_id !== answer_frontId);
        updateAnswers(answersModified);
    }
    const addAnswer = ()=>{
        let answers_new=[...question.answers];
        answers_new.push({front_id:uuidv4, text:'',is_correct:false});
        updateAnswers(answers_new);
    }
    const add_unique_front_id_to_answers = () =>{
        //adds a unique identifier to each element
        let answers_new=[...question.answers];
        let answersModified = answers_new.map((ans)=>{return {...ans,front_id:uuidv4}})
        updateAnswers(answersModified);
    }

    useEffect(()=>{
        add_unique_front_id_to_answers();
    },[])

    const checkIfMultipleCorrectAllowed = () =>{
        if(question.type==="SignelChoiceQuestion"){
            for (const ans in question.answers) {
                if(ans.is_correct===true) {
                    setIs_correct_change_allowed(false);
                    return;
                }
            };
        }
        setIs_correct_change_allowed(true);
    }

    useEffect(()=>{
        checkIfMultipleCorrectAllowed();
    },[question])

    return(
        <>
        <Stack spacing={2}>
        {question.answers.map((answer, index)=>{
            return <Answer key={index} updateAnswer={updateAnswer} answer={answer} removeAnswer={removeAnswer} is_change_allowed={is_correct_change_allowed}></Answer>
        })}
        <Button variant="contained" onClick={addAnswer}>Add Answer</Button>
        </Stack>
        </>
    )
}
export default PossibleAnswers;