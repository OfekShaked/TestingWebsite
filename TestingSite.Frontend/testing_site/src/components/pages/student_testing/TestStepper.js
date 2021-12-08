import React,{useState,useEffect} from 'react';
import {Box,Stepper,Step,StepButton,Stack,Button,Divider,Typography} from '@mui/material';
const TestStepper = (props) =>{
    const {numOfQuestions,activeStep,handleNext,handleBack,handleStep,completedQuestions} = props;

    const handleStepClick = (step) => {
      handleStep(step)
    }

    return(<>
    <Box sx={{ width: '100%' }}>
      <Stack direction="row">
        {activeStep!==0?<Button variant="contained" onClick={handleBack}>{'<<'} Previous Question</Button>:<></>}
        <Button variant="contained" onClick={handleNext}>{numOfQuestions-1===activeStep?"Submit the Test ":"Next Question "}{'>>'}</Button>
      <Divider/>
      <Typography>You answered {Object.keys(completedQuestions).length} out of {numOfQuestions} questions</Typography>
      <Stepper nonLinear activeStep={activeStep}>
        {[...Array(numOfQuestions)].map((_,index) => (
          <Step key={index} completed={!!completedQuestions[activeStep]}>
            <StepButton color="inherit" onClick={handleStepClick(index)}>
              {index}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </Stack>
      </Box>

    </>)
}

export default TestStepper;