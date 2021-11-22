import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import Answer from "./Answer";

const Question = () => {
  const [question, setQuestion] = useState({});
  const [testTakenQuestion,setTestTakenQuestion] = useState({question_id:question._id, answers_chosen:[]})

  const handleChangeAnswer = (answer_id, is_checked) => {
      //manipulate answers chosen based on conditions
      let test_question = {...testTakenQuestion}
      if(is_checked){
          if(question.type==="SingleChoiceQuestion") test_question.answers_chosen=[];
        test_question.answers_chosen.push(answer_id)
      }else{
        test_question.answers.filter(ans=>ans!==answer_id);
      }
      setTestTakenQuestion(test_question)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {question.text}
        </Typography>
        <FormControl
          error={false}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            <Stack>
              {question.answers.map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    name={index}
                    handleChangeAnswer={handleChangeAnswer}
                    answer={answer}
                    testTakenQuestion={testTakenQuestion}
                  ></Answer>
                );
              })}
            </Stack>
          </FormGroup>
          <FormHelperText>{"No error"}</FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};
export default Question;
