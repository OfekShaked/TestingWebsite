import React from "react";
import CommonTable from "../../../../common/table/CommonTable";

const GradesAndAnswers = (props) => {
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "user.name",
      valueGetter: (params)=>{return `${params.row.user.name.first} ${params.row.user.name.last}`},
      headerName: "Respondent",
      flex: 1,
    },
    {
      field: "test_questions",
      headerName: "# Of questions",
      renderCell: (params) => {
        return params.value.length;
      },
      flex: 1,
    },
    { field: "createdAt", headerName: "Submitted", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
  ];

  return (
    <>
      <CommonTable columns={columns} rows={props.tests} />
    </>
  );
};
export default GradesAndAnswers;
