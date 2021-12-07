import React,{useEffect,useState} from "react";
import QuestionTextOverFlow from "../../../../common/question_text_and_tag/QuestionTextOverFlow";
import ActionButton from "../../../../common/action_button/ActionButton";
import CommonTable from "../../../../common/table/CommonTable";
import {Paper,Typography} from '@mui/material';
import QuestionModal from "../../../questions/question_view/QuestionModal";
import useModal from "../../../../../hooks/useModal/useModal";
import axios from "axios";

const ChooseQuestions = (props) => {
  const { updateQuestions, questions } = props;
  const [questionsToShow,setQuestionsToShow] = useState([])
  const [questionSelected,setQuestionSelected] = useState(null);
  const [selectionModel,setSelectionModel] = useState([]);
  const [questionOpen,handleQuestionOpen,handleQuestionClose] = useModal();

  const showQuestion = (row) => {
    setQuestionSelected(row);
    handleQuestionOpen();
  };

  const onSelectionChange = (newSelection) =>{
    let questionsToSave = [];
    questionsToShow.forEach(ques=>{
        if(newSelection.includes(ques._id)) questionsToSave.push(ques);
    })
    setSelectionModel(newSelection);
    updateQuestions(questionsToSave);
  }

  useEffect(() => {
    const asyncFunc = async() => {
      //get all questions and set them in the table
      const res = await axios.get("Questions");
      const rows = res.data.map(ques=>{return {
          ...ques,
          id:ques._id,
          text:JSON.parse(ques.text).blocks[0].text,
          text_edited:ques.text,
        }})
        setQuestionsToShow(rows);
    };
    asyncFunc();
  }, []);

  const columns = [
    {
      field: "text",
      headerName: "Question text and tags",
      valueGetter: (params) =>{return params.row.text+" "+params.row.tags.join(",")},
      renderCell: (params) => {
        return (
          <QuestionTextOverFlow value={params.row} colDef={params.colDef} />
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
        <CommonTable columns={columns} rows={questionsToShow} checkboxSelection
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
