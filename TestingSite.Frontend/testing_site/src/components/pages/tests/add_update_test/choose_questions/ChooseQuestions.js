import React, { useEffect, useState, useContext } from "react";
import QuestionTextOverFlow from "../../../../common/question_text_and_tag/QuestionTextOverFlow";
import ActionButton from "../../../../common/action_button/ActionButton";
import CommonTable from "../../../../common/table/CommonTable";
import { Paper } from "@mui/material";
import QuestionModal from "../../../questions/question_view/QuestionModal";
import useModal from "../../../../../hooks/useModal/useModal";
import axios from "axios";
import { TopicContext } from "../../../../../contexts/TopicContext";
import { ErrorNotificationContext } from "../../../../../contexts/ErrorNotificationContext";
import { logError } from "../../../../../services/logger";

const ChooseQuestions = (props) => {
  const { updateQuestions, questionsToDisplay } = props;
  const topicContext = useContext(TopicContext);
  const setErrorMesssage = useContext(ErrorNotificationContext);
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [questionSelected, setQuestionSelected] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [questionOpen, handleQuestionOpen, handleQuestionClose] = useModal();

  const showQuestion = (row) => {
    setQuestionSelected(row);
    handleQuestionOpen();
  };

  const onSelectionChange = (newSelection) => {
    if (newSelection != null && newSelection.length > 0) {
      let questionsToSave = [];
      if (newSelection[0]._id != null) {
        newSelection = newSelection.map((ques) => ques._id);
      }
      questionsToShow.forEach((ques) => {
        if (newSelection.includes(ques._id)) questionsToSave.push(ques);
      });
      setSelectionModel(newSelection);
      updateQuestions(questionsToSave);
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      //get all questions and set them in the table
      try {
        const res = await axios.get(`Questions/all/${topicContext.topic._id}`);
        if (res.status === 200 && res.data != null) {
          const rows = res.data.map((ques) => {
            return {
              ...ques,
              id: ques._id,
              text: JSON.parse(ques.text).blocks[0].text,
              text_edited: ques.text,
            };
          });
          await setQuestionsToShow(rows);
          if (questionsToDisplay != null && questionsToDisplay.length > 0) {
            onSelectionChange(questionsToDisplay);
          }
        } else {
          setErrorMesssage("Cannot load all questions please try again later");
        }
      } catch (err) {
        logError(err);
        setErrorMesssage("Unknown error when loading questions");
      }
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    onSelectionChange(questionsToDisplay);
  }, [questionsToDisplay]);

  const columns = [
    {
      field: "text",
      headerName: "Question text and tags",
      renderCell: (params) => {
        return (
          <QuestionTextOverFlow
            tags={params.row.tags.join(",")}
            text={params.row.text}
            value={params.row}
            colDef={params.colDef}
          />
        );
      },
      flex: 1,
    },
    {
      field: "show",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        return (
          <ActionButton onClick={() => showQuestion(params.row)}>
            Show
          </ActionButton>
        );
      },
      disableClickEventBubbling: true,
    },
  ];

  return (
    <>
      <Paper className="main-container">
        <CommonTable
          columns={columns}
          rows={questionsToShow}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={onSelectionChange}
        />
      </Paper>
      <QuestionModal
        open={questionOpen}
        handleClose={handleQuestionClose}
        question={questionSelected}
      />
    </>
  );
};
export default ChooseQuestions;
