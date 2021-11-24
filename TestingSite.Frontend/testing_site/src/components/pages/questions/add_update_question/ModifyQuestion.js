import React,{useState,useContext} from "react";
import { Stack,Select,Paper, FormControl,InputLabel, MenuItem, Divider,TextField } from "@mui/material";
import QuestionField from './QuestionField';
import TextEditor from "./TextEditor";
import useSelect from '../../../../hooks/useSelectValue/useSelect'
import PossibleAnswers from "./answers/PossibleAnswers";
import AnswerAlignment from "./AnswerAlignment";
import Actions from './Actions';
import './ModifyQuestions.css'
import axios from 'axios';
import {TopicContext} from '../../../../contexts/TopicContext';
import useTextFieldList from "../../../../hooks/useTextFieldList/useTextFieldList";

const ModifyQuestion = (props) =>{
    const questionType = useSelect('');
    const {tags,onTextFieldChange,isTagsError} = useTextFieldList("");
    const [questionText,setQuestionText] = useState('');
    const [questionInnerText,setQuestionInnerText] = useState('');
    const [orientation,setOrientation] = useState('Vertical');
    const [question,setQuestion] = useState({answers:[]});
    const topicContext = useContext(TopicContext);

    const changeOrientation = (orientation)=>{
        setOrientation(orientation);
    }

    const updateAnswers = (answers) =>{
        let quest = {...question}
        quest.answers=answers;
        setQuestion(quest);
    }

    const saveQuestion = async() =>{
        await axios.post("Questions",{
            type:questionType.value,
            text:questionText,
            inner_text:questionInnerText,
            orientation:orientation,
            optional_answers:question.answers,
            tags:tags,
            topic_ids:[topicContext.topic._id]
        });
    }

    const showQuestion = () =>{

    }


    return(
        <Paper className="centerize">
        <Stack spacing={2}>
            <QuestionField field={"Field"}>{topicContext.topic.name}</QuestionField>
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
                    <TextEditor value={questionText} setValue={setQuestionText}></TextEditor>
                </QuestionField>
                <QuestionField field={"Text below question"}>
                    <TextEditor value={questionInnerText} setValue={setQuestionInnerText}></TextEditor>
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
                        value={tags} onChange={onTextFieldChange}
                        error={isTagsError}
                    />
                </QuestionField>
                <Actions save={saveQuestion} show={showQuestion}/>
        </Stack>
        </Paper>
    )
}

export default ModifyQuestion;