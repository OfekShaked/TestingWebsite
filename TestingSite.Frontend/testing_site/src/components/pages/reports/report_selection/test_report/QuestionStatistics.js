import React from 'react';
import CommonTable from '../../../../common/table/CommonTable';
import QuestionTextOverFlow from '../../../../common/question_text_and_tag/QuestionTextOverFlow';

const QuestionStatistics = (props) =>{
    const {questions} = props;
    console.log(questions[0].question._id);
    const columns = [
        { 
            field: "question._id", 
            headerName: "ID",
            valueGetter: (params)=>{return params.row.question._id},
            flex: 1 
        },
        {
            field: "question.text",
            headerName: "Question",
            renderCell: (params)=>{return <QuestionTextOverFlow tags={params.row.question.tags} text={JSON.parse(params.row.question.text).blocks[0].text} value={params.row} colDef={params.colDef}/>},
            flex: 1,
          },
        {
          field: "num_of_submissions",
          headerName: "Number Of Submissions",
          flex: 1,
        },
        { field: "answer_correct_percent", headerName: "% Answered Correctly", flex: 1 },
      ];
    

    return(<>
        <CommonTable columns={columns} rows={questions}/>
    </>)
}
export default QuestionStatistics;