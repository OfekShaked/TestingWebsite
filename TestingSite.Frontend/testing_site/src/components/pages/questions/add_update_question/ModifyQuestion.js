import React,{useState} from "react";
import { Stack,Select, FormControl,InputLabel, MenuItem, Divider,TextField } from "@mui/material";
import QuestionField from './QuestionField';
import TextEditor from "./TextEditor";
import useSelect from '../../../../hooks/useSelectValue/useSelect'
import PossibleAnswers from "./answers/PossibleAnswers";
import AnswerAlignment from "./AnswerAlignment";
import Actions from './Actions';

const ModifyQuestion = (props) =>{
    const questionType = useSelect('');
    const [questionText,setQuestionText] = useState('');
    const [questionInnerText,setQuestionInnerText] = useState('');
    const [tags,setTags] = useState('');
    const [orientation,setOrientation] = useState(props.question.alignment);
    const [question,setQuestion] = useState({});

    const changeOrientation = (orientation)=>{
        setOrientation(orientation);
    }

    const updateAnswers = (answers) =>{
        let quest = {...question}
        quest.answers=answers;
        setQuestion(quest);
    }

    const saveQuestion = () =>{

    }
    const goBack = () =>{

    }
    const showQuestion = () =>{

    }

    return(
        <Stack spacing={2}>
            <QuestionField field={"Field"}>{props.topic}</QuestionField>
            <QuestionField field={"Question Type"}>
                <FormControl sx={{m:1,minWidth:100}}>
                    <InputLabel id="question-type-select-label">Question Type</InputLabel>
                <Select
                labelId="question-type-select-label"
                {...useSelect}
                autoWidth label="Question Type">
                    <MenuItem value={"SingleChoiceQuestion"}>Single Choice Question</MenuItem>
                    <MenuItem value={"MultipleChoiceQuestion"}>Multiple Choice Question</MenuItem>
                </Select>
                </FormControl>
                </QuestionField>
                <QuestionField field={"Question Text"}>
                    <TextEditor label={"Question Text"} value={questionText} setValue={setQuestionText}></TextEditor>
                </QuestionField>
                <QuestionField field={"Text below question"}>
                    <TextEditor label={"Text below question"} value={questionInnerText} setValue={setQuestionInnerText}></TextEditor>
                </QuestionField>
                <Divider/>
                <QuestionField field={"Possible Answers"}>
                    <PossibleAnswers updateAnswers={updateAnswers} question={question}></PossibleAnswers>
                </QuestionField>
                <QuestionField field={"Answer layout"}>
                    <AnswerAlignment changeOrientation={changeOrientation} value={orientation}/>
                </QuestionField>
                <Divider />
                <QuestionField field={"Tags"}>
                    <TextField helperText="Please enter tags seperated by a comma" id="tag-input" label="Tags"
                        value={tags} onChange={(e)=>setTags(e.target.value)}
                    />
                </QuestionField>
                <Actions save={saveQuestion} back={goBack} show={showQuestion}/>
        </Stack>
    )
}

export default ModifyQuestion;