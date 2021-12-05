import React,{ useState,useEffect}from 'react';
import {Stack,Button} from '@mui/material'
import Answer from './Answer'
import { v4 as uuidv4 } from 'uuid';

const PossibleAnswers = (props) =>{
    const {answers,updateAnswers,questionType} = props;
    const [isCorrectChangeAllowed,setIsCorrectChangeAllowed] = useState(false);

    const updateAnswer = (answer_to_update) =>{
        //update specific answer
        let answers_new=[...answers];
        let answersModified = answers_new.map(ans=>ans.front_id === answer_to_update.front_id ? answer_to_update:ans);
        updateAnswers(answersModified);
    }

    const removeAnswer = (answer_frontId) =>{
        //removes answer by special frontid give before
        let answers_new=[...answers];
        answers_new.splice(answers_new.findIndex(ans => answer_frontId === ans.front_id),1);
        updateAnswers(answers_new);
    }

    const addAnswer = ()=>{
        //add new answer to the list
        let answers_new=[...answers];
        answers_new.push({front_id:uuidv4(), text:'',is_correct:false});
        updateAnswers(answers_new);
    }

    const handleIsCorrectChange = (id) =>{
        //changes is correct and makes sure it complies with the choice person made before
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
          updateAnswers(answersToUpdate);
      }

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