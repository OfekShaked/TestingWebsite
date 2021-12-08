import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorNotification from "../../common/error_notification/ErrorNotification";
import useErrorNotification from "../../../hooks/useErrorNotification/useErrorNotification";
import { EditorState, convertFromRaw } from "draft-js";
import TestLoginForm from "./TestLoginForm";
import TestQuestions from "./TestQuestions";


const TestToTake = () => {
  const { id } = useParams();
  const [test, setTest] = useState({});
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

  const updateTestTakenProperty = (keys, value) => {
      //updates a specific property in test taken
    let testToUpdate = { ...testTaken };
    let obj = testToUpdate;
    for (var i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[i]] = value;
    setTestTaken(testToUpdate);
  };

  const loadTest = async () => {
      //load test from server
    const res = await axios.get(`Tests/${id}`);
    if (res.status === 200 && res.data != null) {
      let testToLoad = res.data;
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

  useEffect(() => {loadTest()}, []);

  return (
    <>
        {testTaken.user===null?
        <TestLoginForm openNotification={openNotification} setUser={(value)=>updateTestTakenProperty(["user"],value)}/>:
            <TestQuestions questions={test.questions}/>
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
