import React, { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import Answer from "./Answer";
import draftToHtml from "draftjs-to-html";

const Question = (props) => {
  const {question} = props;
  const [testTakenQuestion,setTestTakenQuestion] = useState({question_id:question._id, answers_chosen:[]})

  const handleChangeAnswer = (answer_id, is_checked) => {
      //manipulate answers chosen based on conditions
      let test_question = {...testTakenQuestion}
      if(is_checked){
          if(question.type==="SingleChoiceQuestion") test_question.answers_chosen=[];
        test_question.answers_chosen.push(answer_id)
      }
      setTestTakenQuestion(test_question)
  }

  return (
    <Card className={props.className}>
      <CardContent>
          <div dangerouslySetInnerHTML={{__html:draftToHtml(JSON.parse(props.question.text_edited))}}></div>
          <div dangerouslySetInnerHTML={{__html:draftToHtml(JSON.parse(props.question.inner_text))}}></div>
        <FormControl
          error={false}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            <Stack>
              {question.optional_answers!=null ? question.optional_answers.map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    name={index}
                    handleChangeAnswer={handleChangeAnswer}
                    answer={answer}
                    testTakenQuestion={testTakenQuestion}
                  ></Answer>
                );
              }): <></>}
            
            </Stack>
          </FormGroup>
          <FormHelperText>{}</FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};
export default Question;
