import React, {  useState } from "react";
import Question from "./questions/Question";
import TestInstructions from "./TestInstructions";
import { Stack, Typography } from "@mui/material";
import TestStepper from "./TestStepper";

const TestQuestions = (props) => {
  const { questions,testName,testInstructions,testId,updateQuestions,finishTest } = props;
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testTakenQuestions, setTestTakenQuestions] = useState({});

  const handleTestTakenQuestionChange = (questionTaken) => {
      //handle what happens when a test question has changed its value
    const testTakenQuestionsToUpdate = { ...testTakenQuestions };
    testTakenQuestionsToUpdate[currentQuestionIndex] = questionTaken;
    setTestTakenQuestions(testTakenQuestionsToUpdate);
  };

  const handleNextQuestion = () => {
    const newActiveQuestionIndex =
      isLastQuestion() && !isAllQuestionsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          questions.findIndex((step, i) => !(i in testTakenQuestions))
        : currentQuestionIndex + 1;
        setCurrentQuestionIndex(newActiveQuestionIndex);
  };

  const handleBack = () => {
      //previous question clicked
    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  const handleSubmit = async() =>{
    await updateQuestions(testTakenQuestions);
    finishTest(testTakenQuestions);
  }

  const handleQuestion = (questionIndex) => {
      //handle question step click
    setCurrentQuestionIndex(questionIndex);
  };

  const isLastQuestion = () => {
      //checks if current question is the last question
    return currentQuestionIndex === questions.length - 1;
  };

  const isAllQuestionsCompleted = () => {
      //checks if all tests questions has been completed
    return Object.keys(testTakenQuestions).length === questions.length;
  };


  return (
    <>
      {!isStarted ? (
        <TestInstructions name={testName} instructions={testInstructions} startTest={() => setIsStarted(true)} />
      ) : (
        <Stack>
            <Typography>Question {currentQuestionIndex+1}</Typography>
            <Question 
              question={questions[currentQuestionIndex]}
              testId={testId}
              updateTestTakenQuestion={handleTestTakenQuestionChange}
              testTakenQuestion={testTakenQuestions[currentQuestionIndex]}
            ></Question>
          <TestStepper
            completedQuestions={testTakenQuestions}
            activeStep={currentQuestionIndex}
            handleNext={handleNextQuestion}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            numOfQuestions={questions.length}
            handleStep={handleQuestion}
          />
        </Stack>
      )}
    </>
  );
};
export default TestQuestions;
