import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import CommonTable from "../../../common/table/CommonTable";
import QuestionTextOverFlow from "../../../common/question_text_and_tag/QuestionTextOverFlow";
import ActionButton from "../../../common/action_button/ActionButton";
import "./ManageQuestions.css";
import Actions from "./Actions";
import { TopicContext } from "../../../../contexts/TopicContext";
import RedirectOnEmptyTopic from "../../../common/redirect_conditions/RedirectOnEmptyTopic";
import axios from "axios";
import QuestionModal from "../question_view/QuestionModal";
import useModal from "../../../../hooks/useModal/useModal";
import { useNavigate } from "react-router-dom";
import { ErrorNotificationContext } from "../../../../contexts/ErrorNotificationContext";
import { logError } from "../../../../services/logger";

const ManageQuestions = () => {
  const navigate = useNavigate();
  const topicContext = useContext(TopicContext);
  const errorNotificationContext = useContext(ErrorNotificationContext);
  const [questions, setQuestions] = useState([]);
  const [questionSelected, setQuestionSelected] = useState(null);
  const [questionOpen, handleQuestionOpen, handleQuestionClose] = useModal();

  useEffect(() => {
    const asyncFunc = async () => {
      //get all questions and set them in the table
      try {
        const res = await axios.get(`Questions/all/${topicContext.topic._id}`);
        if (res.status === 200) {
          const rows = res.data.map((ques) => {
            return {
              ...ques,
              id: ques._id,
              text: JSON.parse(ques.text).blocks[0].text,
              text_edited: ques.text,
            };
          });
          setQuestions(rows);
        } else {
          errorNotificationContext.setErrorMesssage(
            "Cannot get all questions atm please try again later."
          );
        }
      } catch (err) {
        logError(err);
        errorNotificationContext.setErrorMesssage(
          "Connection to server is lost please contact owners or try again"
        );
      }
    };
    asyncFunc();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "text",
      headerName: "Question text and tags",
      renderCell: (params) => {
        return (
          <QuestionTextOverFlow value={params.row} colDef={params.colDef} />
        );
      },
      flex: 1,
    },
    { field: "updated_at", headerName: "Last updated", flex: 1 },
    { field: "type", headerName: "Question Type", flex: 1 },
    { field: "number_of_tests", headerName: "# of tests", flex: 1 },
    {
      field: "edit",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        return (
          <ActionButton onClick={() => editQuestion(params.row)}>
            Edit
          </ActionButton>
        );
      },
      disableClickEventBubbling: true,
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
    { field: "is_active", headerName: "Is Active", type: "boolean", flex: 1 },
  ];

  const editQuestion = (row) => {
    //navigate to edit question
    navigate(`/questions/modify/${row._id}`);
  };

  const showQuestion = (row) => {
    //show question chosen
    setQuestionSelected(row);
    handleQuestionOpen();
  };

  return (
    <>
      <RedirectOnEmptyTopic />
      <Paper className="main-container">
        <Typography>{topicContext.topic.name}</Typography>
        <CommonTable columns={columns} rows={questions} />
        <Actions></Actions>
      </Paper>
      <QuestionModal
        open={questionOpen}
        handleClose={handleQuestionClose}
        question={questionSelected}
      />
    </>
  );
};

export default ManageQuestions;
