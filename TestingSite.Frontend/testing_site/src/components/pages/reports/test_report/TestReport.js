import React from "react";
import { Stack, Typography,Divider,Paper,Button, Grid } from "@mui/material";
import FormField from "../../../common/form_field/FormField";
import GradesAndAnswers from "./GradesAndAnswers";
import QuestionStatistics from "./QuestionStatistics";
import "./TestReport.css";
import {useNavigate} from "react-router-dom";

const TestReport = (props) => {
  let { report } = props;
  const navigate = useNavigate();

  const backClick = () =>{
    navigate("/");
  }
  return (
    <>
    <Paper className="center-container">
      <Stack className="center-container">
        <Typography variant="h3" gutterBottom component="div">
          Test Report: {report.summary.name}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Summary
        </Typography>
        <Grid container spacing={2} className="center-container">
          <Grid item xs={12} md={6} className="center-container">
            <Stack spacing={2}>
              <FormField field={"Test name"}>
                <Typography>{report.summary.name}</Typography>
              </FormField>
              <FormField field={"Number of submissions"}>
                <Typography>{report.summary.number_of_submissions}</Typography>
              </FormField>
              <FormField field={"Number of respondents passed"}>
                <Typography>{report.summary.num_passed}</Typography>
              </FormField>
              <FormField field={"Number of questions"}>
                <Typography>{report.summary.num_of_questions}</Typography>
              </FormField>
              <FormField field={"Passing grade"}>
                <Typography>{report.summary.passing_grade}</Typography>
              </FormField>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} className="center-container">
            <Stack spacing={2}>
              <FormField field={"Date range"}>
                <Typography>{report.summary.date_range}</Typography>
              </FormField>
              <FormField field={"Test ID"}>
                <Typography>{report.summary.id}</Typography>
              </FormField>
              <FormField field={"Passing percentage"}>
                <Typography>{report.summary.passing_percentage}</Typography>
              </FormField>
              <FormField field={"Average grade"}>
                <Typography>{report.summary.average_grade}</Typography>
              </FormField>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom component="div">
          Respondent Grades and Answers
        </Typography>
        <div className={"grades-answers"}>
          <div className={"table-container"}>
            <GradesAndAnswers tests={report.tests} />
          </div>
        </div>
        <Typography variant="h6" gutterBottom component="div">
          Question Statistics
        </Typography>
        <div className={"question-stats"}>
          <div className={"table-container"}>
            <QuestionStatistics questions={report.question_statistics} />
          </div>
        </div>
        <Divider/>
        <Button variant="contained" onClick={backClick}>Back</Button>
      </Stack>
      </Paper>
    </>
  );
};
export default TestReport;
