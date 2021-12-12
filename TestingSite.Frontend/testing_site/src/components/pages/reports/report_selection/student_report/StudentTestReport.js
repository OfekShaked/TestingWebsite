import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Typography, Grid } from "@mui/material";
import FormField from "../../../../common/form_field/FormField";
import { useParams } from "react-router-dom";
import QuestionsTable from "./questions_table/QuestionsTable";

const StudentTestReport = (props) => {
  const [report, setReport] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    if (props.report == null) {
      const res = await axios.get(`UserReport/test/${id}`);
      if (res.data != null && res.status === 200) {
        setReport(res.data);
        console.log(res.data);
      }
    } else setReport(props.report);
  };

  return (
    <>
      {report != null ? (
        <Stack>
          <Typography variant="h3" gutterBottom component="div">
            Test Report: {report.summary.name}
          </Typography>
          <Typography variant="h3" gutterBottom component="div">
            Respondent:{" "}
            {report.summary.user_name.first +
              " " +
              report.summary.user_name.last}
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
                <FormField field={"Number of questions submitted"}>
                  <Typography>
                    {report.summary.number_of_questions_submitted}
                  </Typography>
                </FormField>
                <FormField field={"Number of correct answers"}>
                  <Typography>
                    {report.summary.num_of_correct_questions}
                  </Typography>
                </FormField>
                <FormField field={"Passing grade"}>
                  <Typography>{report.summary.passing_grade}</Typography>
                </FormField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <FormField field={"Last submitted"}>
                  <Typography>{report.summary.last_submitted}</Typography>
                </FormField>
                <FormField field={"Test ID"}>
                  <Typography>{report.summary.id}</Typography>
                </FormField>
                <FormField field={"Status"}>
                  <Typography>
                    {report.summary.grade >= report.summary.passing_grade
                      ? "Passed"
                      : "Failed"}
                  </Typography>
                </FormField>
                <FormField field={"Final grade"}>
                  <Typography>{report.summary.grade}</Typography>
                </FormField>
                <FormField field={"Number of questions"}>
                  <Typography>{report.summary.num_of_questions}</Typography>
                </FormField>
              </Stack>
            </Grid>
          </Grid>
          <QuestionsTable rows={report.questions} />
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
export default StudentTestReport;
