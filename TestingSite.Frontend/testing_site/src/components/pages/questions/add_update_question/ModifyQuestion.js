import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Stack,
  Select,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material";
import FormField from "../../../common/form_field/FormField";
import TextEditor from "../../../common/text_editor/TextEditor";
import useSelect from "../../../../hooks/useSelectValue/useSelect";
import PossibleAnswers from "./answers/PossibleAnswers";
import AnswerAlignment from "./AnswerAlignment";
import Actions from "./Actions";
import "./ModifyQuestions.css";
import axios from "axios";
import { TopicContext } from "../../../../contexts/TopicContext";
import useTextFieldList from "../../../../hooks/useTextFieldList/useTextFieldList";
import RedirectOnEmptyTopic from "../../../common/redirect_conditions/RedirectOnEmptyTopic";
import QuestionModal from "../question_view/QuestionModal";
import useModal from "../../../../hooks/useModal/useModal";
import useTextEditor from "../../../../hooks/useTextEditor/useTextEditor";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {logError} from "../../../../services/logger";
import {ErrorNotificationContext} from "../../../../contexts/ErrorNotificationContext";

const ModifyQuestion = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const setErrorMesssage = useContext(ErrorNotificationContext);
  const [typeValue, onTypeValueChange] = useSelect("");
  const tagsField = useTextFieldList("");
  const [
    questionText,
    setQuestionText,
    questionTextEditor,
    setQuestionTextEditor,
  ] = useTextEditor(null);
  const [
    questionInnerText,
    setQuestionInnerText,
    questionInnerTextEditor,
    setQuestionInnerTextEditor,
  ] = useTextEditor(null);
  const [orientation, setOrientation] = useState("Vertical");
  const [answers, setAnswers] = useState([]);
  const topicContext = useContext(TopicContext);
  const [questionOpen, handleQuestionOpen, handleQuestionClose] = useModal();
  const [questionToShow, setQuestionToShow] = useState({});

  const changeOrientation = (orientation) => {
    setOrientation(orientation);
  };

  const updateAnswers = (answers_recieved) => {
    //update the answers of the current question
    setAnswers(answers_recieved);
  };

  const saveQuestion = async () => {
    //sends the question to the server and saves it
    if (isQuestionValid()) {
      const questionToSend = {
        type: typeValue,
        text: questionText,
        inner_text: questionInnerText,
        orientation: orientation,
        optional_answers: answers,
        tags: tagsField.value,
        topic_ids: [topicContext.topic._id],
      };
      if (id === "add") {
        try{
        const res = await axios.post("questions", questionToSend);
        if (res.status !== 200)
          setErrorMesssage("Cannot add question atm please try again");
        else navigate("/questions/manage");
        }catch (err) {
          logError(err);
          setErrorMesssage("Unknown error when adding question try again later");
        }
      } else {
        questionToSend._id = id;
        try{
        const res = await axios.put("questions", questionToSend);
        if (res.status !== 200)
        setErrorMesssage("Cannot update question atm please try again");
        else navigate("/questions/manage");
        } catch (err) {
          logError(err);
          setErrorMesssage("Unknown error when updating question try again later");
        }
      }
    }
  };

  const showQuestion = () => {
    setQuestionToShow(getQuestion());
    handleQuestionOpen();
  };

  const loadQuestion = async () => {
    //load question by id from server to client
    if (id !== "add") {
      try{
      const res = await axios.get(`Questions/${id}`);
      if (res.status === 200 && res.data != null) {
        let question = res.data;
        setQuestionData(question);
      } else {
        setErrorMesssage("Server error please reload and try again");
        return;
      }
    }catch(err){
      logError(err);
      setErrorMesssage("Unknown error when loading question try again later")
    }
    }
  };
  const setQuestionData = (question) => {
    onTypeValueChange({ target: { value: question.type } });
    setQuestionTextEditor(
      EditorState.createWithContent(convertFromRaw(JSON.parse(question.text))),
      null
    );
    setQuestionInnerTextEditor(
      //sets the inner text of the editor
      EditorState.createWithContent(
        convertFromRaw(JSON.parse(question.inner_text))
      ),
      null
    );
    setOrientation(question.orientation);
    let answers_loaded = question.optional_answers.map((ans) => {
      return { ...ans, front_id: uuidv4() };
    });
    setAnswers(answers_loaded);
    tagsField.onChange({ target: { value: question.tags } });
  };

  const getQuestion = () => {
    //returns the question object
    return {
      _id: id,
      type: JSON.parse(JSON.stringify(typeValue)),
      text: JSON.stringify(
        convertToRaw(questionTextEditor.getCurrentContent())
      ),
      text_edited: JSON.stringify(
        convertToRaw(questionTextEditor.getCurrentContent())
      ),
      inner_text: JSON.stringify(
        convertToRaw(questionInnerTextEditor.getCurrentContent())
      ),
      orientation: JSON.parse(JSON.stringify(orientation)),
      optional_answers: JSON.parse(JSON.stringify(answers)),
      tags: JSON.parse(JSON.stringify(tagsField.value)),
      topic_ids: [topicContext.topic._id],
    };
  };

  const isQuestionValid = () => {
    //Validation before save or update
    const question_recieved = getQuestion();
    if (question_recieved.type === "") {
      setErrorMesssage("Type is empty");
      return false;
    }
    if (JSON.parse(question_recieved.text).blocks[0].text.length < 2) {
      setErrorMesssage(
        "Question text cannot be empty or smaller than 2 characters"
      );
      return false;
    }
    if (question_recieved.optional_answers.length < 2) {
      setErrorMesssage("There must be atleast 2 answers added");
      return false;
    }
    for (let i = 0; i < question_recieved.optional_answers.length; i++) {
      if (question_recieved.optional_answers[i].is_correct === true) return true;
    }
    setErrorMesssage("There must be atleast 1 correct answer!");
    return false;
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <>
      <RedirectOnEmptyTopic />
      <Paper className="centerize">
        <Stack spacing={2}>
          <FormField field={"Field"}>{topicContext.topic.name}</FormField>
          <FormField field={"Question Type"}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="question-type-select-label">
                Question Type
              </InputLabel>
              <Select
                labelId="question-type-select-label"
                value={typeValue}
                onChange={onTypeValueChange}
                autoWidth
                label="Question Type"
              >
                <MenuItem value={"SingleChoiceQuestion"}>
                  Single Choice Question
                </MenuItem>
                <MenuItem value={"MultipleChoiceQuestion"}>
                  Multiple Choice Question
                </MenuItem>
              </Select>
            </FormControl>
          </FormField>
          <FormField field={"Question Text"}>
            <TextEditor
              value={questionText}
              setValue={setQuestionText}
              setEditorValue={setQuestionTextEditor}
              editorValue={questionTextEditor}
            ></TextEditor>
          </FormField>
          <FormField field={"Text below question"}>
            <TextEditor
              value={questionInnerText}
              setValue={setQuestionInnerText}
              setEditorValue={setQuestionInnerTextEditor}
              editorValue={questionInnerTextEditor}
            ></TextEditor>
          </FormField>
          <Divider />
          <FormField field={"Possible Answers"}>
            <PossibleAnswers
              updateAnswers={updateAnswers}
              answers={answers}
              questionType={typeValue}
            ></PossibleAnswers>
          </FormField>
          <FormField field={"Answer layout"}>
            <AnswerAlignment
              changeOrientation={changeOrientation}
              value={orientation}
            />
          </FormField>
          <Divider />
          <FormField field={"Tags"}>
            <TextField
              helperText="Please enter tags seperated by a comma"
              id="tag-input"
              label="Tags"
              {...tagsField}
            />
          </FormField>
          <Actions save={saveQuestion} show={showQuestion} />
        </Stack>
      </Paper>
      <QuestionModal
        open={questionOpen}
        handleClose={handleQuestionClose}
        question={questionToShow}
      />
    </>
  );
};

export default ModifyQuestion;
