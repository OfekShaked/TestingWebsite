import React, { useState, useEffect, useContext } from "react";
import RedirectOnEmptyTopic from "../../../common/redirect_conditions/RedirectOnEmptyTopic";
import { useNavigate } from "react-router-dom";
import TestReport from "./test_report/TestReport";
import TestReportSelection from "./TestReportSelection";
import UserReportSelection from "./UserReportSelection";
import {Stack} from "@mui/material"

const ReportSelection = (props) => {
  const navigate = useNavigate();
  const [report, setReport] = useState({});
  const [isTestReportStarted,setIsTestReportStarted] = useState(false);
  const backClick = () => {
    navigate("/");
  };


  return (
    <>
      {!isTestReportStarted ? (
        <>
        <Stack>
        <TestReportSelection backClick={backClick} setIsTestReportStarted={setIsTestReportStarted} setReport={setReport}/>
        <UserReportSelection/>
        </Stack>
        </>
      ) : (
        <TestReport report={report} />
      )}
      <RedirectOnEmptyTopic />
    </>
  );
};

export default ReportSelection;
