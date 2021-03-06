import React from "react";
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
import TextEditorToHtml from '../../../common/texteditor_to_html/TextEditorToHtml';


const Question = (props) => {
  const {question,updateTestTakenQuestion,testTakenQuestion,testId} = props;

  const handleChangeAnswer = (answer_id, is_checked) => {
      //manipulate answers chosen based on conditions
      let testTakenQuestionToUpdate = {test_taken_id:testId,question_id:question._id, answers_chosen:[]};
      if(is_checked){
          if(question.type==="SingleChoiceQuestion") testTakenQuestionToUpdate.answers_chosen=[];
          testTakenQuestionToUpdate.answers_chosen.push(answer_id)
      }
      if(updateTestTakenQuestion!=null) updateTestTakenQuestion(testTakenQuestionToUpdate);
  }

  return (
    <Card className={props.className}>
      <CardContent>
          {props.question.text_edited==null?<TextEditorToHtml value={props.question.text}/>:<TextEditorToHtml value={props.question.text_edited}/>}
          <TextEditorToHtml value={props.question.inner_text}/>
        <FormControl
          error={false}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Pick {question.type==='SingleChoiceQuestion'?"One":"Mupltiple"}</FormLabel>
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
