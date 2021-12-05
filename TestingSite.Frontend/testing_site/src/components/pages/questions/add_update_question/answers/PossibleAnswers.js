import React,{ useState,useEffect}from 'react';
import {Stack,Button} from '@mui/material'
import Answer from './Answer'
import { v4 as uuidv4 } from 'uuid';

const PossibleAnswers = (props) =>{
    const {answers,updateAnswers,questionType} = props;
    const [isCorrectChangeAllowed,setIsCorrectChangeAllowed] = useState(false);
    const updateAnswer = (answer_to_update) =>{
        let answers_new=[...answers];
        let answersModified = answers_new.map(ans=>ans.front_id === answer_to_update.front_id ? answer_to_update:ans);
        updateAnswers(answersModified);
    }
    const removeAnswer = (answer_frontId) =>{
        let answers_new=[...answers];
        answers_new.splice(answers_new.findIndex(ans => answer_frontId === ans.front_id),1);
        updateAnswers(answers_new);
    }
    const addAnswer = ()=>{
        let answers_new=[...answers];
        answers_new.push({front_id:uuidv4(), text:'',is_correct:false});
        updateAnswers(answers_new);
    }

    const handleIsCorrectChange = (id) =>{
        let answersToUpdate = [...answers];
          if(questionType==="SingleChoiceQuestion"){
            answersToUpdate = answersToUpdate.map(ans=>{
                  if(ans.front_id===id) ans.is_correct=!ans.is_correct;
                  else ans.is_correct=false;
                  return ans;
                });
          }else{
            answersToUpdate = answersToUpdate.map(ans=>{
                if(ans.front_id===id) ans.is_correct=!ans.is_correct;
                return ans;
            });
          }
          console.log(answersToUpdate);
          updateAnswers(answersToUpdate);
      }


    const checkIfMultipleCorrectAllowed = () =>{
        if(questionType==="SignelChoiceQuestion"){
            for (const ans in answers) {
                if(ans.is_correct===true) {
                    setIsCorrectChangeAllowed(false);
                    return;
                }
            };
        }
        setIsCorrectChangeAllowed(true);
    }

    useEffect(()=>{
        checkIfMultipleCorrectAllowed();
    },[answers])

    return(
            <Stack spacing={2}>
            {answers.map((answer, index)=>{
                return <Answer updateAnswer={updateAnswer} answer={answer} removeAnswer={removeAnswer} handleIsCorrectChange={handleIsCorrectChange}></Answer>
            })}
            <Button variant="contained" onClick={addAnswer}>Add Answer</Button>
        </Stack>
    )
}
export default PossibleAnswers;