import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EditorState, convertFromRaw } from "draft-js";
import TestLoginForm from "./TestLoginForm";
import TestQuestions from "./TestQuestions";
import TestResults from "./TestResults";
import StudentTestReport from "../reports/student_report/StudentTestReport";
import { ErrorNotificationContext } from "../../../contexts/ErrorNotificationContext";
import { logError } from "../../../services/logger";

const TestToTake = () => {
  const { id } = useParams();
  const setErrorMessage = useContext(ErrorNotificationContext);
  const [test, setTest] = useState({});
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [testTakenResults, setTestTakenResults] = useState({});

  const [testTaken, setTestTaken] = useState({
    test_id: id,
    test_questions: [],
    user: null,
  });

  const updateTestTakenProperty = async (keys, value) => {
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
    try {
      const res = await axios.get(`Tests/tested/${id}`);
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
        setErrorMessage("Server error please reload and try again");
        return;
      }
    } catch (err) {
      logError(err);
      setErrorMessage(
        "Unknown error when loading test please contact the manager"
      );
    }
  };

  const finishTest = async (questions) => {
    const testToSend = { ...testTaken };
    testToSend.test_questions = questions;
    testToSend.test_questions = Object.values(testToSend.test_questions);
    try {
      const res = await axios.post("TestTaken", testToSend);
      if (res.status === 200 && res.data != null) {
        setTestTakenResults(res.data);
        setIsTestFinished(true);
      } else {
        setErrorMessage(
          "Cannot get tests results atm please contact manager to check if your test was submitted correctly"
        );
      }
    } catch (err) {
      logError(err);
      setErrorMessage(
        "Unknown error when seding test to server please contact for help"
      );
    }
  };

  const updateQuestions = async (value) => {
    await updateTestTakenProperty(["test_questions"], value);
  };

  useEffect(() => {
    loadTest();
  }, []);

  return (
    <>
      {!isTestFinished ? (
        <>
          {testTaken.user === null ? (
            <TestLoginForm
              setUser={async (value) =>
                updateTestTakenProperty(["user"], value)
              }
            />
          ) : (
            <TestQuestions
              questions={test.questions}
              testName={test.name}
              testInstructions={test.instructions}
              testId={test._id}
              updateQuestions={updateQuestions}
              finishTest={finishTest}
            />
          )}
        </>
      ) : (
        <>
          {testTakenResults.summary == null ? (
            <TestResults
              grade={testTakenResults.grade}
              numOfQuestions={test.questions.length}
              passingGrade={test.passing_grade}
            />
          ) : (
            <StudentTestReport report={testTakenResults} />
          )}
        </>
      )}
    </>
  );
};

export default TestToTake;
