import React from "react";
import CommonTable from "../../../common/table/CommonTable";
import ActionButton from "../../../common/action_button/ActionButton";

const GradesAndAnswers = (props) => {
  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const openTestReport = (id) => {
    openInNewTab(`${window.location.origin}/TestReport/${id}`);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "user.name",
      valueGetter: (params) => {
        return `${params.row.user.name.first} ${params.row.user.name.last}`;
      },
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
    {
      field: "user",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <ActionButton onClick={() => openTestReport(params.row._id)}>
            Show
          </ActionButton>
        );
      },
      disableClickEventBubbling: true,
      flex: 1,
    },
  ];

  return (
    <>
      <CommonTable columns={columns} rows={props.tests} />
    </>
  );
};
export default GradesAndAnswers;
