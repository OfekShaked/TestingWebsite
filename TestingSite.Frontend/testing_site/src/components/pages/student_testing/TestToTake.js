import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorNotification from "../../common/error_notification/ErrorNotification";
import useErrorNotification from "../../../hooks/useErrorNotification/useErrorNotification";
import { EditorState, convertFromRaw } from "draft-js";
import TestLoginForm from "./TestLoginForm";
import TestQuestions from "./TestQuestions";
import TestResults from "./TestResults";

const TestToTake = () => {
  const { id } = useParams();
  const [test, setTest] = useState({});
  const [isTestFinished,setIsTestFinished] = useState(false);
  const [testTakenResults,setTestTakenResults] = useState({});
  const [
    notificationError,
    setNotificationError,
    isNotificationOpen,
    setIsNotificationOpen,
  ] = useErrorNotification();
  const [testTaken,setTestTaken] = useState({
      test_id:id,
      test_questions:[],
      user:null
  })

  const openNotification = (message) => {
    setIsNotificationOpen(true);
    setNotificationError(message);
  };

  const updateTestTakenProperty = async(keys, value) => {
      //updates a specific property in test taken
    let testToUpdate = { ...testTaken };
    let obj = testToUpdate;
    for (var i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[i]] = value;
    await setTestTaken(testToUpdate);
  };

  const loadTest = async () => {
      //load test from server
    const res = await axios.get(`Tests/tested/${id}`);
    if (res.status === 200 && res.data != null) {
      let testToLoad = res.data;
      console.log(testToLoad);
      testToLoad.instructions_editors = EditorState.createWithContent(
        convertFromRaw(JSON.parse(testToLoad.instructions))
      );
      testToLoad.success_text_editor = EditorState.createWithContent(
        convertFromRaw(JSON.parse(testToLoad.success_text))
      );
      testToLoad.failed_text_editor = EditorState.createWithContent(
        convertFromRaw(JSON.parse(testToLoad.failed_text))
      );
      setTest(testToLoad);
    } else {
      openNotification("Server error please reload and try again");
      return;
    }
  };

  const finishTest = async() =>{
    const testToSend = {...testTaken};
    testToSend.test_questions=Object.values(testTaken.test_questions);
    const res = await axios.post("TestTaken",testToSend);
    console.log(testToSend);
    setTestTakenResults(res.data);
    setIsTestFinished(true);
  }

  useEffect(() => {loadTest()}, []);

  return (
    <>
    {!isTestFinished?<>
        {testTaken.user===null?
        <TestLoginForm  openNotification={openNotification} setUser={(value)=>updateTestTakenProperty(["user"],value)}/>:
            <TestQuestions questions={test.questions} testName={test.name} testInstructions={test.instructions} testId={test._id}
              updateQuestions={async(value)=>await updateTestTakenProperty(["test_questions"],value)} finishTest={finishTest}
            />
        }</>:<TestResults grade={testTakenResults.grade} numOfQuestions={test.questions.length} passingGrade={test.passing_grade}/>
      }
      <ErrorNotification
        message={notificationError}
        open={isNotificationOpen}
        setOpen={setIsNotificationOpen}
      />
    </>
  );
};

export default TestToTake;
