import React,{useState,useEffect} from 'react';
import {Box,Stepper,Step,StepButton} from '@mui/material';
const TestStepper = (props) =>{
    const {questions,activeQuestion} = props;
    const [activeStep,setActiveStep] = useState(0);
    const [completed,setCompleted] = useState({});

    const handleStepClick = () => {

    }

    const isComplete = (index)=>{

    }

    useEffect(()=>{
        setActiveStep(activeQuestion.index);
    },[activeQuestion])

    return(<>
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {questions.map((question) => (
          <Step key={question.index} completed={()=>isComplete(question.index)}>
            <StepButton color="inherit" onClick={handleStepClick(question.index)}>
              {question.index}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </Box>

    </>)
}

export default TestStepper;