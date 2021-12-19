import React from "react";
import { Stack, Typography, Grid } from "@mui/material";
import FormField from "../../../common/form_field/FormField";
import GradesAndAnswers from "./GradesAndAnswers";
import QuestionStatistics from "./QuestionStatistics";
import "./TestReport.css";

const TestReport = (props) => {
  let { report } = props;

  return (
    <>
      <Stack>
        <Typography variant="h3" gutterBottom component="div">
          Test Report: {report.summary.name}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
      </Stack>
    </>
  );
};
export default TestReport;
