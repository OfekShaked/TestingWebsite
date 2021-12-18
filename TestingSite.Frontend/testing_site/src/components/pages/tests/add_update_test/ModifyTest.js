import React, { useContext, useState,useEffect } from "react";
import FormField from "../../../common/form_field/FormField";
import { TopicContext } from "../../../../contexts/TopicContext";
import { TextField, Checkbox, Paper, Stack, Divider } from "@mui/material";
import RedirectOnEmptyTopic from "../../../common/redirect_conditions/RedirectOnEmptyTopic";
import SelectChoices from "../../../common/select_choices/SelectChoices";
import TextEditor from "../../../common/text_editor/TextEditor";
import EmailDelieveryStatus from "./EmailDeliveryStatus";
import ChooseQuestions from "./choose_questions/ChooseQuestions";
import { EditorState, convertFromRaw,convertToRaw } from "draft-js";
import PredefinedTemplates from "./PredefinedTemplates";
import Actions from "./Actions";
import { useParams } from "react-router-dom";
import useErrorNotification from "../../../../hooks/useErrorNotification/useErrorNotification"; 
import ErrorNotification from "../../../common/error_notification/ErrorNotification";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import "./ModifyTest.css";


const ModifyTest = () => {
  const navigate = useNavigate();
  const topicContext = useContext(TopicContext);
  const { id } = useParams();
  const [notificationError,setNotificationError,isNotificationOpen,setIsNotificationOpen] = useErrorNotification();
  const [questionsToDisplay,setQuestionsToDisplay] = useState([]);
  const [test, setTest] = useState({
    topic_id: topicContext.topic._id,
    language: "English",
    name: "",
    passing_grade: "50",
    is_answer_shown: "true",
    instructions: EditorState.createEmpty(),
    success_text: EditorState.createEmpty(),
    failed_text: EditorState.createEmpty(),
    tester_email: "",
    email_success_content: "",
    email_failed_conent: "",
    questions: [],
  });

  /**
   * update test inner property generic
   * @param {*} keys
   * @param {*} value
   */
  const updateTestProperty = (keys, value) => {
    let testToUpdate = { ...test };
    let obj = testToUpdate;
    for (var i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[i]] = value;
    setTest(testToUpdate);
  };

  const updateQuestions = (questions) =>{
    updateTestProperty(["questions"],questions);
  }

  const loadTest = async() =>{
    if(id !== "add"){
      const res = await axios.get(`Tests/${id}`);
      if (res.status === 200 && res.data != null) {
        let testToLoad = res.data;
        testToLoad.instructions = EditorState.createWithContent(convertFromRaw(JSON.parse(testToLoad.instructions)));
        testToLoad.success_text= EditorState.createWithContent(convertFromRaw(JSON.parse(testToLoad.success_text)));
        testToLoad.failed_text = EditorState.createWithContent(convertFromRaw(JSON.parse(testToLoad.failed_text)));
        setTest(testToLoad);
        setQuestionsToDisplay(testToLoad.questions);
      }else{
        openNotification("Server error please reload and try again");
        return;
      }
    }
  }

  const saveTest = async() =>{
    if(isTestValid()){
      const testToSave = {...test};
      testToSave.instructions = JSON.stringify(convertToRaw(test.instructions.getCurrentContent()));
      testToSave.success_text = JSON.stringify(convertToRaw(test.success_text.getCurrentContent()));
      testToSave.failed_text = JSON.stringify(convertToRaw(test.failed_text.getCurrentContent()));
      if (id === "add") {
        const res = await axios.post("tests", testToSave);
        if(res.status!==200) openNotification("Cannot add test atm please try again");
        else navigate("/tests/manage")
      } else {
        test._id = id;
        const res = await axios.put("tests", testToSave);
        if(res.status!==200) openNotification("Cannot update test atm please try again");
        else navigate("/tests/manage")
      }
    }
  }

  const openNotification = (message) =>{
    setIsNotificationOpen(true);
      setNotificationError(message);
  }

  const isTestValid = ()=>{
    //Validation before save or update
    if(test.name==="") {
      openNotification("Test Name is empty");
      return false;
    }
    if(isNaN(test.passing_grade)){
      openNotification("Test passing grade cannot be empty or not a number");
      return false;
    }
    if(test.passing_grade<0||test.passing_grade>100){
      openNotification("Test passing grade must be 0-100");
      return false;
    }
    if(test.questions.length<1){
      openNotification("There must be atleast 1 question added");
      return false;
    }
    return true;
  }

  useEffect(()=>{
    loadTest();
  },[])

  return (
    <>
      <RedirectOnEmptyTopic />
      <Paper className="centerize">
        <Stack spacing={2}>
          <Divider>General Test Details</Divider>
          <FormField field={"Field of study"}>
            {topicContext.topic.name}
          </FormField>
          <FormField field={"Language"}>
            <SelectChoices
              value={test.language}
              onValueChange={(e) =>
                updateTestProperty(["language"], e.target.value)
              }
              choices={[
                { value: "English", text: "English" },
                { value: "Hebrew", text: "Hebrew" },
              ]}
            />
          </FormField>
          <FormField field={"Test Name"}>
            <TextField
              id="tag-name"
              label="Test Name"
              value={test.name}
              onChange={(e) => updateTestProperty(["name"], e.target.value)}
            />
          </FormField>
          <FormField field={"Passing grade"}>
            <TextField
              type="number"
              id="tag-grade"
              label="Passing Grade"
              value={test.passing_grade}
              onChange={(e) => updateTestProperty(["passing_grade"], e.target.value)}
            />
          </FormField>
          <FormField field={"Show Correct Answers After Submission"}>
            <Checkbox
              checked={test.is_answer_shown}
              onChange={(e) =>
                updateTestProperty(["is_answer_shown"], e.target.checked)
              }
            />
          </FormField>
          <FormField field={"Test Instructions"}>
            <TextEditor
              setValue={(value) => updateTestProperty(["instructions"], value)}
              setEditorValue={(value) =>
                updateTestProperty(["instructions"], value)
              }
              editorValue={test.instructions}
            />
          </FormField>
          <FormField field={"Message to show on success"}>
            <TextEditor
              setValue={() =>{}}
              setEditorValue={(value) =>
                updateTestProperty(["success_text"], value)
              }
              editorValue={test.success_text}
            />
          </FormField>
          <FormField field={"Message to show on failure"}>
            <TextEditor
              setValue={() =>{}}
              setEditorValue={(value) =>
                updateTestProperty(["failed_text"], value)
              }
              editorValue={test.failed_text}
            />
          </FormField>
          <Divider>Email Delivery Upon Test Completion</Divider>
          <FormField field={"Current Status"}>
            <EmailDelieveryStatus email={test.tester_email} />
          </FormField>
          <FormField field={"From"}>
            <TextField
              type="email"
              id="tag-email"
              label="email"
              value={test.tester_email}
              onChange={(e) =>
                updateTestProperty(["tester_email"], e.target.value)
              }
            />
          </FormField>
          <Divider>Passing the Test</Divider>
          <FormField field={"Passing message"}>
            <TextField
              id="tag-passing"
              label="passing"
              multiline
              value={test.email_success_content}
              onChange={(e) =>
                updateTestProperty(["email_success_content"], e.target.value)
              }
            />
          </FormField>
          <FormField field={"Failing message"}>
            <TextField
              id="tag-failed"
              label="failing"
              multiline
              value={test.email_failed_conent}
              onChange={(e) =>
                updateTestProperty(["email_failed_conent"], e.target.value)
              }
            />
          </FormField>
          <PredefinedTemplates/>
          <Divider>Questions</Divider>
          <ChooseQuestions updateQuestions={updateQuestions} questions={test.questions} questionsToDisplay={questionsToDisplay}/>
          <Actions save={saveTest}/>
        </Stack>
      </Paper>
      <ErrorNotification message={notificationError} open={isNotificationOpen} setOpen={setIsNotificationOpen}/>
    </>
  );
};
export default ModifyTest;
